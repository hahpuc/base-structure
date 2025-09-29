import { HttpParams } from '@angular/common/http';
import dayjs from 'dayjs';

import { Dictionary } from '@shared/types/base';

export const getUrlParams = (params: Dictionary): string => {
  const queryParams = [];

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      if (isEmpty(value)) continue;
      if (Array.isArray(value)) {
        value.forEach(val => {
          queryParams.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(val)}`);
        });
      } else {
        queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
      }
    }
  }
  return `?${queryParams.join('&')}`;
};

export const getNumber = (value: string): number | undefined => {
  if (!value || isNaN(+value)) return undefined;
  return +value;
};

export const isEmpty = (value: unknown): boolean => {
  return value == null || (typeof value === 'string' && value.trim().length === 0);
};

export const getBodyUrlencoded = (data: { [key: string]: string | number }) => {
  let body = new HttpParams();
  Object.keys(data).forEach(key => {
    body = body.set(key, data[key]);
  });
  return body;
};

export const downloadFileFromBlob = (data: Blob | Uint8Array, name: string) => {
  const downloadLink = document.createElement('a');
  const blob = data instanceof Blob ? data : new Blob([data.buffer]);

  const fileName = name.includes('.') ? name : `${name}_${dayjs().format('YYYYMMDD_HHmmss')}.xlsx`;

  const blobUrl = URL.createObjectURL(blob);
  downloadLink.href = blobUrl;
  downloadLink.download = fileName;
  downloadLink.click();
  URL.revokeObjectURL(blobUrl);
};
