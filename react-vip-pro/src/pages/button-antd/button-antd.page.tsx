import {
    DeleteOutlined,
    DownloadOutlined,
    DownOutlined,
    EditOutlined,
    HeartOutlined,
    HomeOutlined,
    LeftOutlined,
    LikeOutlined,
    PlusOutlined,
    PoweroffOutlined,
    ReloadOutlined,
    RightOutlined,
    SaveOutlined,
    SearchOutlined,
    SettingOutlined,
    ShareAltOutlined,
    StarOutlined,
    UploadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
    Button,
    Card,
    Col,
    ConfigProvider,
    Dropdown,
    Row,
    Space,
    Tooltip,
    Typography,
} from "antd";
import React, { useState } from "react";

const {  Text } = Typography;

const ButtonAntDPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const handlePowerOff = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: "1st menu item",
      icon: <EditOutlined />,
    },
    {
      key: "2",
      label: "2nd menu item",
      icon: <SaveOutlined />,
    },
    {
      key: "3",
      label: "3rd menu item",
      icon: <DeleteOutlined />,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="p-6 space-y-8">

      {/* Basic Button Types */}
      <Card title="Basic Button Types" className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong>Primary Buttons</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="primary">Primary</Button>
                <Button type="primary" disabled>
                  Primary Disabled
                </Button>
                <Button type="primary" loading>
                  Loading
                </Button>
                <Button type="primary" danger>
                  Primary Danger
                </Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Default Buttons</Text>
            <div className="mt-2">
              <Space wrap>
                <Button>Default</Button>
                <Button disabled>Default Disabled</Button>
                <Button loading>Loading</Button>
                <Button danger>Default Danger</Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Dashed Buttons</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="dashed">Dashed</Button>
                <Button type="dashed" disabled>
                  Dashed Disabled
                </Button>
                <Button type="dashed" loading>
                  Loading
                </Button>
                <Button type="dashed" danger>
                  Dashed Danger
                </Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Text Buttons</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="text">Text</Button>
                <Button type="text" disabled>
                  Text Disabled
                </Button>
                <Button type="text" loading>
                  Loading
                </Button>
                <Button type="text" danger>
                  Text Danger
                </Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Link Buttons</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="link">Link</Button>
                <Button type="link" disabled>
                  Link Disabled
                </Button>
                <Button type="link" loading>
                  Loading
                </Button>
                <Button type="link" danger>
                  Link Danger
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Card>

      {/* Button Sizes */}
      <Card title="Button Sizes" className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong>Large Buttons</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="primary" size="large">
                  Large Primary
                </Button>
                <Button size="large">Large Default</Button>
                <Button type="dashed" size="large">
                  Large Dashed
                </Button>
                <Button type="link" size="large">
                  Large Link
                </Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Medium Buttons (Default)</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="primary">Medium Primary</Button>
                <Button>Medium Default</Button>
                <Button type="dashed">Medium Dashed</Button>
                <Button type="link">Medium Link</Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Small Buttons</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="primary" size="small">
                  Small Primary
                </Button>
                <Button size="small">Small Default</Button>
                <Button type="dashed" size="small">
                  Small Dashed
                </Button>
                <Button type="link" size="small">
                  Small Link
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Card>

      {/* Buttons with Icons */}
      <Card title="Buttons with Icons" className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong>Icons Before Text</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="primary" icon={<SearchOutlined />}>
                  Search
                </Button>
                <Button icon={<DownloadOutlined />}>Download</Button>
                <Button type="dashed" icon={<PlusOutlined />}>
                  Add New
                </Button>
                <Button danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Icons After Text</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="primary">
                  Next <RightOutlined />
                </Button>
                <Button>
                  <LeftOutlined /> Previous
                </Button>
                <Button type="dashed">
                  Upload <UploadOutlined />
                </Button>
                <Button type="link">
                  Settings <SettingOutlined />
                </Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Icon Only Buttons</Text>
            <div className="mt-2">
              <Space wrap>
                <Tooltip title="Search">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<SearchOutlined />}
                  />
                </Tooltip>
                <Tooltip title="Home">
                  <Button shape="circle" icon={<HomeOutlined />} />
                </Tooltip>
                <Tooltip title="Settings">
                  <Button
                    type="dashed"
                    shape="circle"
                    icon={<SettingOutlined />}
                  />
                </Tooltip>
                <Tooltip title="User Profile">
                  <Button type="text" shape="circle" icon={<UserOutlined />} />
                </Tooltip>
                <Tooltip title="Reload">
                  <Button danger shape="circle" icon={<ReloadOutlined />} />
                </Tooltip>
              </Space>
            </div>
          </div>
        </div>
      </Card>

      {/* Button Shapes */}
      <Card title="Button Shapes" className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong>Default Shape</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="primary">Default Shape</Button>
                <Button>Default Shape</Button>
                <Button type="dashed">Default Shape</Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Round Shape</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="primary" shape="round">
                  Round Primary
                </Button>
                <Button shape="round">Round Default</Button>
                <Button type="dashed" shape="round">
                  Round Dashed
                </Button>
                <Button type="primary" shape="round" icon={<SearchOutlined />}>
                  Round with Icon
                </Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Circle Shape</Text>
            <div className="mt-2">
              <Space wrap>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SearchOutlined />}
                />
                <Button shape="circle" icon={<DownloadOutlined />} />
                <Button type="dashed" shape="circle" icon={<PlusOutlined />} />
                <Button danger shape="circle" icon={<DeleteOutlined />} />
              </Space>
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Buttons */}
      <Card title="Interactive Buttons" className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong>Loading States</Text>
            <div className="mt-2">
              <Space wrap>
                <Button
                  type="primary"
                  loading={loadings[0]}
                  onClick={() => enterLoading(0)}
                >
                  Click me!
                </Button>
                <Button loading={loadings[1]} onClick={() => enterLoading(1)}>
                  Click me!
                </Button>
                <Button
                  type="dashed"
                  loading={loadings[2]}
                  onClick={() => enterLoading(2)}
                >
                  Click me!
                </Button>
                <Button
                  type="primary"
                  icon={<PoweroffOutlined />}
                  loading={loading}
                  onClick={handlePowerOff}
                >
                  Power off
                </Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Dropdown Buttons</Text>
            <div className="mt-2">
              <Space wrap>
                <Dropdown.Button
                  type="primary"
                  menu={{ items: menuItems, onClick: handleMenuClick }}
                >
                  Actions
                </Dropdown.Button>
                <Dropdown.Button
                  menu={{ items: menuItems, onClick: handleMenuClick }}
                  icon={<DownOutlined />}
                >
                  More Actions
                </Dropdown.Button>
                <Dropdown.Button
                  type="dashed"
                  menu={{ items: menuItems, onClick: handleMenuClick }}
                  disabled
                >
                  Disabled
                </Dropdown.Button>
              </Space>
            </div>
          </div>
        </div>
      </Card>

      {/* Block Buttons */}
      <Card title="Block Buttons" className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong>Full Width Buttons</Text>
            <div className="mt-2 space-y-2">
              <Button type="primary" block>
                Primary Block Button
              </Button>
              <Button block>Default Block Button</Button>
              <Button type="dashed" block>
                Dashed Block Button
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Custom Styled Buttons */}
      <Card title="Custom Styled Buttons" className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong>Social Media Style</Text>
            <div className="mt-2">
              <Space wrap>
                <Button
                  type="primary"
                  icon={<LikeOutlined />}
                  className="bg-blue-500 hover:bg-blue-600 border-blue-500"
                >
                  Like
                </Button>
                <Button
                  icon={<HeartOutlined />}
                  className="text-red-500 border-red-500 hover:bg-red-50"
                >
                  Love
                </Button>
                <Button
                  type="dashed"
                  icon={<ShareAltOutlined />}
                  className="text-green-500 border-green-500 hover:bg-green-50"
                >
                  Share
                </Button>
                <Button
                  icon={<StarOutlined />}
                  className="text-yellow-500 border-yellow-500 hover:bg-yellow-50"
                >
                  Favorite
                </Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Action Buttons</Text>
            <div className="mt-2">
              <Space wrap>
                <Button
                  type="primary"
                  size="large"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 border-none"
                >
                  Get Started
                </Button>
                <Button
                  size="large"
                  className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  Learn More
                </Button>
                <Button
                  danger
                  size="large"
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete Account
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Card>

      {/* Button Groups */}
      <Card title="Button Groups" className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong>Basic Button Group</Text>
            <div className="mt-2">
              <Button.Group>
                <Button>Left</Button>
                <Button>Middle</Button>
                <Button>Right</Button>
              </Button.Group>
            </div>
          </div>

          <div>
            <Text strong>Button Group with Icons</Text>
            <div className="mt-2">
              <Button.Group>
                <Button type="primary">
                  <LeftOutlined />
                  Go back
                </Button>
                <Button type="primary">
                  Go forward
                  <RightOutlined />
                </Button>
              </Button.Group>
            </div>
          </div>

          <div>
            <Text strong>Button Group Sizes</Text>
            <div className="mt-2 space-y-2">
              <div>
                <Button.Group size="large">
                  <Button>Large</Button>
                  <Button>Large</Button>
                  <Button>Large</Button>
                </Button.Group>
              </div>
              <div>
                <Button.Group>
                  <Button>Default</Button>
                  <Button>Default</Button>
                  <Button>Default</Button>
                </Button.Group>
              </div>
              <div>
                <Button.Group size="small">
                  <Button>Small</Button>
                  <Button>Small</Button>
                  <Button>Small</Button>
                </Button.Group>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Responsive Button Layout */}
      <Card title="Responsive Button Layout" className="mb-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Button type="primary" block>
              Responsive 1
            </Button>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Button block>Responsive 2</Button>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Button type="dashed" block>
              Responsive 3
            </Button>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Button danger block>
              Responsive 4
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Theme Customization */}
      <Card title="Theme Customization" className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong>Custom Primary Color</Text>
            <div className="mt-2">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#52c41a",
                  },
                }}
              >
                <Space wrap>
                  <Button type="primary">Custom Green</Button>
                  <Button type="primary" loading>
                    Loading Green
                  </Button>
                  <Button type="primary" danger>
                    Danger Green
                  </Button>
                </Space>
              </ConfigProvider>
            </div>
          </div>

          <div>
            <Text strong>Custom Border Radius</Text>
            <div className="mt-2">
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 2,
                  },
                }}
              >
                <Space wrap>
                  <Button type="primary">Square Style</Button>
                  <Button>Square Default</Button>
                  <Button type="dashed">Square Dashed</Button>
                </Space>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
};

export default ButtonAntDPage;
