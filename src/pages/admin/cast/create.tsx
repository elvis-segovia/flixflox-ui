import { DatePicker, Form, Input, InputRef, Modal, Select, notification } from "antd";
import React, { useRef } from "react";
import dayjs from "dayjs";
import { CastController } from "../../../controllers";

interface ModalFormProps {
    title: string;
    open: boolean;
    okText: string;
    cancelText: string;
    setOpen: (open: boolean) => void;
    onCreated?: () => void;
}

interface CastValues {
    name: string;
    birth_date?: dayjs.Dayjs;
    nationality?: string;
    gender?: string;
}

const castCtrl = new CastController();

export const CastForm: React.FC<ModalFormProps> = ({ title, open, setOpen, okText, cancelText, onCreated }) => {
    const [form] = Form.useForm();
    const inputRef = useRef<InputRef>(null);
    const [submit, setSubmit] = React.useState(false);

    const onClose = () => {
        form.resetFields();
        setOpen(false);
    };

    const onCreate = async (values: CastValues) => {
        setSubmit(true);
        const response: any = await castCtrl.createCast({
            ...values,
            birth_date: values.birth_date?.format('YYYY-MM-DD'),
        });
        setSubmit(false);

        if (response.status === 201) {
            notification.success({ message: 'Cast member created successfully' });
            form.resetFields();
            setOpen(false);
            onCreated && onCreated();
        } else {
            notification.error({ message: response.message });
        }
    };

    return (
        <Modal
            title={title}
            open={open}
            onCancel={onClose}
            afterOpenChange={(opened) => opened && inputRef.current?.focus({ cursor: 'end' })}
            width={600}
            okText={okText}
            cancelText={cancelText}
            okButtonProps={{ htmlType: 'submit', loading: submit }} modalRender={(dom) => (
                <Form
                    form={form}
                    layout="horizontal"
                    name="castForm"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    wrapperCol={{ flex: 1 }}
                    onFinish={onCreate}
                >
                    {dom}
                </Form>
            )}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    { required: true, message: 'Please input the name!' },
                ]}
            >
                <Input
                    placeholder="Name"
                    ref={inputRef}
                />
            </Form.Item>
            <Form.Item
                label="Birth Date"
                name="birth_date"
            >
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Select birth date"
                    disabledDate={(current) => current && current > dayjs().endOf('day')}
                />
            </Form.Item>
            <Form.Item
                label="Nationality"
                name="nationality"
            >
                <Input placeholder="Nationality" />
            </Form.Item>
            <Form.Item
                label="Gender"
                name="gender"
            >
                <Select placeholder="Select gender" allowClear>
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                </Select>
            </Form.Item>
        </Modal>
    );
}
