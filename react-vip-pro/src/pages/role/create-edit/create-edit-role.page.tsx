import createValidationRules, {
  FormComponent,
  FormComponentRef,
  FormOption,
} from "@/components/forms/form";
import { EStatus } from "@/constants/enum";
import useHeader from "@/hooks/use-header.hook";
import { roleService } from "@/services/role.service";
import { permissionService } from "@/services/permissions.service";
import { PermissionItem, ListPermissionDto } from "@/types/permission";
import { CreateRole, EditRole } from "@/types/role";
import { Checkbox, Spin, message } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Container } from "@/components/common/container-box";

interface PermissionModule {
  name: string;
  permissions: PermissionItem[];
}

const CreateEditRolePage: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [permissionModules, setPermissionModules] = useState<
    PermissionModule[]
  >([]);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>(
    []
  );

  const formRef = useRef<FormComponentRef>(null);
  const [initialData, setInitialData] = useState<
    Record<string, unknown> | undefined
  >();

  // Auto-generate slug from name
  const updateSlugFromName = useCallback(
    (name: string) => {
      if (isEdit || !name || !formRef.current) return;

      const slug = name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/^-+|-+$/g, "");

      formRef.current.form?.setFieldsValue({ slug });
    },
    [isEdit]
  );

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!formRef.current?.form) return;

    try {
      const values = await formRef.current.form.validateFields();
      setLoading(true);

      const formData: CreateRole | EditRole = {
        name: values.name,
        slug: values.slug,
        status: values.status ? EStatus.active : EStatus.inactive,
        permission_ids: selectedPermissionIds,
        ...(isEdit && id ? { id: Number(id) } : {}),
      };

      let result;
      if (isEdit && id) {
        result = await roleService.update(formData as EditRole);
      } else {
        result = await roleService.create(formData as CreateRole);
      }

      if (result.isSuccess) {
        message.success(
          isEdit ? "Role updated successfully" : "Role created successfully"
        );
        navigate("/role");
      } else {
        message.error(
          result.error?.message ||
            `Failed to ${isEdit ? "update" : "create"} role`
        );
      }
    } catch (error) {
      console.error("Form validation failed:", error);
    } finally {
      setLoading(false);
    }
  }, [isEdit, id, selectedPermissionIds, navigate]);

  useHeader(isEdit ? "Edit Role" : "Create Role", [
    {
      id: "back-role",
      title: "Cancel",
      icon: "back",
      type: "default",
      handler: () => navigate("/role"),
    },
    {
      id: "save-role",
      title: "Save",
      icon: "edit",
      type: "primary",
      disable: loading,
      handler: handleSubmit,
    },
  ]);

  // Build permission modules from API response
  const buildPermissionModules = useCallback(
    (permissionList: ListPermissionDto) => {
      const modules: PermissionModule[] = [];

      Object.keys(permissionList).forEach((moduleKey) => {
        modules.push({
          name: moduleKey,
          permissions: permissionList[moduleKey],
        });
      });

      setPermissionModules(modules);
    },
    []
  );

  // Load data (role + permissions)
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      if (isEdit && id) {
        // EDIT Mode: Load both role data and permissions
        const [roleResult, permissionResult] = await Promise.all([
          roleService.getById(Number(id)),
          permissionService.getList(),
        ]);

        if (permissionResult.isSuccess && permissionResult.data) {
          buildPermissionModules(permissionResult.data);
        }

        if (roleResult.isSuccess && roleResult.data) {
          const data = roleResult.data;

          // Process the data for form initial values
          const processedData = {
            name: data.name,
            slug: data.slug,
            status: data.status === EStatus.active,
          };

          setInitialData(processedData);

          // Set selected permissions based on role permissions
          if (data.permissions) {
            const permissionIds = Object.values(data.permissions)
              .flat()
              .map((p) => p.id);
            setSelectedPermissionIds(permissionIds);
          }
        } else {
          message.error(
            roleResult.error?.message || "Failed to load role data"
          );
        }
      } else {
        // CREATE Mode: Load only permissions
        const permissionResult = await permissionService.getList();

        if (permissionResult.isSuccess && permissionResult.data) {
          buildPermissionModules(permissionResult.data);
          setSelectedPermissionIds([]);
        } else {
          message.error(
            permissionResult.error?.message || "Failed to load permissions"
          );
        }
      }
    } catch (error) {
      message.error("Failed to load data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [isEdit, id, buildPermissionModules]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Permission checkbox handlers
  const isPermissionChecked = useCallback(
    (permissionId: number): boolean => {
      return selectedPermissionIds.includes(permissionId);
    },
    [selectedPermissionIds]
  );

  const onPermissionCheckChange = useCallback(
    (permissionId: number, e: CheckboxChangeEvent) => {
      const checked = e.target.checked;
      setSelectedPermissionIds((prev) => {
        if (checked) {
          return prev.includes(permissionId) ? prev : [...prev, permissionId];
        } else {
          return prev.filter((id) => id !== permissionId);
        }
      });
    },
    []
  );

  const isModuleChecked = useCallback(
    (moduleName: string): boolean => {
      const module = permissionModules.find((m) => m.name === moduleName);
      if (!module) return false;

      return module.permissions.every((p) =>
        selectedPermissionIds.includes(p.id)
      );
    },
    [permissionModules, selectedPermissionIds]
  );

  const isModuleIndeterminate = useCallback(
    (moduleName: string): boolean => {
      const module = permissionModules.find((m) => m.name === moduleName);
      if (!module) return false;

      const checkedCount = module.permissions.filter((p) =>
        selectedPermissionIds.includes(p.id)
      ).length;
      return checkedCount > 0 && checkedCount < module.permissions.length;
    },
    [permissionModules, selectedPermissionIds]
  );

  const onModuleCheckChange = useCallback(
    (moduleName: string, e: CheckboxChangeEvent) => {
      const checked = e.target.checked;
      const module = permissionModules.find((m) => m.name === moduleName);
      if (!module) return;

      setSelectedPermissionIds((prev) => {
        if (checked) {
          // Add all permissions from this module
          const newIds = module.permissions.map((p) => p.id);
          const merged = [...prev, ...newIds];
          return Array.from(new Set(merged));
        } else {
          // Remove all permissions from this module
          const modulePermissionIds = module.permissions.map((p) => p.id);
          return prev.filter((id) => !modulePermissionIds.includes(id));
        }
      });
    },
    [permissionModules]
  );

  // Split modules into two columns
  const getLeftColumnModules = useCallback((): PermissionModule[] => {
    const totalModules = permissionModules.length;
    const leftCount = Math.ceil(totalModules / 2);
    return permissionModules.slice(0, leftCount);
  }, [permissionModules]);

  const getRightColumnModules = useCallback((): PermissionModule[] => {
    const totalModules = permissionModules.length;
    const leftCount = Math.ceil(totalModules / 2);
    return permissionModules.slice(leftCount);
  }, [permissionModules]);

  const formOptions: FormOption = {
    layout: "vertical",
    initialData,
    loading,
    controls: [
      {
        name: "name",
        label: "Role Name",
        type: "text",
        required: true,
        placeholder: "Enter role name",
        rules: [createValidationRules.required()],
        onChange: (value: unknown) => {
          const nameValue = typeof value === "string" ? value : "";
          updateSlugFromName(nameValue);
        },
      },
      {
        name: "slug",
        label: "Slug",
        type: "text",
        required: true,
        placeholder: "Auto-generated from role name",
        disabled: isEdit,
        rules: [createValidationRules.required()],
      },
      {
        name: "status",
        label: "Status",
        type: "switch",
        required: true,
        defaultValue: true,
      },
    ],
  };

  return (
    <div className="container-fluid">
      <FormComponent ref={formRef} formOptions={formOptions} />

      <Container className="mt-6">
        <h2
          className="text-xl font-semibold text-gray-800 dark:text-white/90"
          x-text="pageName"
        >
          Permissions
        </h2>

        {!loading && permissionModules.length > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="col-span-1">
                {getLeftColumnModules().map((module) => (
                  <div key={module.name} className="mb-8">
                    {/* Module Header */}
                    <div className="mb-4">
                      <Checkbox
                        checked={isModuleChecked(module.name)}
                        indeterminate={isModuleIndeterminate(module.name)}
                        onChange={(e) => onModuleCheckChange(module.name, e)}
                        className="font-semibold text-lg"
                      >
                        {module.name}
                      </Checkbox>
                    </div>

                    {/* Permission Items */}
                    <div className="ml-6 space-y-2">
                      {module.permissions.map((permission) => (
                        <div key={permission.id}>
                          <Checkbox
                            checked={isPermissionChecked(permission.id)}
                            onChange={(e) =>
                              onPermissionCheckChange(permission.id, e)
                            }
                            className="text-sm"
                          >
                            {permission.name}
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="col-span-1">
                {getRightColumnModules().map((module) => (
                  <div key={module.name} className="mb-8">
                    {/* Module Header */}
                    <div className="mb-4">
                      <Checkbox
                        checked={isModuleChecked(module.name)}
                        indeterminate={isModuleIndeterminate(module.name)}
                        onChange={(e) => onModuleCheckChange(module.name, e)}
                        className="font-semibold text-lg"
                      >
                        {module.name}
                      </Checkbox>
                    </div>

                    {/* Permission Items */}
                    <div className="ml-6 space-y-2">
                      {module.permissions.map((permission) => (
                        <div key={permission.id}>
                          <Checkbox
                            checked={isPermissionChecked(permission.id)}
                            onChange={(e) =>
                              onPermissionCheckChange(permission.id, e)
                            }
                            className="text-sm"
                          >
                            {permission.name}
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-4">
            <Spin />
          </div>
        )}
      </Container>
    </div>
  );
};

export default CreateEditRolePage;
