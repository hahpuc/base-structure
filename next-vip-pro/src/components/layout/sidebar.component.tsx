import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useRouter, usePathname } from 'next/navigation';

const { Sider } = Layout;

type SidebarComponentProps = {
  collapsed: boolean;
};

export default function SidebarComponent({ collapsed }: SidebarComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = theme.useToken();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.push('/dashboard'),
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'Users',
      onClick: () => router.push('/users'),
    },
    {
      key: '/roles',
      icon: <SettingOutlined />,
      label: 'Roles',
      onClick: () => router.push('/roles'),
    },
    {
      key: '/blog-posts',
      icon: <FileTextOutlined />,
      label: 'Blog Posts',
      onClick: () => router.push('/blog-posts'),
    },
    {
      key: '/categories',
      icon: <TagsOutlined />,
      label: 'Categories',
      onClick: () => router.push('/categories'),
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="bg-white border-r border-gray-200"
      style={{
        background: token.colorBgContainer,
        borderRightColor: token.colorBorder,
      }}
    >
      <div
        className="h-16 flex items-center justify-center border-b border-gray-200 mx-4"
        style={{ borderBottomColor: token.colorBorder }}
      >
        <h2
          className={`m-0 font-bold text-blue-500 transition-all duration-200 ${
            collapsed ? 'text-lg' : 'text-xl'
          }`}
          style={{ color: token.colorPrimary }}
        >
          {collapsed ? 'VP' : 'NEXT JS VIP Pro'}
        </h2>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        className="border-none mt-4"
      />
    </Sider>
  );
}
