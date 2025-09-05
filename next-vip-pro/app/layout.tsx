import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Geist, Geist_Mono } from 'next/font/google';

import AntdProvider from '@/providers/antd-provider';
import AuthProvider from '@/providers/auth-provider';
import ReduxProvider from '@/store/providers/redux-provider';

import type { Metadata } from 'next';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next VIP Pro - Admin Dashboard',
  description: 'Modern admin dashboard built with Next.js, Ant Design, and Redux',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} id="__next">
        <ReduxProvider>
          <AntdRegistry>
            <AntdProvider>
              <AuthProvider>{children}</AuthProvider>
            </AntdProvider>
          </AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
