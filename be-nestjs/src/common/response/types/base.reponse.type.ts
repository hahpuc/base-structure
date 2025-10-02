export type ImportProgressResponse = {
  error_key?: string;
  message?: string;
  progress?: number;
  status?: string;
};

export type BaseImportResponse = { error_key: string; message: string };

export type ExportResponse = {
  key: string;
};
