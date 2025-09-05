'use client';

import '@ant-design/v5-patch-for-react-19';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Space, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { loginAsync } from '@/store/slices/auth.slice';
import type { LoginRequest } from '@/types/auth';

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [form] = Form.useForm();

  const onFinish = async (values: LoginRequest) => {
    const result = await dispatch(loginAsync(values));

    if (loginAsync.fulfilled.match(result)) {
      message.success('Login successful!');
      router.push('/dashboard');
    } else {
      message.error(typeof error === 'object' && error?.message ? error.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-5">
      <Card className="w-full max-w-md rounded-xl shadow-2xl">
        <Space direction="vertical" size="large" className="w-full">
          <div className="text-center">
            <Title level={2} className="!m-0 !text-blue-500">
              VIP Pro
            </Title>
            <Text type="secondary">Admin Dashboard</Text>
          </div>

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" autoComplete="username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item className="!mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-11 text-base font-bold"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center">
            <Text type="secondary" className="text-xs">
              Demo credentials: admin / password
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
}
