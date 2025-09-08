import {
  DollarCircleOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic, Table, Tag, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

import useHeader from '@/hooks/use-header.hook';
import { RootState } from '@/store';

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  useHeader('Dashboard');

  const { user } = useSelector((state: RootState) => state.auth);

  // Mock data
  const stats = [
    {
      title: 'Total Users',
      value: 1234,
      icon: <UserOutlined className="text-blue-500" />,
      color: 'blue',
    },
    {
      title: 'Total Orders',
      value: 856,
      icon: <ShoppingCartOutlined className="text-green-500" />,
      color: 'green',
    },
    {
      title: 'Revenue',
      value: 98765,
      prefix: '$',
      icon: <DollarCircleOutlined className="text-orange-500" />,
      color: 'orange',
    },
    {
      title: 'Growth',
      value: 12.5,
      suffix: '%',
      icon: <RiseOutlined className="text-purple-500" />,
      color: 'purple',
    },
  ];

  const recentActivities = [
    {
      key: '1',
      user: 'John Doe',
      action: 'Created new post',
      time: '2 hours ago',
      status: 'success',
    },
    {
      key: '2',
      user: 'Jane Smith',
      action: 'Updated profile',
      time: '4 hours ago',
      status: 'info',
    },
    {
      key: '3',
      user: 'Bob Johnson',
      action: 'Deleted comment',
      time: '6 hours ago',
      status: 'warning',
    },
    {
      key: '4',
      user: 'Alice Brown',
      action: 'Login attempt failed',
      time: '8 hours ago',
      status: 'error',
    },
  ];

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: { [key: string]: string } = {
          success: 'green',
          info: 'blue',
          warning: 'orange',
          error: 'red',
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <Title level={2} className="mb-2">
          Welcome back, {user?.username || 'Admin'}! 👋
        </Title>
        <p className="text-gray-600 text-lg">
          Here's what's happening with your admin dashboard today.
        </p>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="h-full">
              <div className="flex items-center justify-between">
                <div>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    valueStyle={{ color: `var(--ant-${stat.color}-6)` }}
                  />
                </div>
                <div className="text-3xl opacity-80">{stat.icon}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Activities */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Recent Activities" className="h-full">
            <Table
              dataSource={recentActivities}
              columns={columns}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Quick Actions" className="h-full">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">System Status</h4>
                <p className="text-blue-600 text-sm">All systems operational</p>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Server Health</h4>
                <p className="text-green-600 text-sm">CPU: 45% | Memory: 62%</p>
                <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                  <div className="bg-green-600 h-2 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
