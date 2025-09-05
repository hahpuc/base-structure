import { BellOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, theme } from 'antd';
import { useRouter } from 'next/navigation';

const { Header } = Layout;

type HeaderComponentProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function HeaderComponent({ collapsed, onToggle }: HeaderComponentProps) {
  const router = useRouter();
  const { token } = theme.useToken();

  const handleLogout = () => {
    // This will be connected to Redux later
    localStorage.clear();
    router.push('/auth/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Header
      className="px-4 bg-white flex items-center justify-between border-b border-gray-200"
      style={{ background: token.colorBgContainer, borderBottomColor: token.colorBorder }}
    >
      <div className="flex items-center">
        <button
          onClick={onToggle}
          className="border-none bg-transparent text-base cursor-pointer p-2 rounded transition-all duration-200 hover:bg-gray-100"
        >
          {collapsed ? '☰' : '✕'}
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="border-none bg-transparent text-lg cursor-pointer p-2 rounded transition-all duration-200 hover:bg-gray-100">
          <BellOutlined />
        </button>

        <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
          <div className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md transition-all duration-200 hover:bg-gray-100">
            <Avatar icon={<UserOutlined />} />
            <span className="font-medium">Admin User</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}
