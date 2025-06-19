import React from "react";
import { MainBlock } from "../../../components";
import { Button, Form, FormInstance, Input, Select, Space, DatePicker, Row, Col, Card, notification } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, PictureOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { UsersController } from "../../../controllers";

interface SubmitButtonProps {
    form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable}>
            {children}
        </Button>
    );
};

const usersController = new UsersController();

export const UsersCreate: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        // Transform the data to match the backend model
        const transformedData = {
            ...values,
            profile: {
                first_name: values.first_name,
                last_name: values.last_name,
                date_of_birth: values.date_of_birth?.format('YYYY-MM-DD'),
                address: {
                    street: values.street,
                    city: values.city,
                    country: values.country
                }
            }
        };

        const response = await usersController.createUser(transformedData)
        if (response.status === 201) {
            notification.success({
                message: "User created successfully.",
                description: "The user has been created successfully."
            });
        } else {
            notification.error({
                message: "User creation failed.",
                description: "The user has not been created."
            });
        }
    };

    return (
        <MainBlock title="Add User" showBreadcrumb={true}>
            <Form
                form={form}
                name="user_create"
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
            >
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Card title="Basic Information" className="mb-4">
                                <Form.Item
                                    name="username"
                                    label="Username"
                                    rules={[
                                        { required: true, message: 'Please input username!' },
                                        { min: 3, message: 'Username must be at least 3 characters!' }
                                    ]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="Enter username" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        { required: true, message: 'Please input password!' },
                                        { min: 8, message: 'Password must be at least 8 characters!' }
                                    ]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Please input email!' },
                                        { type: 'email', message: 'Please enter a valid email!' }
                                    ]}
                                >
                                    <Input prefix={<MailOutlined />} placeholder="Enter email" />
                                </Form.Item>

                                <Form.Item
                                    name="avatar"
                                    label="Avatar URL"
                                    rules={[
                                        { required: true, message: 'Please input avatar URL!' },
                                        { type: 'url', message: 'Please enter a valid URL!' }
                                    ]}
                                >
                                    <Input prefix={<PictureOutlined />} placeholder="Enter avatar URL" />
                                </Form.Item>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Role & Privileges" className="mb-4">
                                <Form.Item
                                    name="role"
                                    label="Role"
                                    rules={[{ required: true, message: 'Please select a role!' }]}
                                >
                                    <Select placeholder="Select role">
                                        <Select.Option value="admin">Admin</Select.Option>
                                        <Select.Option value="user">User</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="privileges"
                                    label="Privileges"
                                    rules={[{ required: true, message: 'Please select privileges!' }]}
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Select privileges"
                                    >
                                        <Select.Option value="read">Read</Select.Option>
                                        <Select.Option value="write">Write</Select.Option>
                                        <Select.Option value="update">Update</Select.Option>
                                        <Select.Option value="delete">Delete</Select.Option>
                                        <Select.Option value="manage">Manage</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>
                    <Card title="Profile Information" className="mb-4">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="first_name"
                                    label="First Name"
                                    rules={[{ required: true, message: 'Please input first name!' }]}
                                >
                                    <Input placeholder="Enter first name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="last_name"
                                    label="Last Name"
                                    rules={[{ required: true, message: 'Please input last name!' }]}
                                >
                                    <Input placeholder="Enter last name" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name="date_of_birth"
                            label="Date of Birth"
                            rules={[{ required: true, message: 'Please select date of birth!' }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                disabledDate={(current) => current && current > dayjs().endOf('day')}
                            />
                        </Form.Item>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    name="street"
                                    label="Street Address"
                                    rules={[{ required: true, message: 'Please input street address!' }]}
                                >
                                    <Input placeholder="Enter street address" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="city"
                                    label="City"
                                    rules={[{ required: true, message: 'Please input city!' }]}
                                >
                                    <Input placeholder="Enter city" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="country"
                                    label="Country"
                                    rules={[{ required: true, message: 'Please input country!' }]}
                                >
                                    <Input placeholder="Enter country" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Form.Item>
                        <Space>
                            <SubmitButton form={form}>Create User</SubmitButton>
                            <Button htmlType="reset">Reset</Button>
                        </Space>
                    </Form.Item>
                </Space>
            </Form>
        </MainBlock>
    );
};