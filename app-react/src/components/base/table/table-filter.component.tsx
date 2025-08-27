import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Select, Space, Form, DatePicker, Tag } from 'antd';
import React, { useState } from 'react';

import {
  TableFilter as TableFilterType,
  SelectOption,
  FilterValues,
} from './models/table-filter.model';

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

  const handleSearch = (value: string) => {
    onSearch(value);
  };

  const handleFilterSubmit = (values: FilterValues) => {
    // Remove empty values
    const cleanedValues = Object.entries(values).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, unknown>
    );

    onFilterChange(cleanedValues);
    setDrawerVisible(false);
  };

  const handleFilterReset = () => {
    form.resetFields();
    onFilterChange({});
    setDrawerVisible(false);
  };

  // Remove individual filter
  const handleRemoveFilter = (filterName: string) => {
    const currentValues = getCurrentFilterValues();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [filterName]: _removed, ...remainingFilters } = currentValues;
    onFilterChange(remainingFilters);
  };

  // Remove all filters
  const handleClearAllFilters = () => {
    // Clear search filter and all other filters by passing empty object
    onSearch('');
    onFilterChange({});
  };

  // Get display value for filter
  const getFilterDisplayValue = (filter: TableFilterType, value: unknown): string => {
    if (filter.type === 'select' && Array.isArray(filter.options)) {
      const option = filter.options.find(opt => String(opt.value) === String(value));
      return option ? option.label : String(value);
    }
    if (filter.type === 'date' && value) {
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
    const searchValue = searchParams.get('search');
    if (searchValue) {
      activeFilters.push({
        name: 'search',
        label: 'Search',
        value: searchValue,
        displayValue: searchValue,
      });
    }

    // Add other filters
    filters.forEach(filter => {
      const value = currentValues[filter.name];
      if (value !== undefined && value !== null && value !== '') {
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

  // Get current filter values from URL params
  const getCurrentFilterValues = (): FilterValues => {
    const values: FilterValues = {};
    filters.forEach(filter => {
      const value = searchParams.get(filter.name);
      if (value) {
        values[filter.name] = value;
      }
    });
    return values;
  };

  const renderFilterInput = (filter: TableFilterType) => {
    switch (filter.type) {
      case 'text':
        return <Input placeholder={`Enter ${filter.label}`} />;

      case 'number':
        return <Input type="number" placeholder={`Enter ${filter.label}`} />;

      case 'date':
        return <DatePicker style={{ width: '100%' }} />;

      case 'select':
        if (Array.isArray(filter.options)) {
          return (
            <Select
              placeholder={`Select ${filter.label}`}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {filter.options.map((option: SelectOption) => (
                <Select.Option key={String(option.value)} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          );
        }
        // For dynamic options (API calls), we'll implement this later
        return <Select placeholder={`Select ${filter.label}`} allowClear />;

      default:
        return <Input placeholder={`Enter ${filter.label}`} />;
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <Space>
        <Search
          placeholder="Search..."
          allowClear
          enterButton={<SearchOutlined />}
          size="middle"
          onSearch={handleSearch}
          defaultValue={searchParams.get('search') || ''}
          style={{ width: 300 }}
        />

        <Button type="primary" icon={<FilterOutlined />} onClick={() => setDrawerVisible(true)}>
          Filters
        </Button>
      </Space>

      {/* Active Filter Tags */}
      {getActiveFilters().length > 0 && (
        <div style={{ marginTop: 12 }}>
          <Space wrap>
            {getActiveFilters().map(activeFilter => (
              <Tag
                key={activeFilter.name}
                closable
                onClose={() => {
                  if (activeFilter.name === 'search') {
                    onSearch('');
                  } else {
                    handleRemoveFilter(activeFilter.name);
                  }
                }}
                color="blue"
              >
                <strong>{activeFilter.label}:</strong> {activeFilter.displayValue}
              </Tag>
            ))}
            {getActiveFilters().length > 1 && (
              <Button
                type="link"
                size="small"
                onClick={handleClearAllFilters}
                style={{ padding: 0, height: 'auto' }}
              >
                Clear All
              </Button>
            )}
          </Space>
        </div>
      )}

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
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFilterSubmit}
          initialValues={getCurrentFilterValues()}
        >
          {filters.map(filter => (
            <Form.Item key={filter.name} name={filter.name} label={filter.label} help={filter.note}>
              {renderFilterInput(filter)}
            </Form.Item>
          ))}
        </Form>
      </Drawer>
    </div>
  );
};
