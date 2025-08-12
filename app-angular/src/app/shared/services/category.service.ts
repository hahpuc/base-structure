import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';

import { CategoryDto, CreateCategory, EditCategory, QueryCategory } from '../types/category';

import { AppBaseService } from './app-base.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends AppBaseService<
  number,
  CategoryDto,
  CreateCategory,
  EditCategory,
  QueryCategory
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.apis.default.apiPrefix, 'categories');
  }

  getAll(): Observable<CategoryDto[]> {
    return this.httpClient.get<CategoryDto[]>(`${this.apiUrl}`);
  }
}
