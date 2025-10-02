import {
  ListPaginate,
  QueryPaginate,
} from '@common/database/types/database.type';

export function wrapPagination<T>(
  data: T[],
  totalCount: number,
  paginationCfg: QueryPaginate,
): ListPaginate<T> {
  return {
    data: data,
    total_pages: Math.ceil(totalCount / paginationCfg.limit),
    limit: paginationCfg.limit,
    page: paginationCfg.page,
    total_records: totalCount,
  };
}

export function parseJson(input: any) {
  try {
    return JSON.parse(input);
  } catch (e) {
    return null;
  }
}

export const isEmpty = (value: unknown): boolean => {
  return (
    value == null || (typeof value === 'string' && value.trim().length === 0)
  );
};

export function objOmit(obj: any, keysToOmit: string[]) {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !keysToOmit.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function chunk(arr: any[], chunkSize = 1, cache = []) {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
}

export const padStart = (str: string, length: number, padChar = '') => {
  if (str.length >= length) {
    return str;
  }

  const paddingLength = length - str.length;
  const padding = padChar.repeat(paddingLength);

  return padding + str;
};

export function orderBy(collection, iterates, orders) {
  if (!Array.isArray(collection)) {
    return [];
  }

  iterates = iterates || [(item) => item];
  orders = orders || iterates.map(() => 'asc');

  iterates = iterates.map((iteratee) => {
    if (typeof iteratee === 'function') {
      return iteratee;
    } else if (typeof iteratee === 'string') {
      return (item) => item[iteratee];
    } else {
      return (item) => item;
    }
  });

  return collection.sort((a, b) => {
    for (let i = 0; i < iterates.length; i++) {
      const iteratee = iterates[i];
      const order = orders[i];
      const valueA = iteratee(a);
      const valueB = iteratee(b);

      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });
}
