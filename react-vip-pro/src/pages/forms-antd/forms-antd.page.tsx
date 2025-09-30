import React, { useState } from "react";
import type {
  CascaderProps,
  FormItemProps,
  FormProps,
  UploadProps,
} from "antd";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  Upload,
  message,
} from "antd";
import type { DefaultOptionType } from "antd/es/select";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

const { Option } = Select;

interface FormCascaderOption {
  value: string;
  label: string;
  children?: FormCascaderOption[];
}

const residences: CascaderProps<FormCascaderOption>["options"] = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

const formItemLayout: FormProps = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout: FormItemProps = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const FormsAntDPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    setAutoCompleteResult(
      value ? [".com", ".org", ".net"].map((domain) => `${value}${domain}`) : []
    );
  };

  const websiteOptions = autoCompleteResult.map<DefaultOptionType>(
    (website) => ({
      label: website,
      value: website,
    })
  );

  // Upload handlers
  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const { RangePicker } = DatePicker;

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          {
            type: "array",
            required: true,
            message: "Please select your habitual residence!",
          },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="donation"
        label="Donation"
        rules={[{ required: true, message: "Please input donation amount!" }]}
      >
        <InputNumber addonAfter={suffixSelector} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="website"
        label="Website"
        rules={[{ required: true, message: "Please input website!" }]}
      >
        <AutoComplete
          options={websiteOptions}
          onChange={onWebsiteChange}
          placeholder="website"
        >
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="intro"
        label="Intro"
        rules={[{ required: true, message: "Please input Intro" }]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Please select gender!" }]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Captcha"
        extra="We must make sure that your are a human."
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input the captcha you got!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="birthDate"
        label="Birth Date"
        rules={[{ required: true, message: "Please select your birth date!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="dateRange"
        label="Date Range"
        rules={[{ required: true, message: "Please select date range!" }]}
      >
        <RangePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="notifications"
        label="Email Notifications"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name="marketingEmails"
        label="Marketing Emails"
        valuePropName="checked"
      >
        <Switch checkedChildren="ON" unCheckedChildren="OFF" />
      </Form.Item>

      <Form.Item
        name="accountType"
        label="Account Type"
        rules={[{ required: true, message: "Please select account type!" }]}
      >
        <Radio.Group>
          <Radio value="personal">Personal</Radio>
          <Radio value="business">Business</Radio>
          <Radio value="organization">Organization</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="interests"
        label="Interests"
        rules={[{ required: true, message: "Please select your interests!" }]}
      >
        <Checkbox.Group>
          <Row>
            <Col span={8}>
              <Checkbox value="technology">Technology</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="sports">Sports</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="music">Music</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="travel">Travel</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="food">Food</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="art">Art</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        name="profilePicture"
        label="Profile Picture"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e;
          }
          return e?.fileList;
        }}
      >
        <Upload {...uploadProps} listType="picture">
          <Button icon={<UploadOutlined />}>Upload Picture</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="documents"
        label="Documents"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e;
          }
          return e?.fileList;
        }}
      >
        <Upload.Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Upload.Dragger>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormsAntDPage;
