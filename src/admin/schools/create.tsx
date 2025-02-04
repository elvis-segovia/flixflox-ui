import { Form, Input, Modal, notification } from "antd";
import React, { useState } from "react";

type ModalFormProps = {
    title: string;
    open: boolean;
    okText: string;
    cancelText: string;
    setOpen: (open: boolean) => void;
}

interface SchoolValues {
    schoolName: string;
    schoolNumber: string;
    schoolCity: string;
    schoolPhoneNumber: string;
    schoolAddress: string;
}

export const SchoolsCreate: React.FC<ModalFormProps> = ({ title, open, okText, cancelText, setOpen }) => {
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState<SchoolValues>();

    const onCreate = (values: SchoolValues) => {
        console.log('Received values of form: ', values);
        setFormValues(values);
        setOpen(false);
        notification.open({
            type: 'success',
            message: 'School Created',
            description: 'School has been created successfully'
        });
    };

    return (
        <Modal
            title={title}
            open={open}
            onCancel={() => setOpen(false)}
            width={1000}
            okText={okText}
            cancelText={cancelText}
            okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
            destroyOnClose
            modalRender={(dom) => (
                <Form
                    form={form}
                    layout="vertical"
                    name="schoolForm"
                    initialValues={{ modifier: 'public' }}
                    clearOnDestroy
                    onFinish={(values) => onCreate(values)}
                >
                    {dom}
                </Form>
            )}
        >
            <Form.Item name="schoolName" label="School Name">
                <Input />
            </Form.Item>
            <Form.Item name="schoolNumber" label="Shool Number">
                <Input />
            </Form.Item>
            <Form.Item name="schoolCity" label="School City">
                <Input />
            </Form.Item>
            <Form.Item name="schoolPhoneNumber" label="Phone Number">
                <Input />
            </Form.Item>
            <Form.Item name="schoolAddress" label="Address">
                <Input />
            </Form.Item>
        </Modal>
    )
}