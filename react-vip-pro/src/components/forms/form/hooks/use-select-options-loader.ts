import { useCallback, useEffect } from "react";
import {
  FtFormControl,
  SelectOption,
  PaginatedFormSelectOptions,
} from "../models/form.model";
import { BaseQuery, ListPaginate } from "@/types/base";
import { ApiResult } from "@/services/client/api-result";

interface UseSelectOptionsLoaderProps {
  formOptions: {
    controls: FtFormControl[];
    initialData?: Record<string, unknown>;
  };
  setSelectOptionsState: React.Dispatch<
    React.SetStateAction<Record<string, PaginatedFormSelectOptions>>
  >;
  setChildFilterOptions: React.Dispatch<
    React.SetStateAction<Record<string, SelectOption[]>>
  >;
  setLoadingChildFilters: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

export const useSelectOptionsLoader = ({
  formOptions,
  setSelectOptionsState,
  setChildFilterOptions,
  setLoadingChildFilters,
}: UseSelectOptionsLoaderProps) => {
  // Load select options for child filters (with parent value)
  const loadChildFilterOptions = useCallback(
    async (control: FtFormControl, parentValue?: string | number) => {
      if (!control.options || Array.isArray(control.options)) return;

      const filterKey = control.parent
        ? `${control.name}_${parentValue}`
        : control.name;

      setLoadingChildFilters((prev) => ({ ...prev, [filterKey]: true }));

      try {
        if (typeof control.options === "function") {
          const result =
            control.parent && parentValue !== undefined
              ? await (
                  control.options as (
                    parentValue: string | number
                  ) => Promise<SelectOption[]>
                )(parentValue)
              : await (control.options as () => Promise<SelectOption[]>)();

          setChildFilterOptions((prev) => ({
            ...prev,
            [filterKey]: result,
          }));
        }
      } catch (error) {
        console.error(`Failed to load options for ${control.name}:`, error);
        setChildFilterOptions((prev) => ({ ...prev, [filterKey]: [] }));
      } finally {
        setLoadingChildFilters((prev) => ({
          ...prev,
          [filterKey]: false,
        }));
      }
    },
    [setLoadingChildFilters, setChildFilterOptions]
  );

  // Load select options (with pagination support)
  const loadSelectOptions = useCallback(
    async (
      control: FtFormControl,
      searchText = "",
      page = 1,
      parentValue?: string | number
    ) => {
      if (!control.options) return;

      // Use different key for child filters with parent value
      const key =
        control.parent && parentValue !== undefined
          ? `${control.name}_${parentValue}`
          : control.name;

      setSelectOptionsState((prev) => ({
        ...prev,
        [key]: { ...prev[key], loading: true },
      }));

      try {
        let options: SelectOption[] = [];
        let hasMore = false;
        let total = 0;

        if (Array.isArray(control.options)) {
          // Static options
          options = control.options as SelectOption[];
          total = options.length;
        } else if (typeof control.options === "function") {
          if (control.usePagination) {
            // Paginated API
            const query: BaseQuery = {
              page,
              limit: control.pageSize || 20,
              filter: searchText,
            };

            // Check if this is a child filter with parent dependency
            if (control.parent && parentValue !== undefined) {
              const result = await (
                control.options as (
                  input: BaseQuery,
                  parentValue: string | number
                ) => Promise<ApiResult<ListPaginate<unknown>>>
              )(query, parentValue);

              options = (result.data?.data ?? []).map((item: unknown) => {
                const typedItem = item as Record<string, unknown>;
                return {
                  label: (typedItem.name ||
                    typedItem.label ||
                    typedItem.title) as string,
                  value: typedItem.id || typedItem.value,
                };
              });
              const totalPages = result.data?.total_pages ?? 0;
              const totalRecords = result.data?.total_records ?? 0;
              hasMore =
                totalPages > page ||
                totalRecords > page * (control.pageSize || 20);
              total = totalRecords;
            } else {
              // Parent or independent filter
              const result = await (
                control.options as (
                  input: BaseQuery
                ) => Promise<ApiResult<ListPaginate<unknown>>>
              )(query);

              options = (result.data?.data ?? []).map((item: unknown) => {
                const typedItem = item as Record<string, unknown>;
                return {
                  label: (typedItem.name ||
                    typedItem.label ||
                    typedItem.title) as string,
                  value: typedItem.id || typedItem.value,
                };
              });
              const totalPages = result.data?.total_pages ?? 0;
              const totalRecords = result.data?.total_records ?? 0;
              hasMore =
                totalPages > page ||
                totalRecords > page * (control.pageSize || 20);
              total = totalRecords;
            }
          } else {
            // Non-paginated API
            const result = await (
              control.options as () => Promise<SelectOption[]>
            )();
            options = result;
            total = options.length;
          }
        }

        setSelectOptionsState((prev) => ({
          ...prev,
          [key]: {
            options:
              page === 1
                ? options
                : [...(prev[key]?.options || []), ...options],
            hasMore,
            currentPage: page,
            pageSize: control.pageSize || 20,
            total,
            loading: false,
            searchText,
          },
        }));
      } catch {
        setSelectOptionsState((prev) => ({
          ...prev,
          [key]: { ...prev[key], loading: false },
        }));
      }
    },
    [setSelectOptionsState]
  );

  // Initialize select options on mount and when form options change
  useEffect(() => {
    const initialData = formOptions.initialData;
    const controls = formOptions.controls;

    const initializeOptions = async () => {
      for (const control of controls) {
        if (control.type === "select" || control.type === "autocomplete") {
          if (!control.parent) {
            // Load parent/independent filters immediately
            if (
              control.usePagination ||
              !control.options ||
              Array.isArray(control.options)
            ) {
              loadSelectOptions(control);
            } else {
              // For non-paginated dynamic options without parent
              await loadChildFilterOptions(control);
            }
          } else {
            // For child filters, load if parent value exists in initial data
            const parentValue = initialData?.[control.parent.filterName];
            if (
              parentValue !== undefined &&
              parentValue !== null &&
              parentValue !== ""
            ) {
              const normalizedValue =
                typeof parentValue === "string" ||
                typeof parentValue === "number"
                  ? parentValue
                  : String(parentValue);
              await loadChildFilterOptions(control, normalizedValue);
            }
          }
        }
      }
    };

    initializeOptions();
  }, [
    formOptions.controls,
    formOptions.initialData,
    loadSelectOptions,
    loadChildFilterOptions,
  ]);

  return {
    loadSelectOptions,
    loadChildFilterOptions,
  };
};
