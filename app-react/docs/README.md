# React Admin Base Structure

A modern, clean, and feature-rich React admin dashboard built with the latest technologies and best practices.

## 🚀 Features

- **Modern Stack**: React 18, TypeScript, Vite
- **State Management**: Redux Toolkit with clean architecture
- **UI Components**: Ant Design with custom Tailwind CSS styling
- **Authentication**: JWT-based auth with auto-refresh
- **Internationalization**: Multi-language support (EN/VI)
- **Responsive Design**: Mobile-first approach
- **Clean Architecture**: Modular and maintainable code structure
- **Type Safety**: Full TypeScript support throughout
- **Developer Experience**: ESLint, Prettier, Hot reload

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── layout/         # Layout-specific components
├── guards/             # Route protection
├── layouts/            # Page layouts (Auth, Main)
├── pages/              # Page components
│   ├── auth/          # Authentication pages
│   └── dashboard/     # Dashboard pages
├── services/           # API services
├── store/              # Redux store and slices
│   └── slices/        # Redux slices
├── styles/             # Global styles and Tailwind
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── i18n.ts            # Internationalization config
└── main.tsx           # App entry point
```

## 🛠️ Technologies Used

- **React 18** - Latest React with concurrent features
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - Predictable state management
- **React Router** - Client-side routing
- **Ant Design** - Professional UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client with interceptors
- **React Query** - Server state management
- **i18next** - Internationalization
- **JWT Decode** - Token handling
- **Day.js** - Date manipulation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.development .env.local
   # Edit .env.local with your API endpoint
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Default Login Credentials

- **Username**: `admin`
- **Password**: `password`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:test` - Build for testing
- `npm run build:staging` - Build for staging
- `npm run build:prod` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript compiler check
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_API_URL=http://localhost:3001
VITE_APP_TITLE=React Admin App
VITE_APP_VERSION=1.0.0
```

### API Integration

The app expects a REST API with the following endpoints:

```
POST /auth/token        # Login
POST /auth/refresh      # Refresh token
POST /auth/revoke       # Logout
GET  /auth/me          # Get current user
```

### Customization

#### Theme Customization

Edit `src/styles/antd-custom.css` to customize Ant Design theme:

```css
:root {
  --ant-primary-color: #0ea5e9;
  --ant-primary-color-hover: #0284c7;
  --ant-primary-color-active: #0369a1;
}
```

#### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/layout/Sidebar.tsx`

#### Adding New API Services

1. Create service in `src/services/`
2. Follow the pattern in `src/services/authService.ts`
3. Use `apiService` for HTTP requests

## 🔐 Authentication Flow

1. User submits login form
2. App sends credentials to `/auth/token`
3. Server returns access token and refresh token
4. Tokens stored in localStorage
5. Access token used for API requests
6. Auto-refresh when token expires
7. Redirect to login if refresh fails

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Dark/Light Theme**: Theme switching capability
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client-side validation
- **Accessibility**: ARIA labels and keyboard navigation

## 📱 Mobile Support

The application is fully responsive and provides an excellent mobile experience:

- Collapsible sidebar on mobile
- Touch-friendly interface
- Optimized layouts for small screens

## 🌍 Internationalization

The app supports multiple languages:

- English (default)
- Vietnamese
- Easy to add more languages

To add a new language:

1. Add translations to `src/i18n.ts`
2. Import and use `useTranslation` hook in components

## 🔧 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow React functional components pattern
- Use Redux Toolkit for state management
- Implement proper error boundaries
- Write clean, self-documenting code

### Best Practices

- Keep components small and focused
- Use custom hooks for reusable logic
- Implement proper loading and error states
- Follow consistent naming conventions
- Add TypeScript types for all APIs

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
# Drag and drop dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🔗 Related Projects

- [Backend NestJS API](../be-nestjs)
- [Angular Admin App](../app-angular)

---

**Happy coding! 🎉**
