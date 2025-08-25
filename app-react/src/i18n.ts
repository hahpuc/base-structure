import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      users: 'Users',
      roles: 'Roles',
      posts: 'Posts',
      settings: 'Settings',
      profile: 'Profile',
      logout: 'Logout',

      // Auth
      login: 'Login',
      username: 'Username',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign In',
      loginFailed: 'Login Failed',

      // Common
      welcome: 'Welcome',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      add: 'Add',
      update: 'Update',

      // Dashboard
      totalUsers: 'Total Users',
      totalOrders: 'Total Orders',
      revenue: 'Revenue',
      growth: 'Growth',
      recentActivities: 'Recent Activities',
      quickActions: 'Quick Actions',
      systemStatus: 'System Status',
      serverHealth: 'Server Health',
    },
  },
  vi: {
    translation: {
      // Navigation
      dashboard: 'Bảng điều khiển',
      users: 'Người dùng',
      roles: 'Vai trò',
      posts: 'Bài viết',
      settings: 'Cài đặt',
      profile: 'Hồ sơ',
      logout: 'Đăng xuất',

      // Auth
      login: 'Đăng nhập',
      username: 'Tên đăng nhập',
      password: 'Mật khẩu',
      rememberMe: 'Ghi nhớ',
      forgotPassword: 'Quên mật khẩu?',
      signIn: 'Đăng nhập',
      loginFailed: 'Đăng nhập thất bại',

      // Common
      welcome: 'Chào mừng',
      loading: 'Đang tải...',
      error: 'Lỗi',
      success: 'Thành công',
      cancel: 'Hủy',
      save: 'Lưu',
      edit: 'Chỉnh sửa',
      delete: 'Xóa',
      search: 'Tìm kiếm',
      add: 'Thêm',
      update: 'Cập nhật',

      // Dashboard
      totalUsers: 'Tổng người dùng',
      totalOrders: 'Tổng đơn hàng',
      revenue: 'Doanh thu',
      growth: 'Tăng trưởng',
      recentActivities: 'Hoạt động gần đây',
      quickActions: 'Thao tác nhanh',
      systemStatus: 'Trạng thái hệ thống',
      serverHealth: 'Tình trạng máy chủ',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
