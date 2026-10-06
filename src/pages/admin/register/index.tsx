import React from 'react';
import { Form, Input, Button, Layout, Grid, theme, Typography, Card, Select, notification, ConfigProvider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import FlixFlox from '../../../assets/flixflox.png';
import { Content } from 'antd/es/layout/layout';
import { useTheme } from '../../../components/theme/themeProvider';
import { lightTheme, darkTheme } from '../../../components/theme/themeConfig';
import { LoginController } from '../../../controllers';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const { useToken } = theme;
const { useBreakpoint } = Grid;

const loginCtrl = new LoginController();

const RegisterForm: React.FC = () => {
    const { token } = useToken();
    const screens = useBreakpoint();
    const { Text } = Typography;
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = React.useState(false);
    const { mode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            setSubmitting(true);
            await loginCtrl.register(values.username, values.password, values.email, values.role);
            notification.success({
                message: "Account created.",
                description: "You can now log in with your new account."
            });
            navigate("/login");
        } catch (error: any) {
            notification.error({
                message: "Registration failed.",
                description: error?.response?.data?.message || "Please review the information and try again."
            });
        } finally {
            setSubmitting(false);
        }
    };

    const themeConfig = mode === 'dark' ? darkTheme : lightTheme;

    return (
        <ConfigProvider
            theme={{
                ...themeConfig,
                algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <RegisterContent
                token={token}
                screens={screens}
                Text={Text}
                form={form}
                mode={mode}
                toggleTheme={toggleTheme}
                onFinish={onFinish}
                submitting={submitting}
            />
        </ConfigProvider>
    );
};

const RegisterContent: React.FC<any> = ({ screens, form, mode, toggleTheme, onFinish, submitting }) => {
    const { token } = theme.useToken();
    const { Text } = Typography;

    return (
        <Layout style={{
            minHeight: '100vh',
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
                                <Text type="secondary">Create your account</Text>
                            </div>
                        </div>
                    }>
                    <Form
                        form={form}
                        name="register"
                        layout='vertical'
                        initialValues={{ role: 'viewer' }}
                        autoComplete="off"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input username!'
                                },
                                {
                                    min: 3,
                                    message: 'Username must be at least 3 characters!'
                                },
                                {
                                    max: 20,
                                    message: 'Username cannot exceed 20 characters.'
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_]+$/,
                                    message: 'Username can only contain letters, numbers, and underscores.'
                                }
                            ]}
                        >
                            <Input size="large" autoFocus />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: 8, message: 'Password must be at least 8 characters!' }
                            ]}
                        >
                            <Input.Password size="large" />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirm_password"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password size="large" />
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[{ required: true, message: 'Please select a role!' }]}
                            hidden
                        >
                            <Select size="large">
                                <Select.Option value="viewer">Viewer</Select.Option>
                                <Select.Option value="admin">Admin</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                block={true}
                                type="primary"
                                size="large"
                                htmlType="submit"
                                loading={submitting}
                                style={{ height: 44 }}
                            >
                                Create account
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: "center" }}>
                            <Text type="secondary">Already have an account? </Text>
                            <Link to="/login">Log in</Link>
                        </div>
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
};

export default RegisterForm;
