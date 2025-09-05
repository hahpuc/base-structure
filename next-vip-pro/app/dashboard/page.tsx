'use client';

import { UserOutlined, FileTextOutlined, TagsOutlined, EyeOutlined } from '@ant-design/icons';
import { Layout, Card, Row, Col, Statistic, Typography, theme } from 'antd';
import { useState } from 'react';

import HeaderComponent from '@/components/layout/header.component';
import SidebarComponent from '@/components/layout/sidebar.component';

const { Content } = Layout;
const { Title } = Typography;

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const stats = [
    {
      title: 'Total Users',
      value: 1234,
      icon: <UserOutlined style={{ color: '#1890ff' }} />,
      color: '#1890ff',
    },
    {
      title: 'Blog Posts',
      value: 89,
      icon: <FileTextOutlined style={{ color: '#52c41a' }} />,
      color: '#52c41a',
    },
    {
      title: 'Categories',
      value: 12,
      icon: <TagsOutlined style={{ color: '#fa8c16' }} />,
      color: '#fa8c16',
    },
    {
      title: 'Page Views',
      value: 45678,
      icon: <EyeOutlined style={{ color: '#eb2f96' }} />,
      color: '#eb2f96',
    },
  ];

  return (
    <Layout className="min-h-screen">
      <SidebarComponent collapsed={collapsed} />

      <Layout className={`transition-all duration-200 ${collapsed ? 'ml-20' : 'ml-50'}`}>
        <HeaderComponent collapsed={collapsed} onToggle={toggleSidebar} />

        <Content
          className="m-6 p-6 min-h-80 bg-white rounded-lg"
          style={{
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
          }}
        >
          <div className="mb-6">
            <Title level={2} className="!m-0">
              Dashboard
            </Title>
            <p className="text-gray-500 mt-2">Welcome to your admin dashboard</p>
          </div>

          <Row gutter={[16, 16]}>
            {stats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    prefix={stat.icon}
                    valueStyle={{ color: stat.color }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={[16, 16]} className="mt-6">
            <Col xs={24} lg={12}>
              <Card title="Recent Activity" className="h-80">
                <div className="flex items-center justify-center h-52 text-gray-500">
                  Activity chart will go here
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Quick Actions" className="h-80">
                <div className="flex items-center justify-center h-52 text-gray-500">
                  Quick action buttons will go here
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
