import React from 'react';
import { Form, Input, Button, Layout, Grid, theme, Typography, Card, Space, notification } from 'antd';
import Template from '../../../assets/template.svg';

import { Content } from 'antd/es/layout/layout';
import { APP_NAME } from '../../../strings';
import { useAuth } from '../../../components/authentication/authProvider';

const { useToken } = theme;
const { useBreakpoint } = Grid;

const LoginForm: React.FC = () => {
    const { token } = useToken();
    const screens = useBreakpoint();
    const { Title, Text } = Typography;
    const auth = useAuth();
    const [form] = Form.useForm();

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
    
    return (
        <Layout style={{ height: '100vh' }}>
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
                    borderRadius: `${token.borderRadius}px`,
                    backgroundColor: token.colorBgContainer,
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                }}
                    title={
                        <div style={{ textAlign: "center" }}>
                            <img src={Template} alt="logo" style={{ width: 80, height: 80 }} />
                            <Title
                                level={4}
                                style={{ marginTop: `${token.padding}px`, marginBottom: `${token.padding}px` }}
                            >
                                {APP_NAME}
                            </Title>
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
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <Button 
                                    block={true} 
                                    type="primary" 
                                    onClick={handleAdminLogin}
                                    style={{ marginBottom: `${token.paddingXS}px` }}
                                >
                                    Login as Admin
                                </Button>
                                <Button 
                                    block={true} 
                                    type="default" 
                                    onClick={handleViewerLogin}
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