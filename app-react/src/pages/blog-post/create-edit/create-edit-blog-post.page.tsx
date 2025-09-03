import { message } from 'antd';
import dayjs from 'dayjs';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import slugify from 'slugify';

import {
  FormComponent,
  FormComponentRef,
  FormOption,
  createValidationRules,
  FormSubmitResult,
} from '@/components/base/form';
import { EStatus } from '@/constants/enum';
import { blogPostService } from '@/services/blog-post.service';
import { categoryService } from '@/services/category.service';
import { CreateBlogPost, EditBlogPost } from '@/types/blog-post';

const CreateEditBlogPostPage: React.FunctionComponent = () => {
  const formRef = useRef<FormComponentRef>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<Record<string, unknown> | undefined>();

  const isEdit = !!id;

  const loadBlogPost = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await blogPostService.getById(Number(id));
      const blogPost = response.data;

      if (blogPost) {
        // Process the data for form initial values
        const processedData = {
          ...blogPost,
          published_at: blogPost.published_at ? dayjs(blogPost.published_at) : undefined,
          status: blogPost.status === EStatus.active,
        };

        setInitialData(processedData);
      }
    } catch {
      message.error('Failed to load blog post');
      navigate('/blog-post');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (isEdit && id) {
      loadBlogPost();
    }
  }, [isEdit, id, loadBlogPost]);

  const handleSubmit = async (formValue: Record<string, unknown>): Promise<FormSubmitResult> => {
    try {
      setLoading(true);

      if (isEdit && id) {
        const updateData: EditBlogPost = {
          id: Number(id),
          title: formValue.title as string,
          slug: formValue.slug as string,
          order_index: formValue.order_index as number,
          description: formValue.description as string,
          content: formValue.content as string,
          thumbnail: formValue.thumbnail as string,
          published_at: (formValue.published_at as dayjs.Dayjs)?.toDate(),
          category_id: formValue.category_id as number,
          status: (formValue.status as boolean) ? EStatus.active : EStatus.inactive,
        };

        await blogPostService.update(updateData);
        message.success('Blog post updated successfully');
      } else {
        const createData: CreateBlogPost = {
          title: formValue.title as string,
          slug: formValue.slug as string,
          order_index: formValue.order_index as number,
          description: formValue.description as string,
          content: formValue.content as string,
          thumbnail: formValue.thumbnail as string,
          published_at: (formValue.published_at as dayjs.Dayjs)?.toDate(),
          category_id: formValue.category_id as number,
          status: (formValue.status as boolean) ? EStatus.active : EStatus.inactive,
        };

        await blogPostService.create(createData);
        message.success('Blog post created successfully');
      }

      navigate('/blog-post');
      return { success: true };
    } catch {
      message.error(isEdit ? 'Failed to update blog post' : 'Failed to create blog post');
      return { success: false, error: 'Submission failed' };
    } finally {
      setLoading(false);
    }
  };

  const updateSlugFromTitle = (title: string) => {
    if (isEdit || !title || !formRef.current) return;

    const slug = slugify(title, {
      replacement: '-',
      lower: true,
      strict: true,
      locale: 'en',
      trim: true,
    });

    formRef.current.form.setFieldValue('slug', slug);
  };

  const formOptions: FormOption = {
    layout: 'vertical',
    size: 'large',
    gutter: 16,
    initialData,
    loading,
    onSubmit: handleSubmit,
    showDefaultActions: false,
    controls: [
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        required: true,
        placeholder: 'Enter blog post title',
        rules: [createValidationRules.required('Title is required')],
        span: 8,
        onChange: (value: unknown) => {
          updateSlugFromTitle(value as string);
        },
      },
      {
        name: 'slug',
        label: 'Slug',
        type: 'text',
        required: true,
        disabled: isEdit,
        placeholder: 'Auto-generated from title',
        rules: [createValidationRules.required('Slug is required')],
        span: 8,
      },
      {
        name: 'order_index',
        label: 'Order Index',
        type: 'number',
        required: true,
        placeholder: 'Enter order index',
        rules: [createValidationRules.required('Order index is required')],
        span: 8,
        min: 0,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        required: true,
        placeholder: 'Enter blog post description',
        rules: [createValidationRules.required('Description is required')],
        span: 24,
        rows: 4,
      },
      {
        name: 'thumbnail',
        label: 'Thumbnail',
        type: 'text', // For now, using text input for URL. Can be changed to file upload later
        required: true,
        placeholder: 'Enter thumbnail URL',
        rules: [
          createValidationRules.required('Thumbnail is required'),
          createValidationRules.url('Please enter a valid URL'),
        ],
        span: 8,
      },
      {
        name: 'published_at',
        label: 'Published At',
        type: 'datetime',
        required: true,
        placeholder: 'Select published date and time',
        rules: [createValidationRules.required('Published date is required')],
        span: 8,
        showTime: true,
      },
      {
        name: 'category_id',
        label: 'Category',
        type: 'select',
        required: true,
        placeholder: 'Select category',
        rules: [createValidationRules.required('Category is required')],
        span: 8,
        options: async () => {
          const response = await categoryService.getAll();
          return (
            response.data?.map(category => ({
              label: category.name,
              value: category.id,
            })) || []
          );
        },
        usePagination: false,
        searchable: true,
        allowClear: true,
        showSearch: true,
      },
      {
        name: 'status',
        label: 'Status',
        type: 'switch',
        required: true,
        span: 8,
        defaultValue: true,
        description: 'Enable to make the blog post active',
      },
      {
        name: 'content',
        label: 'Content',
        type: 'richtext',
        required: true,
        placeholder: 'Enter blog post content',
        rules: [createValidationRules.required('Content is required')],
        span: 24,
        rows: 10,
      },
    ],
    actions: [
      {
        type: 'cancel',
        label: 'Cancel',
        color: 'default',
        handler: () => {
          navigate('/blog-post');
        },
      },
      {
        type: 'submit',
        label: loading ? 'Saving...' : 'Save',
        color: 'primary',
        loading,
      },
    ],
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Blog Post' : 'Create Blog Post'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEdit
            ? 'Update the blog post information below.'
            : 'Fill in the information to create a new blog post.'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <FormComponent ref={formRef} formOptions={formOptions} />
      </div>
    </div>
  );
};

export default CreateEditBlogPostPage;
