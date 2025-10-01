import {
  DeleteOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Tag,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";

import {
  FilterValues,
  SelectOption,
  TableFilter as TableFilterType,
} from "./models/table-filter.model";

type DynamicOptions = {
  [filterName: string]: SelectOption[];
};

type LoadingStates = {
  [filterName: string]: boolean;
};

const { Search } = Input;

interface TableFilterProps {
  filters: TableFilterType[];
  onSearch: (searchText: string) => void;
  onFilterChange: (filterParams: Record<string, unknown>) => void;
  searchParams: URLSearchParams;
}

export const TableFilter: React.FC<TableFilterProps> = ({
  filters,
  onSearch,
  onFilterChange,
  searchParams,
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState<DynamicOptions>({});
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({});
  const [optionsInitialized, setOptionsInitialized] = useState(false);

  // Load dynamic options for a filter
  const loadDynamicOptions = useCallback(
    async (filter: TableFilterType, parentValue?: unknown) => {
      if (!filter.options || Array.isArray(filter.options)) {
        return; // Skip static options
      }

      const filterKey = filter.parent
        ? `${filter.name}_${parentValue}`
        : filter.name;

      setLoadingStates((prev: LoadingStates) => ({
        ...prev,
        [filterKey]: true,
      }));

      try {
        let options: SelectOption[] = [];

        if (typeof filter.options === "function") {
          let result;
          if (filter.parent && parentValue !== undefined) {
            result = await (
              filter.options as (
                parentValue: unknown
              ) => Promise<SelectOption[]>
            )(parentValue);
          } else {
            result = await (filter.options as () => Promise<SelectOption[]>)();
          }
          options = Array.isArray(result) ? result : [];
        }

        setDynamicOptions((prev: DynamicOptions) => ({
          ...prev,
          [filterKey]: options,
        }));
      } catch (error) {
        console.error(`Failed to load options for ${filter.name}:`, error);
        setDynamicOptions((prev: DynamicOptions) => ({
          ...prev,
          [filterKey]: [],
        }));
      } finally {
        setLoadingStates((prev: LoadingStates) => ({
          ...prev,
          [filterKey]: false,
        }));
      }
    },
    []
  );

  // Get current filter values function
  const getCurrentFilterValues = useCallback((): FilterValues => {
    const values: FilterValues = {};

    // Add search filter
    const searchValue = searchParams.get("filter");
    if (searchValue) {
      values.filter = searchValue;
    }

    filters.forEach((filter) => {
      const value = searchParams.get(filter.name);
      if (value) {
        // For select filters, convert string back to proper type
        if (filter.type === "select" && Array.isArray(filter.options)) {
          // Try to find matching option by value and use the original value type
          const option = filter.options.find(
            (opt) => String(opt.value) === value
          );
          values[filter.name] = option ? option.value : value;
        } else {
          values[filter.name] = value;
        }
      }
    });
    return values;
  }, [searchParams, filters]);

  // Initialize all parent filter options on component mount
  useEffect(() => {
    const initializeOptions = async () => {
      // Load all parent filters (filters without dependencies)
      const parentFilters = filters.filter(
        (filter) =>
          filter.options && !Array.isArray(filter.options) && !filter.parent
      );

      for (const filter of parentFilters) {
        await loadDynamicOptions(filter);
      }

      // Load child filters if we have values in URL
      const currentValues = getCurrentFilterValues();
      const childFilters = filters.filter(
        (filter) =>
          filter.options && !Array.isArray(filter.options) && filter.parent
      );

      for (const filter of childFilters) {
        const parentValue = currentValues[filter.parent!.filterName];
        if (
          parentValue !== undefined &&
          parentValue !== null &&
          parentValue !== ""
        ) {
          await loadDynamicOptions(filter, parentValue);
        }
      }

      setOptionsInitialized(true);
    };

    initializeOptions();
  }, [filters, loadDynamicOptions, getCurrentFilterValues]);

  // Sync search values between main search and drawer search
  useEffect(() => {
    const urlSearchValue = searchParams.get("filter") || "";

    setSearchValue(urlSearchValue);

    form.setFieldValue("filter", urlSearchValue);
  }, [searchParams, form]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  const handleFilterSubmit = (values: FilterValues) => {
    // Remove empty values and include all filters (including search)
    const cleanedValues = Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = value;
        // Also update search value state if it's the filter field
        if (key === "filter") {
          setSearchValue(String(value));
        }
      }
      return acc;
    }, {} as Record<string, unknown>);

    // Send all filter params including search to parent
    onFilterChange(cleanedValues);
    setDrawerVisible(false);
  };

  const handleFilterReset = () => {
    form.resetFields();
    setSearchValue("");
    onSearch("");
    onFilterChange({});
    setDrawerVisible(false);
  };

  // Remove individual filter
  const handleRemoveFilter = (filterName: string) => {
    if (filterName === "filter") {
      setSearchValue("");
      onSearch("");
      // Get current values and remove only the search filter
      const currentValues = getCurrentFilterValues();

      const { filter: _removed, ...remainingFilters } = currentValues;
      onFilterChange(remainingFilters);
      return;
    }

    const currentValues = getCurrentFilterValues();

    const { [filterName]: _removed, ...remainingFilters } = currentValues;
    onFilterChange(remainingFilters);

    if (form.getFieldValue(filterName) !== undefined) {
      form.setFieldValue(filterName, undefined);
    }
  };

  // Remove all filters
  const handleClearAllFilters = () => {
    // Clear search filter and all other filters by passing empty object
    form.resetFields();
    setSearchValue("");
    onSearch("");
    onFilterChange({});
  };

  // Get display value for filter
  const getFilterDisplayValue = (
    filter: TableFilterType,
    value: unknown
  ): string => {
    if (filter.type === "select") {
      if (Array.isArray(filter.options)) {
        // Static options
        const option = filter.options.find(
          (opt) => String(opt.value) === String(value)
        );
        return option ? option.label : String(value);
      } else {
        // Dynamic options - search in dynamicOptions state
        const currentValues = getCurrentFilterValues();
        let filterKey = filter.name;

        if (filter.parent) {
          const parentValue = currentValues[filter.parent.filterName];
          if (
            parentValue !== undefined &&
            parentValue !== null &&
            parentValue !== ""
          ) {
            filterKey = `${filter.name}_${parentValue}`;
          }
        }

        const options = dynamicOptions[filterKey] || [];
        const option = options.find(
          (opt) => String(opt.value) === String(value)
        );
        return option ? option.label : String(value);
      }
    }

    if (filter.type === "date" && value) {
      return new Date(value as string).toLocaleDateString();
    }

    return String(value);
  };

  // Get active filters for display
  const getActiveFilters = () => {
    const currentValues = getCurrentFilterValues();
    const activeFilters: Array<{
      name: string;
      label: string;
      value: unknown;
      displayValue: string;
    }> = [];

    // Add search filter if present
    const searchValue = searchParams.get("filter");
    if (searchValue) {
      activeFilters.push({
        name: "filter",
        label: "Search",
        value: searchValue,
        displayValue: searchValue,
      });
    }

    // Add other filters
    filters.forEach((filter) => {
      const value = currentValues[filter.name];
      if (value !== undefined && value !== null && value !== "") {
        activeFilters.push({
          name: filter.name,
          label: filter.label,
          value: value,
          displayValue: getFilterDisplayValue(filter, value),
        });
      }
    });

    return activeFilters;
  };

  // Get active filters count (excluding search)
  const getActiveFiltersCount = (): number => {
    const currentValues = getCurrentFilterValues();

    let count = filters.filter((filter) => {
      const value = currentValues[filter.name];
      return value !== undefined && value !== null && value !== "";
    }).length;

    if (
      currentValues.filter !== undefined &&
      currentValues.filter !== null &&
      currentValues.filter !== ""
    ) {
      count += 1;
    }
    return count;
  };

  const renderFilterInput = (filter: TableFilterType) => {
    switch (filter.type) {
      case "text":
        return <Input placeholder={`Enter ${filter.label}`} />;

      case "number":
        return <Input type="number" placeholder={`Enter ${filter.label}`} />;

      case "date":
        return <DatePicker style={{ width: "100%" }} />;

      case "select":
        if (Array.isArray(filter.options)) {
          // Static options
          return (
            <Select
              placeholder={`Select ${filter.label}`}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                String(option?.children || "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {filter.options.map((option: SelectOption) => (
                <Select.Option key={String(option.value)} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          );
        } else {
          // Dynamic options
          const currentValues = form.getFieldsValue();
          let filterKey = filter.name;
          let options: SelectOption[] = [];
          let isLoading = false;
          let isDisabled = false;

          if (filter.parent) {
            const parentValue = currentValues[filter.parent.filterName];
            if (
              parentValue !== undefined &&
              parentValue !== null &&
              parentValue !== ""
            ) {
              filterKey = `${filter.name}_${parentValue}`;
              options = dynamicOptions[filterKey] || [];
              isLoading = loadingStates[filterKey] || false;
            } else {
              isDisabled = true; // Disable child filter if parent is not selected
            }
          } else {
            options = dynamicOptions[filterKey] || [];
            isLoading = loadingStates[filterKey] || false;
          }

          return (
            <Select
              placeholder={
                isDisabled
                  ? `Select ${filter.parent?.filterName} first`
                  : `Select ${filter.label}`
              }
              allowClear
              showSearch
              loading={isLoading}
              disabled={isDisabled}
              optionFilterProp="children"
              filterOption={(input, option) =>
                String(option?.children || "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(value) => {
                // Update the form field value
                form.setFieldValue(filter.name, value);

                // If this is a parent filter, clear child filters and reload their options
                const childFilters = filters.filter(
                  (f) => f.parent?.filterName === filter.name
                );
                if (childFilters.length > 0) {
                  // Clear child filter values
                  const fieldsToUpdate = childFilters.reduce((acc, child) => {
                    acc[child.name] = undefined;
                    return acc;
                  }, {} as Record<string, unknown>);

                  form.setFieldsValue(fieldsToUpdate);

                  // Load options for child filters with new parent value
                  if (value !== undefined && value !== null && value !== "") {
                    childFilters.forEach((childFilter) => {
                      loadDynamicOptions(childFilter, value);
                    });
                  } else {
                    // Clear dynamic options for child filters when parent is cleared
                    childFilters.forEach((childFilter) => {
                      const filterKey = `${childFilter.name}_${
                        value || "empty"
                      }`;
                      setDynamicOptions((prev: DynamicOptions) => ({
                        ...prev,
                        [filterKey]: [],
                      }));
                    });
                  }
                }
              }}
            >
              {options.map((option: SelectOption) => (
                <Select.Option key={String(option.value)} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          );
        }

      default:
        return <Input placeholder={`Enter ${filter.label}`} />;
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div className="flex items-center flex-wrap gap-2">
        <Space>
          {/* Table Search */}
          <Search
            placeholder="Search..."
            allowClear
            enterButton={<SearchOutlined />}
            size="middle"
            onSearch={handleSearch}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            width={300}
          />

          {/* Filter Button with Badge */}

          <Badge size="default" count={getActiveFiltersCount()}>
            <Button
              type="default"
              variant="outlined"
              icon={<FilterOutlined />}
              loading={!optionsInitialized}
              onClick={() => setDrawerVisible(true)}
            ></Button>
          </Badge>
        </Space>

        {/* Active Filter Tags */}
        {getActiveFilters().length > 0 && (
          <div>
            <Space wrap>
              {getActiveFilters().map((activeFilter) => (
                <Tag
                  key={activeFilter.name}
                  closable
                  onClose={() => handleRemoveFilter(activeFilter.name)}
                  color="blue"
                >
                  <strong>{activeFilter.label}:</strong>{" "}
                  {activeFilter.displayValue}
                </Tag>
              ))}
              {getActiveFilters().length > 1 && (
                <Button
                  type="default"
                  variant="filled"
                  color="danger"
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={handleClearAllFilters}
                  className="px-2 py-1 h-auto text-[#ff4d4f] text-xs"
                ></Button>
              )}
            </Space>
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <Drawer
        title="Filter Options"
        placement="right"
        width={400}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        afterOpenChange={(open) => {
          if (open && optionsInitialized) {
            // Simply set form values when drawer opens
            const currentValues = getCurrentFilterValues();
            form.setFieldsValue(currentValues);
          }
        }}
        extra={
          <Space>
            <Button onClick={handleFilterReset}>Reset</Button>
            <Button type="primary" onClick={() => form.submit()}>
              Apply
            </Button>
          </Space>
        }
      >
        <Form
          className="p-6"
          form={form}
          layout="vertical"
          onFinish={handleFilterSubmit}
        >
          {/* Table Search */}
          <Form.Item className="mb-4" name="filter" label="Search">
            <Input
              placeholder="Enter search text"
              allowClear
              onChange={(e) => {
                const newValue = e.target.value;
                setSearchValue(newValue);
                form.setFieldValue("filter", newValue);
              }}
            />
          </Form.Item>

          {filters.map((filter) => (
            <Form.Item
              key={filter.name}
              name={filter.name}
              label={filter.label}
              help={filter.note}
            >
              {renderFilterInput(filter)}
            </Form.Item>
          ))}
        </Form>
      </Drawer>
    </div>
  );
};
