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
import React, { useEffect, useState } from "react";

import {
  FilterValues,
  SelectOption,
  TableFilter as TableFilterType,
} from "./models/table-filter.model";

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

  // Store options for each filter (keyed by filter name or filterName_parentValue for child filters)
  const [filterOptions, setFilterOptions] = useState<
    Record<string, SelectOption[]>
  >({});
  const [loadingFilters, setLoadingFilters] = useState<Record<string, boolean>>(
    {}
  );

  // Initialize: Load all parent filters and child filters if URL has parent values
  useEffect(() => {
    const initFilters = async () => {
      // Load parent filters
      for (const filter of filters) {
        if (
          filter.options &&
          !Array.isArray(filter.options) &&
          !filter.parent
        ) {
          await loadFilterOptions(filter);
        }
      }

      // Load child filters if parent values exist in URL
      const currentValues = getCurrentFilterValues();

      for (const filter of filters) {
        if (filter.parent) {
          const parentValue = currentValues[filter.parent.filterName];
          if (
            parentValue !== undefined &&
            parentValue !== null &&
            parentValue !== ""
          ) {
            // Ensure parentValue is string or number
            const normalizedValue =
              typeof parentValue === "string" || typeof parentValue === "number"
                ? parentValue
                : String(parentValue);
            await loadFilterOptions(filter, normalizedValue);
          }
        }
      }
    };

    initFilters();
  }, []); // Only run once on mount

  // Sync URL values to form when drawer opens
  useEffect(() => {
    if (drawerVisible) {
      const currentValues = getCurrentFilterValues();
      form.setFieldsValue(currentValues);
    }
  }, [drawerVisible]);

  // Sync search value
  useEffect(() => {
    const urlSearchValue = searchParams.get("filter") || "";
    setSearchValue(urlSearchValue);
  }, [searchParams]);

  // Get current filter values from URL
  const getCurrentFilterValues = (): FilterValues => {
    const values: FilterValues = {};
    const searchValue = searchParams.get("filter");
    if (searchValue) values.filter = searchValue;

    filters.forEach((filter) => {
      const value = searchParams.get(filter.name);
      if (value) {
        // Convert to number if the filter has numeric options
        if (filter.type === "select" && Array.isArray(filter.options)) {
          const option = filter.options.find(
            (opt) => String(opt.value) === value
          );
          values[filter.name] = option ? option.value : value;
        } else {
          // For dynamic options, try to parse as number if possible
          const numValue = Number(value);
          values[filter.name] = isNaN(numValue) ? value : numValue;
        }
      }
    });
    return values;
  };

  // Load options for a specific filter
  const loadFilterOptions = async (
    filter: TableFilterType,
    parentValue?: string | number
  ) => {
    if (Array.isArray(filter.options)) return; // Static options, no need to load

    const filterKey = filter.parent
      ? `${filter.name}_${parentValue}`
      : filter.name;

    setLoadingFilters((prev) => ({ ...prev, [filterKey]: true }));

    try {
      if (typeof filter.options === "function") {
        const result =
          filter.parent && parentValue !== undefined
            ? await (
                filter.options as (
                  parentValue: string | number
                ) => Promise<SelectOption[]>
              )(parentValue)
            : await (filter.options as () => Promise<SelectOption[]>)();

        setFilterOptions((prev) => ({ ...prev, [filterKey]: result }));
      }
    } catch (error) {
      console.error(`Failed to load options for ${filter.name}:`, error);
      setFilterOptions((prev) => ({ ...prev, [filterKey]: [] }));
    } finally {
      setLoadingFilters((prev) => ({ ...prev, [filterKey]: false }));
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  const handleFilterSubmit = (values: FilterValues) => {
    const cleanedValues = Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = value;
        if (key === "filter") setSearchValue(String(value));
      }
      return acc;
    }, {} as Record<string, unknown>);

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

  const handleRemoveFilter = (filterName: string) => {
    const currentValues = getCurrentFilterValues();
    const { [filterName]: _, ...remainingFilters } = currentValues;

    // If removing a parent filter, also remove all dependent child filters
    const childFiltersToRemove = filters.filter(
      (f) => f.parent?.filterName === filterName
    );

    // Remove child filters from remainingFilters
    childFiltersToRemove.forEach((childFilter) => {
      delete remainingFilters[childFilter.name];
      form.setFieldValue(childFilter.name, undefined);
    });

    if (filterName === "filter") {
      setSearchValue("");
      onSearch("");
    }

    onFilterChange(remainingFilters);
    form.setFieldValue(filterName, undefined);
  };

  const handleClearAllFilters = () => {
    form.resetFields();
    setSearchValue("");
    onSearch("");
    onFilterChange({});
  };

  // Get display value for a filter
  const getFilterDisplayValue = (
    filter: TableFilterType,
    value: unknown
  ): string => {
    if (filter.type === "select") {
      if (Array.isArray(filter.options)) {
        const option = filter.options.find(
          (opt) => String(opt.value) === String(value)
        );
        return option ? option.label : String(value);
      } else {
        // Dynamic options
        const currentValues = getCurrentFilterValues();
        const filterKey = filter.parent
          ? `${filter.name}_${currentValues[filter.parent.filterName]}`
          : filter.name;

        const options = filterOptions[filterKey] || [];
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

    const searchValue = searchParams.get("filter");
    if (searchValue) {
      activeFilters.push({
        name: "filter",
        label: "Search",
        value: searchValue,
        displayValue: searchValue,
      });
    }

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

  const getActiveFiltersCount = (): number => {
    return getActiveFilters().length;
  };

  const renderFilterInput = (filter: TableFilterType) => {
    switch (filter.type) {
      case "text":
        return <Input placeholder={`Enter ${filter.label}`} allowClear />;

      case "number":
        return (
          <Input
            type="number"
            placeholder={`Enter ${filter.label}`}
            allowClear
          />
        );

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
              optionFilterProp="label"
              options={filter.options}
            />
          );
        } else {
          // Dynamic options
          const formValues = form.getFieldsValue();
          const currentValues = { ...getCurrentFilterValues(), ...formValues };

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
              options = filterOptions[filterKey] || [];
              isLoading = loadingFilters[filterKey] || false;
            } else {
              isDisabled = true;
            }
          } else {
            options = filterOptions[filterKey] || [];
            isLoading = loadingFilters[filterKey] || false;
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
              optionFilterProp="label"
              options={options}
              onChange={(value) => {
                form.setFieldValue(filter.name, value);

                // If this is a parent filter, clear and reload child filters
                const childFilters = filters.filter(
                  (f) => f.parent?.filterName === filter.name
                );
                if (childFilters.length > 0) {
                  childFilters.forEach((childFilter) => {
                    form.setFieldValue(childFilter.name, undefined);
                    if (value !== undefined && value !== null && value !== "") {
                      loadFilterOptions(childFilter, value);
                    }
                  });
                }
              }}
            />
          );
        }

      default:
        return <Input placeholder={`Enter ${filter.label}`} allowClear />;
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div className="flex items-center flex-wrap gap-2">
        <Space>
          <Search
            placeholder="Search..."
            allowClear
            enterButton={<SearchOutlined />}
            size="middle"
            onSearch={handleSearch}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 300 }}
          />

          <Badge size="default" count={getActiveFiltersCount()}>
            <Button
              type="default"
              variant="outlined"
              icon={<FilterOutlined />}
              onClick={() => setDrawerVisible(true)}
            />
          </Badge>
        </Space>

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
                />
              )}
            </Space>
          </div>
        )}
      </div>

      <Drawer
        title="Filter Options"
        placement="right"
        width={400}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        extra={
          <Space>
            <Button onClick={handleFilterReset}>Reset</Button>
            <Button type="primary" onClick={() => form.submit()}>
              Apply
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleFilterSubmit}>
          <Form.Item name="filter" label="Search">
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
