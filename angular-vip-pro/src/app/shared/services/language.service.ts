import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';

import { BaseOption } from '../types/base';
import { CreateLanguage, EditLanguage, LanguageDto, QueryLanguage } from '../types/language';
import { TranslationData } from '../types/translation';

import { AppBaseService } from './app-base.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends AppBaseService<
  number,
  LanguageDto,
  CreateLanguage,
  EditLanguage,
  QueryLanguage
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.apis.default.apiPrefix, 'languages');
  }

  getOptions(): Observable<BaseOption[]> {
    return this.httpClient.get<BaseOption[]>(`${this.apiUrl}/options`);
  }

  getAllLanguages(): Observable<LanguageDto[]> {
    // Example response:
    //  [
    //   {
    //     "created_at": "2025-09-24T10:46:15.000Z",
    //     "updated_at": "2025-09-24T10:46:15.000Z",
    //     "id": 1,
    //     "code": "en",
    //     "name": "English",
    //     "native_name": "English",
    //     "flag_code": "US",
    //     "flag_icon": "https://flagcdn.com/us.svg",
    //     "is_rtl": false,
    //     "status": 1
    //   },
    //   {
    //     "created_at": "2025-09-24T10:46:15.000Z",
    //     "updated_at": "2025-09-24T10:46:15.000Z",
    //     "id": 2,
    //     "code": "vi",
    //     "name": "Vietnamese",
    //     "native_name": "Tiếng Việt",
    //     "flag_code": "VN",
    //     "flag_icon": "https://flagcdn.com/vn.svg",
    //     "is_rtl": false,
    //     "status": 1
    //   }
    // ]
    return this.httpClient.get<LanguageDto[]>(`${this.apiUrl}/all`);
  }

  getAllTranslations(): Observable<Record<string, TranslationData>> {
    // Example response:{
    //   "en": {
    //     "common": {
    //       "HELLO": "Hello",
    //       "GOODBYE": "Goodbye",
    //       "WELCOME": "Welcome",
    //       "THANK_YOU": "Thank you",
    //       "PLEASE": "Please",
    //       "SAVE": "Save",
    //       "CANCEL": "Cancel",
    //       "DELETE": "Delete",
    //       "EDIT": "Edit",
    //       "CREATE": "Create",
    //       "UPDATE": "Update",
    //       "VIEW": "View",
    //       "SEARCH": "Search",
    //       "FILTER": "Filter",
    //       "SORT": "Sort",
    //       "SUCCESS": "Success",
    //       "ERROR": "Error",
    //       "WARNING": "Warning",
    //       "INFO": "Information",
    //       "LOADING": "Loading...",
    //       "YES": "Yes",
    //       "NO": "No",
    //       "OK": "OK",
    //       "CONFIRM": "Confirm",
    //       "CLOSE": "Close",
    //       "NOT_FOUND": "Not found",
    //       "ACCESS_DENIED": "Access denied",
    //       "INTERNAL_ERROR": "Internal server error",
    //       "INVALID_REQUEST": "Invalid request"
    //     },
    //     "category": {
    //       "CATEGORY": "Category",
    //       "CATEGORIES": "Categories",
    //       "CATEGORY_NAME": "Category Name",
    //       "CATEGORY_DESCRIPTION": "Category Description",
    //       "CATEGORY_SLUG": "Category Slug",
    //       "CREATE_CATEGORY": "Create Category",
    //       "EDIT_CATEGORY": "Edit Category",
    //       "DELETE_CATEGORY": "Delete Category",
    //       "VIEW_CATEGORY": "View Category",
    //       "LIST_CATEGORIES": "List Categories",
    //       "CATEGORY_CREATED": "Category created successfully",
    //       "CATEGORY_UPDATED": "Category updated successfully",
    //       "CATEGORY_DELETED": "Category deleted successfully",
    //       "NOT_FOUND": "Category not found",
    //       "CATEGORY_SLUG_INVALID": "Category slug is already taken",
    //       "CATEGORY_NAME_REQUIRED": "Category name is required",
    //       "CATEGORY_NAME_TOO_SHORT": "Category name is too short",
    //       "CATEGORY_NAME_TOO_LONG": "Category name is too long",
    //       "CATEGORY_SLUG_REQUIRED": "Category slug is required",
    //       "CATEGORY_SLUG_INVALID_FORMAT": "Category slug format is invalid"
    //     },
    //     "auth": {
    //       "LOGIN": "Login",
    //       "LOGOUT": "Logout",
    //       "REGISTER": "Register",
    //       "EMAIL": "Email",
    //       "PASSWORD": "Password",
    //       "CONFIRM_PASSWORD": "Confirm Password",
    //       "FORGOT_PASSWORD": "Forgot Password?",
    //       "LOGIN_SUCCESS": "Login successful",
    //       "LOGIN_FAILED": "Login failed",
    //       "INVALID_CREDENTIALS": "Invalid email or password"
    //     },
    //     "validation": {
    //       "REQUIRED": "This field is required",
    //       "INVALID_EMAIL": "Please enter a valid email address",
    //       "PASSWORD_TOO_SHORT": "Password must be at least 8 characters long",
    //       "PASSWORDS_NOT_MATCH": "Passwords do not match",
    //       "INVALID_FORMAT": "Invalid format",
    //       "TOO_SHORT": "This field is too short",
    //       "TOO_LONG": "This field is too long",
    //       "INVALID_NUMBER": "Please enter a valid number",
    //       "INVALID_DATE": "Please enter a valid date",
    //       "FIELD_ALREADY_EXISTS": "This value already exists"
    //     }
    //   },
    //   "vi": {
    //     "common": {
    //       "HELLO": "Xin chào",
    //       "GOODBYE": "Tạm biệt",
    //       "WELCOME": "Chào mừng",
    //       "THANK_YOU": "Cảm ơn bạn",
    //       "PLEASE": "Xin vui lòng",
    //       "SAVE": "Lưu",
    //       "CANCEL": "Hủy",
    //       "DELETE": "Xóa",
    //       "EDIT": "Chỉnh sửa",
    //       "CREATE": "Tạo mới",
    //       "UPDATE": "Cập nhật",
    //       "VIEW": "Xem",
    //       "SEARCH": "Tìm kiếm",
    //       "FILTER": "Lọc",
    //       "SORT": "Sắp xếp",
    //       "SUCCESS": "Thành công",
    //       "ERROR": "Lỗi",
    //       "WARNING": "Cảnh báo",
    //       "INFO": "Thông tin",
    //       "LOADING": "Đang tải...",
    //       "YES": "Có",
    //       "NO": "Không",
    //       "OK": "Đồng ý",
    //       "CONFIRM": "Xác nhận",
    //       "CLOSE": "Đóng",
    //       "NOT_FOUND": "Không tìm thấy",
    //       "ACCESS_DENIED": "Truy cập bị từ chối",
    //       "INTERNAL_ERROR": "Lỗi máy chủ nội bộ",
    //       "INVALID_REQUEST": "Yêu cầu không hợp lệ"
    //     },
    //     "category": {
    //       "CATEGORY": "Danh mục",
    //       "CATEGORIES": "Danh mục",
    //       "CATEGORY_NAME": "Tên danh mục",
    //       "CATEGORY_DESCRIPTION": "Mô tả danh mục",
    //       "CATEGORY_SLUG": "Đường dẫn danh mục",
    //       "CREATE_CATEGORY": "Tạo danh mục",
    //       "EDIT_CATEGORY": "Sửa danh mục",
    //       "DELETE_CATEGORY": "Xóa danh mục",
    //       "VIEW_CATEGORY": "Xem danh mục",
    //       "LIST_CATEGORIES": "Danh sách danh mục",
    //       "CATEGORY_CREATED": "Tạo danh mục thành công",
    //       "CATEGORY_UPDATED": "Cập nhật danh mục thành công",
    //       "CATEGORY_DELETED": "Xóa danh mục thành công",
    //       "NOT_FOUND": "Không tìm thấy danh mục",
    //       "CATEGORY_SLUG_INVALID": "Đường dẫn danh mục đã được sử dụng",
    //       "CATEGORY_NAME_REQUIRED": "Tên danh mục là bắt buộc",
    //       "CATEGORY_NAME_TOO_SHORT": "Tên danh mục quá ngắn",
    //       "CATEGORY_NAME_TOO_LONG": "Tên danh mục quá dài",
    //       "CATEGORY_SLUG_REQUIRED": "Đường dẫn danh mục là bắt buộc",
    //       "CATEGORY_SLUG_INVALID_FORMAT": "Định dạng đường dẫn danh mục không hợp lệ"
    //     },
    //     "auth": {
    //       "LOGIN": "Đăng nhập",
    //       "LOGOUT": "Đăng xuất",
    //       "REGISTER": "Đăng ký",
    //       "EMAIL": "Email",
    //       "PASSWORD": "Mật khẩu",
    //       "CONFIRM_PASSWORD": "Xác nhận mật khẩu",
    //       "FORGOT_PASSWORD": "Quên mật khẩu?",

    return this.httpClient.get<Record<string, TranslationData>>(`${this.apiUrl}/translations/all`);
  }
}
