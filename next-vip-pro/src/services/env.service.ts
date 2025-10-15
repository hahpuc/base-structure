export const env = {
  api: {
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
    fullUrl:
      process.env.NEXT_PUBLIC_API_FULL_URL || "http://localhost:3000/api/v1",
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Next VIP Pro",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
    description:
      process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
      "Next.js VIP Pro - Public Website",
  },
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
};
