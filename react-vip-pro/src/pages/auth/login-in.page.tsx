import { Button, Checkbox, Form, Input, message } from "antd";

import { AppDispatch, RootState } from "@/store";
import { clearError, loginAsync } from "@/store/slices/auth.slice";
import { LoginRequest } from "@/types/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router";

interface LocationState {
  from?: {
    pathname: string;
  };
}

export const LoginInPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (!error) return;
    message.error(
      typeof error === "string" ? error : error?.message ?? "Login failed"
    );
  }, [error]);

  // Redirect if already authenticated
  if (isAuthenticated) {
    const state = location.state as LocationState | null;
    const from = state?.from?.pathname || "/dashboard";
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
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your username and password to sign in!
            </p>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
                { min: 3, message: "Username must be at least 3 characters!" },
              ]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-between">
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  Remember me
                </Checkbox>
                <a
                  className="text-primary-600 hover:text-primary-500"
                  href="#forgot"
                >
                  Forgot password?
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full text-base font-medium"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Don&apos;t have an account? {""}
              <Link
                to="/auth/register"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
