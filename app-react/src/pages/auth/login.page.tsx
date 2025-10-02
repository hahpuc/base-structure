import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { ErrorResponse } from '@/services/client/api-result';
import { AppDispatch, RootState } from '@/store';
import { clearError, loginAsync } from '@/store/slices/auth.slice';
import { LoginRequest } from '@/types/auth';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [rememberMe, setRememberMe] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    const state = location.state as LocationState | null;
    const from = state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  const onFinish = async (values: LoginRequest) => {
    dispatch(clearError());

    const loginData: LoginRequest = {
      username: values.username,
      password: values.password,
    };

    dispatch(loginAsync(loginData));
  };

  return (
    <div className="w-full">
      {error && (
        <Alert
          message="Login Failed"
          description={(error as ErrorResponse)?.message}
          type="error"
          showIcon
          closable
          className="mb-6"
          onClose={() => dispatch(clearError())}
        />
      )}

      <Form name="login" onFinish={onFinish} layout="vertical" size="large" autoComplete="off">
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
            { min: 3, message: 'Username must be at least 3 characters!' },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="Enter your username"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item>
          <div className="flex items-center justify-between">
            <Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}>
              Remember me
            </Checkbox>
            <a className="text-primary-600 hover:text-primary-500" href="#forgot">
              Forgot password?
            </a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full h-12 text-base font-medium"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center text-sm text-gray-600 mt-6">
        <p>Demo credentials:</p>
        <p className="font-mono">admin / password</p>
      </div>
    </div>
  );
};

export default LoginPage;
