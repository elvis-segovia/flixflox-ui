import { DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";

export const ModalForm: React.FC = () => {
    const [open, setOpen] = useState(true);
    return (
        <Modal
            title="Basic Modal"
            open={open}
            onCancel={() => setOpen(false)}
            width={1000}
            okText="Submit"
        >
            <Form layout="vertical">
                <Form.Item label="Name">
                    <Input />
                </Form.Item>
                <Form.Item label="Email">
                    <Input type="email" />
                </Form.Item>
                <Form.Item label="Select">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker />
                </Form.Item>
            </Form>
        </Modal>
    );
}