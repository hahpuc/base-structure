import { useCallback, useMemo } from "react";
import { FormInstance } from "antd";
import {
  FormOption,
  PaginatedFormSelectOptions,
  FtFormControl,
} from "../models/form.model";

interface UseFormValuesChangeProps {
  form: FormInstance;
  formOptions: FormOption;
  setFormValues: (values: Record<string, unknown>) => void;
  setSelectOptionsState: React.Dispatch<
    React.SetStateAction<Record<string, PaginatedFormSelectOptions>>
  >;
  setChildFilterOptions: React.Dispatch<
    React.SetStateAction<
      Record<string, import("../models/form.model").SelectOption[]>
    >
  >;
  loadSelectOptions: (
    control: import("../models/form.model").FtFormControl,
    searchText?: string,
    page?: number,
    parentValue?: string | number
  ) => Promise<void>;
  loadChildFilterOptions: (
    control: import("../models/form.model").FtFormControl,
    parentValue?: string | number
  ) => Promise<void>;
}

export const useFormValuesChange = ({
  form,
  formOptions,
  setFormValues,
  setSelectOptionsState,
  setChildFilterOptions,
  loadSelectOptions,
  loadChildFilterOptions,
}: UseFormValuesChangeProps) => {
  // Create a Map for O(1) control lookups instead of O(n) array.find()
  const controlMap = useMemo(() => {
    const map = new Map<string, FtFormControl>();
    formOptions.controls.forEach((control) => {
      map.set(control.name, control);
    });
    return map;
  }, [formOptions.controls]);

  // Create a Map for parent-child relationships for O(1) lookups
  const childControlsMap = useMemo(() => {
    const map = new Map<string, FtFormControl[]>();
    formOptions.controls.forEach((control) => {
      if (control.parent?.filterName) {
        const parentName = control.parent.filterName;
        if (!map.has(parentName)) {
          map.set(parentName, []);
        }
        map.get(parentName)!.push(control);
      }
    });
    return map;
  }, [formOptions.controls]);

  // Handle form value changes and parent-child relationships
  const handleValuesChange = useCallback(
    (
      changedValues: Record<string, unknown>,
      allValues: Record<string, unknown>
    ) => {
      setFormValues(allValues);

      // Handle control-specific onChange events and parent-child relationships
      Object.keys(changedValues).forEach((fieldName) => {
        const control = controlMap.get(fieldName);
        if (control?.onChange) {
          control.onChange(changedValues[fieldName], allValues);
        }

        // If this is a parent control, handle child controls using O(1) Map lookup
        const childControls = childControlsMap.get(fieldName) || [];
        if (childControls.length > 0) {
          const parentValue = changedValues[fieldName];
          childControls.forEach((childControl) => {
            // Clear child field value using Ant Design's setFieldValue
            form.setFieldValue(childControl.name, undefined);

            // Load options for child if parent has value
            if (
              parentValue !== undefined &&
              parentValue !== null &&
              parentValue !== ""
            ) {
              // Check if child uses pagination
              if (childControl.usePagination) {
                // Load paginated options with parent value
                loadSelectOptions(
                  childControl,
                  "",
                  1,
                  parentValue as string | number
                );
              } else {
                // Load non-paginated options
                loadChildFilterOptions(
                  childControl,
                  parentValue as string | number
                );
              }
            } else {
              // Clear child filter options when parent is cleared
              const filterKey = `${childControl.name}_${parentValue}`;
              if (childControl.usePagination) {
                setSelectOptionsState((prev) => ({
                  ...prev,
                  [filterKey]: {
                    options: [],
                    hasMore: false,
                    currentPage: 1,
                    pageSize: childControl.pageSize || 20,
                    total: 0,
                    loading: false,
                    searchText: "",
                  },
                }));
              } else {
                setChildFilterOptions((prev) => ({
                  ...prev,
                  [filterKey]: [],
                }));
              }
            }
          });
        }
      });
    },
    [
      controlMap,
      childControlsMap,
      form,
      setFormValues,
      loadChildFilterOptions,
      loadSelectOptions,
      setSelectOptionsState,
      setChildFilterOptions,
    ]
  );

  return { handleValuesChange };
};
