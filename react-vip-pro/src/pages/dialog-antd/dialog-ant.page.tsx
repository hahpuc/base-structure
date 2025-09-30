import React, { useState } from "react";
import {
  Button,
  Space,
  Typography,
  Card,
  Row,
  Col,
  Modal,
  Drawer,
  message,
  notification,
  Popconfirm,
  Alert,
  Form,
  Input,
  Select,
  DatePicker,
  List,
  Avatar,
  Divider,
  Steps,
} from "antd";
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

const DialogAntPage: React.FC = () => {
  // Modal States
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [fullScreenModalOpen, setFullScreenModalOpen] = useState(false);

  // Drawer States
  const [basicDrawerOpen, setBasicDrawerOpen] = useState(false);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [multiLevelDrawerOpen, setMultiLevelDrawerOpen] = useState(false);
  const [childrenDrawerOpen, setChildrenDrawerOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);

  // Form
  const [form] = Form.useForm();

  // Message Functions
  const showSuccessMessage = () => {
    message.success("This is a success message!");
  };

  const showErrorMessage = () => {
    message.error("This is an error message!");
  };

  const showWarningMessage = () => {
    message.warning("This is a warning message!");
  };

  const showInfoMessage = () => {
    message.info("This is an info message!");
  };

  const showLoadingMessage = () => {
    const hide = message.loading("Action in progress...", 0);
    setTimeout(hide, 2500);
  };

  // Notification Functions
  const openNotification = (type: "success" | "info" | "warning" | "error") => {
    notification[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification.",
      duration: 4.5,
    });
  };

  const openNotificationWithIcon = () => {
    notification.open({
      message: "Custom Notification",
      description:
        "This is a custom notification with an icon and custom styling.",
      icon: <StarOutlined style={{ color: "#108ee9" }} />,
      duration: 0,
    });
  };

  // Modal Functions
  const showConfirm = () => {
    Modal.confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content:
        "When clicked the OK button, this dialog will be closed after 1 second",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        message.success("Deleted successfully!");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showPropsConfirm = () => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Bla bla ...",
      okText: "确认",
      cancelText: "取消",
    });
  };

  // Sample Data
  const sampleData = [
    {
      title: "John Doe",
      description: "Software Engineer at Tech Corp",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
    },
    {
      title: "Jane Smith",
      description: "Product Manager at Innovation Hub",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
    },
    {
      title: "Mike Johnson",
      description: "UI/UX Designer at Creative Studio",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="mb-8">
        <Title level={2}>Dialog Components Showcase</Title>
        <Text type="secondary">
          Comprehensive demonstration of messages, notifications, modals, and
          drawers
        </Text>
      </div>

      {/* Messages Section */}
      <Card title="Messages" className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong>Basic Messages</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="primary" onClick={showSuccessMessage}>
                  Success
                </Button>
                <Button onClick={showInfoMessage}>Info</Button>
                <Button onClick={showWarningMessage}>Warning</Button>
                <Button danger onClick={showErrorMessage}>
                  Error
                </Button>
                <Button type="dashed" onClick={showLoadingMessage}>
                  Loading
                </Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Message with Custom Duration</Text>
            <div className="mt-2">
              <Space wrap>
                <Button
                  onClick={() =>
                    message.success("This message will last 10 seconds", 10)
                  }
                >
                  Long Duration
                </Button>
                <Button
                  onClick={() => message.info("This message will persist", 0)}
                >
                  Persistent Message
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications Section */}
      <Card title="Notifications" className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong>Basic Notifications</Text>
            <div className="mt-2">
              <Space wrap>
                <Button
                  type="primary"
                  onClick={() => openNotification("success")}
                >
                  Success
                </Button>
                <Button onClick={() => openNotification("info")}>Info</Button>
                <Button onClick={() => openNotification("warning")}>
                  Warning
                </Button>
                <Button danger onClick={() => openNotification("error")}>
                  Error
                </Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Custom Notifications</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="dashed" onClick={openNotificationWithIcon}>
                  With Custom Icon
                </Button>
                <Button
                  onClick={() =>
                    notification.info({
                      message: "Top Right Notification",
                      description: "This notification appears at top right",
                      placement: "topRight",
                    })
                  }
                >
                  Top Right
                </Button>
                <Button
                  onClick={() =>
                    notification.success({
                      message: "Bottom Left Notification",
                      description: "This notification appears at bottom left",
                      placement: "bottomLeft",
                    })
                  }
                >
                  Bottom Left
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Card>

      {/* Modals Section */}
      <Card title="Modals" className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong>Basic Modals</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="primary" onClick={() => setBasicModalOpen(true)}>
                  Basic Modal
                </Button>
                <Button onClick={() => setCustomModalOpen(true)}>
                  Custom Modal
                </Button>
                <Button onClick={() => setFormModalOpen(true)}>
                  Form Modal
                </Button>
                <Button
                  type="dashed"
                  onClick={() => setFullScreenModalOpen(true)}
                >
                  Full Screen Modal
                </Button>
              </Space>
            </div>
          </div>

          <div>
            <Text strong>Confirmation Modals</Text>
            <div className="mt-2">
              <Space wrap>
                <Button onClick={showConfirm}>Confirm</Button>
                <Button danger onClick={showDeleteConfirm}>
                  Delete Confirm
                </Button>
                <Button type="dashed" onClick={showPropsConfirm}>
                  With Extra Props
                </Button>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => message.success("Deleted!")}
                  onCancel={() => message.info("Cancelled")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Popconfirm Delete</Button>
                </Popconfirm>
              </Space>
            </div>
          </div>
        </div>
      </Card>

      {/* Drawers Section */}
      <Card title="Drawers" className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong>Basic Drawers</Text>
            <div className="mt-2">
              <Space wrap>
                <Button type="primary" onClick={() => setBasicDrawerOpen(true)}>
                  Basic Drawer
                </Button>
                <Button onClick={() => setFormDrawerOpen(true)}>
                  Form Drawer
                </Button>
                <Button onClick={() => setProfileDrawerOpen(true)}>
                  Profile Drawer
                </Button>
                <Button
                  type="dashed"
                  onClick={() => setMultiLevelDrawerOpen(true)}
                >
                  Multi-level Drawer
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Card>

      {/* Alert Messages */}
      <Card title="Alert Messages" className="mb-6">
        <div className="space-y-4">
          <Alert message="Success Text" type="success" />
          <Alert message="Info Text" type="info" />
          <Alert message="Warning Text" type="warning" />
          <Alert message="Error Text" type="error" />
          <Alert
            message="Success Tips"
            description="Detailed description and advice about successful copywriting."
            type="success"
            showIcon
          />
          <Alert
            message="Informational Notes"
            description="Additional description and information about copywriting."
            type="info"
            showIcon
          />
          <Alert
            message="Warning"
            description="This is a warning notice about copywriting."
            type="warning"
            showIcon
            closable
          />
          <Alert
            message="Error"
            description="This is an error message about copywriting."
            type="error"
            showIcon
          />
        </div>
      </Card>

      {/* Basic Modal */}
      <Modal
        title="Basic Modal"
        open={basicModalOpen}
        onOk={() => setBasicModalOpen(false)}
        onCancel={() => setBasicModalOpen(false)}
      >
        <p>This is a basic modal with some content.</p>
        <p>
          You can add any content here including forms, images, or other
          components.
        </p>
        <p>The modal can be closed by clicking OK, Cancel, or the X button.</p>
      </Modal>

      {/* Custom Modal */}
      <Modal
        title="Custom Styled Modal"
        open={customModalOpen}
        onOk={() => setCustomModalOpen(false)}
        onCancel={() => setCustomModalOpen(false)}
        width={800}
        footer={[
          <Button key="back" onClick={() => setCustomModalOpen(false)}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => setCustomModalOpen(false)}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <Alert
            message="Custom Modal Content"
            description="This modal has custom styling and layout."
            type="info"
            showIcon
          />
          <Row gutter={16}>
            <Col span={12}>
              <Card size="small" title="Left Section">
                <p>Some content on the left side.</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" title="Right Section">
                <p>Some content on the right side.</p>
              </Card>
            </Col>
          </Row>
        </div>
      </Modal>

      {/* Form Modal */}
      <Modal
        title="Create New User"
        open={formModalOpen}
        onOk={() => {
          form.validateFields().then(() => {
            message.success("User created successfully!");
            form.resetFields();
            setFormModalOpen(false);
          });
        }}
        onCancel={() => {
          form.resetFields();
          setFormModalOpen(false);
        }}
        okText="Create"
        width={600}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select placeholder="Select a role">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
              <Option value="manager">Manager</Option>
            </Select>
          </Form.Item>
          <Form.Item name="bio" label="Bio">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Full Screen Modal */}
      <Modal
        title="Full Screen Modal"
        open={fullScreenModalOpen}
        onOk={() => setFullScreenModalOpen(false)}
        onCancel={() => setFullScreenModalOpen(false)}
        width="100vw"
        style={{ top: 0, paddingBottom: 0 }}
        bodyStyle={{ height: "calc(100vh - 110px)", padding: "24px" }}
      >
        <div className="h-full space-y-4">
          <Alert
            message="Full Screen Experience"
            description="This modal takes up the entire screen for maximum content display."
            type="info"
            showIcon
          />
          <Card title="Sample Content">
            <Steps current={1} className="mb-4">
              <Step title="Finished" description="This is a description." />
              <Step
                title="In Progress"
                description="This is a description."
                subTitle="Left 00:00:08"
              />
              <Step title="Waiting" description="This is a description." />
            </Steps>
            <List
              itemLayout="horizontal"
              dataSource={sampleData}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button key="edit" icon={<EditOutlined />}>
                      Edit
                    </Button>,
                    <Button key="delete" danger icon={<DeleteOutlined />}>
                      Delete
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </Modal>

      {/* Basic Drawer */}
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={() => setBasicDrawerOpen(false)}
        open={basicDrawerOpen}
        width={400}
      >
        <div className="space-y-4">
          <p>This is a basic drawer component.</p>
          <p>It slides in from the right side of the screen.</p>
          <Alert
            message="Drawer Content"
            description="You can add any content here including forms, lists, or other components."
            type="info"
            showIcon
          />
          <Button type="primary" block>
            Action Button
          </Button>
        </div>
      </Drawer>

      {/* Form Drawer */}
      <Drawer
        title="Create a new account"
        placement="right"
        width={600}
        onClose={() => setFormDrawerOpen(false)}
        open={formDrawerOpen}
        extra={
          <Space>
            <Button onClick={() => setFormDrawerOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setFormDrawerOpen(false)}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[{ required: true, message: "Please enter url" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[{ required: true, message: "Please select an owner" }]}
              >
                <Select placeholder="Please select an owner">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please choose the type" }]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[
                  { required: true, message: "Please choose the approver" },
                ]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  { required: true, message: "Please choose the dateTime" },
                ]}
              >
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>

      {/* Profile Drawer */}
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={() => setProfileDrawerOpen(false)}
        open={profileDrawerOpen}
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar size={64} icon={<UserOutlined />} />
            <div>
              <Title level={4} className="mb-0">
                John Doe
              </Title>
              <Text type="secondary">Senior Developer</Text>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MailOutlined className="text-gray-500" />
              <Text>john.doe@example.com</Text>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneOutlined className="text-gray-500" />
              <Text>+1 234 567 8900</Text>
            </div>
            <div className="flex items-center space-x-3">
              <HomeOutlined className="text-gray-500" />
              <Text>San Francisco, CA</Text>
            </div>
          </div>

          <Divider />

          <div>
            <Title level={5}>Recent Activity</Title>
            <List
              size="small"
              dataSource={[
                "Updated profile information",
                "Completed project milestone",
                "Joined team meeting",
                "Submitted code review",
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </div>

          <div className="pt-4">
            <Space>
              <Button type="primary" icon={<EditOutlined />}>
                Edit Profile
              </Button>
              <Button icon={<MailOutlined />}>Send Message</Button>
            </Space>
          </div>
        </div>
      </Drawer>

      {/* Multi-level Drawer */}
      <Drawer
        title="Multi-level drawer"
        placement="right"
        width={520}
        closable={false}
        onClose={() => setMultiLevelDrawerOpen(false)}
        open={multiLevelDrawerOpen}
      >
        <div className="space-y-4">
          <p>This is the first level drawer.</p>
          <Button type="primary" onClick={() => setChildrenDrawerOpen(true)}>
            Open Second Level
          </Button>
        </div>
        <Drawer
          title="Second Level Drawer"
          width={320}
          closable={false}
          onClose={() => setChildrenDrawerOpen(false)}
          open={childrenDrawerOpen}
        >
          <p>This is the second level drawer content.</p>
          <div className="space-y-2">
            <Button block>Action 1</Button>
            <Button block>Action 2</Button>
            <Button block>Action 3</Button>
          </div>
        </Drawer>
      </Drawer>
    </div>
  );
};

export default DialogAntPage;
