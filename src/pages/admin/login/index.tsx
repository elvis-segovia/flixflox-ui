import React from 'react';
import { Form, Input, Button, Layout, Grid, theme, Typography, Card, Space, notification, ConfigProvider } from 'antd';
import FlixFlox from '../../../assets/flixflox.png';
import { Content } from 'antd/es/layout/layout';
import { useAuth } from '../../../components/authentication/authProvider';
import { useTheme } from '../../../components/theme/themeProvider';
import { lightTheme, darkTheme } from '../../../components/theme/themeConfig';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const { useToken } = theme;
const { useBreakpoint } = Grid;

const LoginForm: React.FC = () => {
    const { token } = useToken();
    const screens = useBreakpoint();
    const { Text } = Typography;
    const auth = useAuth();
    const [form] = Form.useForm();
    const { mode, toggleTheme } = useTheme();

    const onFinish = async (values: any, role: string) => {
        try {
            await auth.login(values.username, values.password, role);
        } catch (error: any) {
            notification.error({
                message: "Login failed.",
                description: "Please check your credentials."
            });
        }
    };

    const handleViewerLogin = () => {
        form.validateFields().then((values) => {
            onFinish(values, 'viewer');
        });
    };

    const handleAdminLogin = () => {
        form.validateFields().then((values) => {
            onFinish(values, 'admin');
        });
    };

    const themeConfig = mode === 'dark' ? darkTheme : lightTheme;

    return (
        <ConfigProvider
            theme={{
                ...themeConfig,
                algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <LoginContent
                token={token}
                screens={screens}
                Text={Text}
                form={form}
                mode={mode}
                toggleTheme={toggleTheme}
                handleAdminLogin={handleAdminLogin}
                handleViewerLogin={handleViewerLogin}
            />
        </ConfigProvider>
    );
};

const LoginContent: React.FC<any> = ({ screens, form, mode, toggleTheme, handleAdminLogin, handleViewerLogin }) => {
    const { token } = theme.useToken();
    const { Text } = Typography;

    return (
        <Layout style={{
            height: '100vh',
            background: mode === 'dark'
                ? 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)'
                : 'linear-gradient(135deg, #fff5f0 0%, #fef3e7 50%, #f5f5f7 100%)',
        }}>
            <Button
                type="text"
                icon={mode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
                onClick={toggleTheme}
                style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontSize: '18px',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: mode === 'dark' ? '#fbbf24' : '#64748b',
                    zIndex: 10,
                }}
            />
            <Content style={{
                margin: "0 auto",
                padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
                width: "460px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center"
            }}>
                <Card style={{
                    width: "100%",
                    padding: `${token.paddingXL}px`,
                    borderRadius: '16px',
                    backgroundColor: token.colorBgContainer,
                    boxShadow: mode === 'dark'
                        ? '0 8px 32px rgba(0, 0, 0, 0.4)'
                        : '0 8px 32px rgba(232, 97, 26, 0.08)',
                    border: mode === 'dark' ? '1px solid #2d2d44' : 'none',
                }}
                    title={
                        <div style={{ textAlign: "center" }}>
                            <img src={FlixFlox} alt="logo" style={{ height: 80 }} />
                            <div style={{ marginBottom: `${token.padding}px` }}>
                                <Text type="secondary">Login to your account</Text>
                            </div>
                        </div>
                    }>
                    <Form
                        form={form}
                        name="basic"
                        layout='vertical'
                        initialValues={{ remember: true }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input size="large" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password size="large" />
                        </Form.Item>
                        <Form.Item>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <Button
                                    block={true}
                                    type="primary"
                                    size="large"
                                    onClick={handleAdminLogin}
                                    style={{ marginBottom: `${token.paddingXS}px`, height: 44 }}
                                >
                                    Login as Admin
                                </Button>
                                <Button
                                    block={true}
                                    type="default"
                                    size="large"
                                    onClick={handleViewerLogin}
                                    style={{ height: 44 }}
                                >
                                    Login as Viewer
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
};

export default LoginForm;
