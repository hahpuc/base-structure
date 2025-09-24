-- ============================================
-- Language Module - Sample Data SQL
-- ============================================
-- This file contains sample data for the language module
-- Execute these statements in order

-- ============================================
-- 1. Insert Languages
-- ============================================

INSERT INTO `languages` (
    `code`, 
    `name`, 
    `native_name`, 
    `flag_code`, 
    `flag_icon`, 
    `is_rtl`, 
    `status`, 
    `created_at`, 
    `updated_at`
) VALUES 
-- English Language
(
    'en',
    'English',
    'English',
    'US',
    'https://flagcdn.com/us.svg',
    0,
    1,
    NOW(),
    NOW()
),
-- Vietnamese Language  
(
    'vi',
    'Vietnamese',
    'Tiếng Việt',
    'VN',
    'https://flagcdn.com/vn.svg',
    0,
    1,
    NOW(),
    NOW()
);

-- ============================================
-- 2. Insert Translation Namespaces
-- ============================================

INSERT INTO `translation_namespaces` (
    `name`, 
    `description`, 
    `status`, 
    `created_at`, 
    `updated_at`
) VALUES 
-- Common namespace for shared translations
(
    'common',
    'Common translations used across the application',
    1,
    NOW(),
    NOW()
),
-- Category namespace for category-related translations
(
    'category',
    'Translations related to category management',
    1,
    NOW(),
    NOW()
),
-- Auth namespace for authentication-related translations
(
    'auth',
    'Translations for authentication and authorization',
    1,
    NOW(),
    NOW()
),
-- Validation namespace for validation messages
(
    'validation',
    'Validation error messages and form validations',
    1,
    NOW(),
    NOW()
);

-- ============================================
-- 3. Insert Translations - COMMON namespace
-- ============================================

-- Get language and namespace IDs for reference
SET @en_lang_id = (SELECT id FROM languages WHERE code = 'en');
SET @vi_lang_id = (SELECT id FROM languages WHERE code = 'vi');
SET @common_ns_id = (SELECT id FROM translation_namespaces WHERE name = 'common');
SET @category_ns_id = (SELECT id FROM translation_namespaces WHERE name = 'category');
SET @auth_ns_id = (SELECT id FROM translation_namespaces WHERE name = 'auth');
SET @validation_ns_id = (SELECT id FROM translation_namespaces WHERE name = 'validation');

-- COMMON translations - English
INSERT INTO `translations` (
    `key`, 
    `value`, 
    `description`, 
    `status`, 
    `version`, 
    `namespace_id`, 
    `language_id`, 
    `created_at`, 
    `updated_at`
) VALUES 
-- Basic common translations
('HELLO', 'Hello', 'Basic greeting', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('GOODBYE', 'Goodbye', 'Basic farewell', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('WELCOME', 'Welcome', 'Welcome message', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('THANK_YOU', 'Thank you', 'Expression of gratitude', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('PLEASE', 'Please', 'Polite request word', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),

-- Actions
('SAVE', 'Save', 'Save action', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('CANCEL', 'Cancel', 'Cancel action', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('DELETE', 'Delete', 'Delete action', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('EDIT', 'Edit', 'Edit action', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('CREATE', 'Create', 'Create action', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('UPDATE', 'Update', 'Update action', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('VIEW', 'View', 'View action', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('SEARCH', 'Search', 'Search action', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('FILTER', 'Filter', 'Filter action', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('SORT', 'Sort', 'Sort action', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),

-- Status messages
('SUCCESS', 'Success', 'Success message', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('ERROR', 'Error', 'Error message', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('WARNING', 'Warning', 'Warning message', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('INFO', 'Information', 'Information message', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('LOADING', 'Loading...', 'Loading state message', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),

-- Common UI elements
('YES', 'Yes', 'Confirmation - Yes', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('NO', 'No', 'Confirmation - No', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('OK', 'OK', 'Confirmation - OK', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('CONFIRM', 'Confirm', 'Confirmation action', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('CLOSE', 'Close', 'Close action', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),

-- Common error messages
('NOT_FOUND', 'Not found', 'Item not found error', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('ACCESS_DENIED', 'Access denied', 'Access denied error', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('INTERNAL_ERROR', 'Internal server error', 'Internal server error', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW()),
('INVALID_REQUEST', 'Invalid request', 'Invalid request error', 1, 1, @common_ns_id, @en_lang_id, NOW(), NOW());

-- COMMON translations - Vietnamese
INSERT INTO `translations` (
    `key`, 
    `value`, 
    `description`, 
    `status`, 
    `version`, 
    `namespace_id`, 
    `language_id`, 
    `created_at`, 
    `updated_at`
) VALUES 
-- Basic common translations
('HELLO', 'Xin chào', 'Lời chào cơ bản', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('GOODBYE', 'Tạm biệt', 'Lời chào tạm biệt', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('WELCOME', 'Chào mừng', 'Thông điệp chào mừng', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('THANK_YOU', 'Cảm ơn bạn', 'Lời cảm ơn', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('PLEASE', 'Xin vui lòng', 'Từ lịch sự khi yêu cầu', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),

-- Actions
('SAVE', 'Lưu', 'Hành động lưu', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('CANCEL', 'Hủy', 'Hành động hủy', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('DELETE', 'Xóa', 'Hành động xóa', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('EDIT', 'Chỉnh sửa', 'Hành động chỉnh sửa', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('CREATE', 'Tạo mới', 'Hành động tạo mới', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('UPDATE', 'Cập nhật', 'Hành động cập nhật', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('VIEW', 'Xem', 'Hành động xem', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('SEARCH', 'Tìm kiếm', 'Hành động tìm kiếm', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('FILTER', 'Lọc', 'Hành động lọc', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('SORT', 'Sắp xếp', 'Hành động sắp xếp', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),

-- Status messages
('SUCCESS', 'Thành công', 'Thông báo thành công', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('ERROR', 'Lỗi', 'Thông báo lỗi', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('WARNING', 'Cảnh báo', 'Thông báo cảnh báo', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('INFO', 'Thông tin', 'Thông báo thông tin', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('LOADING', 'Đang tải...', 'Thông báo đang tải', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),

-- Common UI elements
('YES', 'Có', 'Xác nhận - Có', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('NO', 'Không', 'Xác nhận - Không', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('OK', 'Đồng ý', 'Xác nhận - Đồng ý', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('CONFIRM', 'Xác nhận', 'Hành động xác nhận', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('CLOSE', 'Đóng', 'Hành động đóng', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),

-- Common error messages
('NOT_FOUND', 'Không tìm thấy', 'Lỗi không tìm thấy mục', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('ACCESS_DENIED', 'Truy cập bị từ chối', 'Lỗi truy cập bị từ chối', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('INTERNAL_ERROR', 'Lỗi máy chủ nội bộ', 'Lỗi máy chủ nội bộ', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW()),
('INVALID_REQUEST', 'Yêu cầu không hợp lệ', 'Lỗi yêu cầu không hợp lệ', 1, 1, @common_ns_id, @vi_lang_id, NOW(), NOW());

-- ============================================
-- 4. Insert Translations - CATEGORY namespace
-- ============================================

-- CATEGORY translations - English
INSERT INTO `translations` (
    `key`, 
    `value`, 
    `description`, 
    `status`, 
    `version`, 
    `namespace_id`, 
    `language_id`, 
    `created_at`, 
    `updated_at`
) VALUES 
-- Category management
('CATEGORY', 'Category', 'Category entity name', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('CATEGORIES', 'Categories', 'Category entity plural', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('CATEGORY_NAME', 'Category Name', 'Category name field', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('CATEGORY_DESCRIPTION', 'Category Description', 'Category description field', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('CATEGORY_SLUG', 'Category Slug', 'Category slug field', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),

-- Category actions
('CREATE_CATEGORY', 'Create Category', 'Create new category action', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('EDIT_CATEGORY', 'Edit Category', 'Edit category action', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('DELETE_CATEGORY', 'Delete Category', 'Delete category action', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('VIEW_CATEGORY', 'View Category', 'View category details action', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('LIST_CATEGORIES', 'List Categories', 'List all categories action', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),

-- Category messages
('CATEGORY_CREATED', 'Category created successfully', 'Category creation success message', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('CATEGORY_UPDATED', 'Category updated successfully', 'Category update success message', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('CATEGORY_DELETED', 'Category deleted successfully', 'Category deletion success message', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('CATEGORY_NOT_FOUND', 'Category not found', 'Category not found error message', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('CATEGORY_SLUG_INVALID', 'Category slug is already taken', 'Category slug validation error', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),

-- Category validation
('CATEGORY_NAME_REQUIRED', 'Category name is required', 'Category name validation', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('CATEGORY_NAME_TOO_SHORT', 'Category name is too short', 'Category name length validation', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('CATEGORY_NAME_TOO_LONG', 'Category name is too long', 'Category name length validation', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('CATEGORY_SLUG_REQUIRED', 'Category slug is required', 'Category slug validation', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW()),
('CATEGORY_SLUG_INVALID_FORMAT', 'Category slug format is invalid', 'Category slug format validation', 1, 1, @category_ns_id, @en_lang_id, NOW(), NOW());

-- CATEGORY translations - Vietnamese
INSERT INTO `translations` (
    `key`, 
    `value`, 
    `description`, 
    `status`, 
    `version`, 
    `namespace_id`, 
    `language_id`, 
    `created_at`, 
    `updated_at`
) VALUES 
-- Category management
('CATEGORY', 'Danh mục', 'Tên thực thể danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('CATEGORIES', 'Danh mục', 'Tên thực thể danh mục số nhiều', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('CATEGORY_NAME', 'Tên danh mục', 'Trường tên danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('CATEGORY_DESCRIPTION', 'Mô tả danh mục', 'Trường mô tả danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('CATEGORY_SLUG', 'Đường dẫn danh mục', 'Trường slug danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),

-- Category actions
('CREATE_CATEGORY', 'Tạo danh mục', 'Hành động tạo danh mục mới', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('EDIT_CATEGORY', 'Sửa danh mục', 'Hành động sửa danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('DELETE_CATEGORY', 'Xóa danh mục', 'Hành động xóa danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('VIEW_CATEGORY', 'Xem danh mục', 'Hành động xem chi tiết danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('LIST_CATEGORIES', 'Danh sách danh mục', 'Hành động liệt kê tất cả danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),

-- Category messages
('CATEGORY_CREATED', 'Tạo danh mục thành công', 'Thông báo tạo danh mục thành công', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('CATEGORY_UPDATED', 'Cập nhật danh mục thành công', 'Thông báo cập nhật danh mục thành công', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('CATEGORY_DELETED', 'Xóa danh mục thành công', 'Thông báo xóa danh mục thành công', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('CATEGORY_NOT_FOUND', 'Không tìm thấy danh mục', 'Thông báo lỗi không tìm thấy danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('CATEGORY_SLUG_INVALID', 'Đường dẫn danh mục đã được sử dụng', 'Lỗi xác thực slug danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),

-- Category validation
('CATEGORY_NAME_REQUIRED', 'Tên danh mục là bắt buộc', 'Xác thực tên danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('CATEGORY_NAME_TOO_SHORT', 'Tên danh mục quá ngắn', 'Xác thực độ dài tên danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('CATEGORY_NAME_TOO_LONG', 'Tên danh mục quá dài', 'Xác thực độ dài tên danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('CATEGORY_SLUG_REQUIRED', 'Đường dẫn danh mục là bắt buộc', 'Xác thực slug danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW()),
('CATEGORY_SLUG_INVALID_FORMAT', 'Định dạng đường dẫn danh mục không hợp lệ', 'Xác thực định dạng slug danh mục', 1, 1, @category_ns_id, @vi_lang_id, NOW(), NOW());

-- ============================================
-- 5. Insert Translations - AUTH namespace (bonus)
-- ============================================

-- AUTH translations - English
INSERT INTO `translations` (
    `key`, 
    `value`, 
    `description`, 
    `status`, 
    `version`, 
    `namespace_id`, 
    `language_id`, 
    `created_at`, 
    `updated_at`
) VALUES 
('LOGIN', 'Login', 'Login action', 1, 1, @auth_ns_id, @en_lang_id, NOW(), NOW()),
('LOGOUT', 'Logout', 'Logout action', 1, 1, @auth_ns_id, @en_lang_id, NOW(), NOW()),
('REGISTER', 'Register', 'Register action', 1, 1, @auth_ns_id, @en_lang_id, NOW(), NOW()),
('EMAIL', 'Email', 'Email field label', 1, 1, @auth_ns_id, @en_lang_id, NOW(), NOW()),
('PASSWORD', 'Password', 'Password field label', 1, 1, @auth_ns_id, @en_lang_id, NOW(), NOW()),
('CONFIRM_PASSWORD', 'Confirm Password', 'Confirm password field label', 1, 1, @auth_ns_id, @en_lang_id, NOW(), NOW()),
('FORGOT_PASSWORD', 'Forgot Password?', 'Forgot password link', 1, 1, @auth_ns_id, @en_lang_id, NOW(), NOW()),
('LOGIN_SUCCESS', 'Login successful', 'Login success message', 1, 1, @auth_ns_id, @en_lang_id, NOW(), NOW()),
('LOGIN_FAILED', 'Login failed', 'Login failed message', 1, 1, @auth_ns_id, @en_lang_id, NOW(), NOW()),
('INVALID_CREDENTIALS', 'Invalid email or password', 'Invalid credentials error', 1, 1, @auth_ns_id, @en_lang_id, NOW(), NOW());

-- AUTH translations - Vietnamese
INSERT INTO `translations` (
    `key`, 
    `value`, 
    `description`, 
    `status`, 
    `version`, 
    `namespace_id`, 
    `language_id`, 
    `created_at`, 
    `updated_at`
) VALUES 
('LOGIN', 'Đăng nhập', 'Hành động đăng nhập', 1, 1, @auth_ns_id, @vi_lang_id, NOW(), NOW()),
('LOGOUT', 'Đăng xuất', 'Hành động đăng xuất', 1, 1, @auth_ns_id, @vi_lang_id, NOW(), NOW()),
('REGISTER', 'Đăng ký', 'Hành động đăng ký', 1, 1, @auth_ns_id, @vi_lang_id, NOW(), NOW()),
('EMAIL', 'Email', 'Nhãn trường email', 1, 1, @auth_ns_id, @vi_lang_id, NOW(), NOW()),
('PASSWORD', 'Mật khẩu', 'Nhãn trường mật khẩu', 1, 1, @auth_ns_id, @vi_lang_id, NOW(), NOW()),
('CONFIRM_PASSWORD', 'Xác nhận mật khẩu', 'Nhãn trường xác nhận mật khẩu', 1, 1, @auth_ns_id, @vi_lang_id, NOW(), NOW()),
('FORGOT_PASSWORD', 'Quên mật khẩu?', 'Liên kết quên mật khẩu', 1, 1, @auth_ns_id, @vi_lang_id, NOW(), NOW()),
('LOGIN_SUCCESS', 'Đăng nhập thành công', 'Thông báo đăng nhập thành công', 1, 1, @auth_ns_id, @vi_lang_id, NOW(), NOW()),
('LOGIN_FAILED', 'Đăng nhập thất bại', 'Thông báo đăng nhập thất bại', 1, 1, @auth_ns_id, @vi_lang_id, NOW(), NOW()),
('INVALID_CREDENTIALS', 'Email hoặc mật khẩu không hợp lệ', 'Lỗi thông tin đăng nhập không hợp lệ', 1, 1, @auth_ns_id, @vi_lang_id, NOW(), NOW());

-- ============================================
-- 6. Insert Translations - VALIDATION namespace (bonus)
-- ============================================

-- VALIDATION translations - English
INSERT INTO `translations` (
    `key`, 
    `value`, 
    `description`, 
    `status`, 
    `version`, 
    `namespace_id`, 
    `language_id`, 
    `created_at`, 
    `updated_at`
) VALUES 
('REQUIRED', 'This field is required', 'Required field validation', 1, 1, @validation_ns_id, @en_lang_id, NOW(), NOW()),
('INVALID_EMAIL', 'Please enter a valid email address', 'Email validation', 1, 1, @validation_ns_id, @en_lang_id, NOW(), NOW()),
('PASSWORD_TOO_SHORT', 'Password must be at least 8 characters long', 'Password length validation', 1, 1, @validation_ns_id, @en_lang_id, NOW(), NOW()),
('PASSWORDS_NOT_MATCH', 'Passwords do not match', 'Password confirmation validation', 1, 1, @validation_ns_id, @en_lang_id, NOW(), NOW()),
('INVALID_FORMAT', 'Invalid format', 'General format validation', 1, 1, @validation_ns_id, @en_lang_id, NOW(), NOW()),
('TOO_SHORT', 'This field is too short', 'Minimum length validation', 1, 1, @validation_ns_id, @en_lang_id, NOW(), NOW()),
('TOO_LONG', 'This field is too long', 'Maximum length validation', 1, 1, @validation_ns_id, @en_lang_id, NOW(), NOW()),
('INVALID_NUMBER', 'Please enter a valid number', 'Number validation', 1, 1, @validation_ns_id, @en_lang_id, NOW(), NOW()),
('INVALID_DATE', 'Please enter a valid date', 'Date validation', 1, 1, @validation_ns_id, @en_lang_id, NOW(), NOW()),
('FIELD_ALREADY_EXISTS', 'This value already exists', 'Uniqueness validation', 1, 1, @validation_ns_id, @en_lang_id, NOW(), NOW());

-- VALIDATION translations - Vietnamese
INSERT INTO `translations` (
    `key`, 
    `value`, 
    `description`, 
    `status`, 
    `version`, 
    `namespace_id`, 
    `language_id`, 
    `created_at`, 
    `updated_at`
) VALUES 
('REQUIRED', 'Trường này là bắt buộc', 'Xác thực trường bắt buộc', 1, 1, @validation_ns_id, @vi_lang_id, NOW(), NOW()),
('INVALID_EMAIL', 'Vui lòng nhập địa chỉ email hợp lệ', 'Xác thực email', 1, 1, @validation_ns_id, @vi_lang_id, NOW(), NOW()),
('PASSWORD_TOO_SHORT', 'Mật khẩu phải có ít nhất 8 ký tự', 'Xác thực độ dài mật khẩu', 1, 1, @validation_ns_id, @vi_lang_id, NOW(), NOW()),
('PASSWORDS_NOT_MATCH', 'Mật khẩu không khớp', 'Xác thực xác nhận mật khẩu', 1, 1, @validation_ns_id, @vi_lang_id, NOW(), NOW()),
('INVALID_FORMAT', 'Định dạng không hợp lệ', 'Xác thực định dạng chung', 1, 1, @validation_ns_id, @vi_lang_id, NOW(), NOW()),
('TOO_SHORT', 'Trường này quá ngắn', 'Xác thực độ dài tối thiểu', 1, 1, @validation_ns_id, @vi_lang_id, NOW(), NOW()),
('TOO_LONG', 'Trường này quá dài', 'Xác thực độ dài tối đa', 1, 1, @validation_ns_id, @vi_lang_id, NOW(), NOW()),
('INVALID_NUMBER', 'Vui lòng nhập số hợp lệ', 'Xác thực số', 1, 1, @validation_ns_id, @vi_lang_id, NOW(), NOW()),
('INVALID_DATE', 'Vui lòng nhập ngày hợp lệ', 'Xác thực ngày', 1, 1, @validation_ns_id, @vi_lang_id, NOW(), NOW()),
('FIELD_ALREADY_EXISTS', 'Giá trị này đã tồn tại', 'Xác thực tính duy nhất', 1, 1, @validation_ns_id, @vi_lang_id, NOW(), NOW());

-- ============================================
-- 7. Verification Queries
-- ============================================

-- Check inserted data
SELECT 'Languages' as table_name, COUNT(*) as count FROM languages
UNION ALL
SELECT 'Translation Namespaces' as table_name, COUNT(*) as count FROM translation_namespaces
UNION ALL
SELECT 'Translations' as table_name, COUNT(*) as count FROM translations;

-- Check translations by language and namespace
SELECT 
    l.name as language,
    ns.name as namespace,
    COUNT(*) as translation_count
FROM translations t
JOIN languages l ON t.language_id = l.id
JOIN translation_namespaces ns ON t.namespace_id = ns.id
GROUP BY l.id, ns.id
ORDER BY l.name, ns.name;

-- Sample translations preview
SELECT 
    l.code as lang,
    ns.name as namespace,
    t.key,
    t.value,
    t.status
FROM translations t
JOIN languages l ON t.language_id = l.id
JOIN translation_namespaces ns ON t.namespace_id = ns.id
WHERE t.key IN ('HELLO', 'CATEGORY', 'LOGIN', 'REQUIRED')
ORDER BY l.code, ns.name, t.key;