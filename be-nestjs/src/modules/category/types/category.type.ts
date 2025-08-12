export interface ICategoryResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryListResponse {
  data: ICategoryResponse[];
  total: number;
}
