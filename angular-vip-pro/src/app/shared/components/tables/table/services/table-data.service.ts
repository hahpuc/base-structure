import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ListPaginate } from "@/app/shared/types/base";

import { FilterParams, TableOption, TableRowData } from "../table.model";

@Injectable({ providedIn: "root" })
export class TableDataService<T extends TableRowData = TableRowData> {
  /**
   * Loads data for the table, handling both static arrays and dynamic Observable sources.
   * Returns an Observable for dynamic data, or a paginated result for static data.
   */
  loadData(
    option: TableOption<T>,
    params: { page: number; limit: number; sorting?: string } & FilterParams
  ): Observable<ListPaginate<T>> | ListPaginate<T> | null {
    if (!option.data) return null;

    if (Array.isArray(option.data)) {
      // Static data: filter, sort, and paginate client-side
      let filteredData = [...option.data];
      if (params) {
        if (Object.keys(params).length > 0) {
          filteredData = this.applyFiltersToStaticData(filteredData, params);
        }
        if (params.sorting) {
          filteredData = this.applySortingToStaticData(
            filteredData,
            params.sorting
          );
        }
      }
      const total = filteredData.length;
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      const pageData = filteredData.slice(startIndex, endIndex);
      const totalPages = Math.ceil(total / params.limit) || 1;
      return {
        data: pageData,
        total_records: total,
        limit: params.limit,
        page: params.page,
        total_pages: totalPages,
      };
    }

    // Dynamic data: delegate to the provided function
    return option.data(params);
  }

  /**
   * Utility to get nested value from object by path (e.g., 'user.name')
   */
  getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    return path.split(".").reduce((current: unknown, prop: string) => {
      if (current && typeof current === "object" && prop in current) {
        return (current as Record<string, unknown>)[prop];
      }
      return undefined;
    }, obj);
  }

  /**
   * Applies filters to static data.
   */
  applyFiltersToStaticData(data: T[], filters: FilterParams): T[] {
    return data.filter((item) => {
      return Object.keys(filters).every((key) => {
        if (["page", "limit", "sorting"].includes(key)) return true;
        const filterValue = filters[key];
        const itemValue = this.getNestedValue(item, key);
        if (
          filterValue === null ||
          filterValue === undefined ||
          filterValue === ""
        ) {
          return true;
        }
        if (typeof filterValue === "string") {
          return String(itemValue ?? "")
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        }
        return itemValue === filterValue;
      });
    });
  }

  /**
   * Applies sorting to static data.
   */
  applySortingToStaticData(data: T[], sortString: string): T[] {
    if (!sortString) return data;
    const [field, direction] = sortString.split(" ");
    return [...data].sort((a, b) => {
      const aValue = this.getNestedValue(a, field);
      const bValue = this.getNestedValue(b, field);
      const aStr = String(aValue ?? "");
      const bStr = String(bValue ?? "");
      if (direction === "asc") {
        return aStr > bStr ? 1 : -1;
      } else {
        return aStr < bStr ? 1 : -1;
      }
    });
  }
}
