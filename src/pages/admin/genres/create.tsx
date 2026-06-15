import { Form, Input, Modal, notification } from "antd";
import React, { useCallback } from "react";
import { GenresController } from "../../../controllers";

interface ModalFormProps {
    title: string;
    open: boolean;
    okText: string;
    cancelText: string;
    setOpen: (open: boolean) => void;
    setRefresh: (refresh: boolean) => void;
}

interface Genre {
    genre: string;
}

const genreCtrl = new GenresController();

export const GenreForm: React.FC<ModalFormProps> = ({ title, open, setOpen, okText, cancelText, setRefresh }) => {
    const [form] = Form.useForm();
    const [submit, setSubmit] = React.useState(false);

    const onCreate = useCallback(async (values: Genre) => {
        setSubmit(true);
        setRefresh(true);
        const response: any = await genreCtrl.createGenre(values)

        if (response.status === 201) {
            setSubmit(false);
            notification.success({ message: 'Genre created successfully' });
            form.resetFields();
        } else {
            setSubmit(false);
            notification.error({ message: response.message });
        }
    }, [setRefresh])
    return (
        <Modal
            title={title}
            open={open}
            onCancel={() => setOpen(false)}
            width={600}
            okText={okText}
            cancelText={cancelText}
            okButtonProps={{ autoFocus: true, htmlType: 'submit', loading: submit }} modalRender={(dom) => (
                <Form
                    form={form}
                    layout="horizontal"
                    name="scopeForm"
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
                label="Genre"
                name="genre"
                rules={[
                    { required: true, message: 'Please input the genre!' },
                ]}
            >
                <Input placeholder="Genre" />
            </Form.Item>
        </Modal>
    );
}