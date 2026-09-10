import { Form, Input, InputRef, Modal, notification } from "antd";
import React, { useRef } from "react";
import { GenresController } from "../../../controllers";

interface ModalFormProps {
    title: string;
    open: boolean;
    okText: string;
    cancelText: string;
    setOpen: (open: boolean) => void;
    onCreated?: () => void;
}

interface Genre {
    genre: string;
}

const genreCtrl = new GenresController();

export const GenreForm: React.FC<ModalFormProps> = ({ title, open, setOpen, okText, cancelText, onCreated }) => {
    const [form] = Form.useForm();
    const inputRef = useRef<InputRef>(null);
    const [submit, setSubmit] = React.useState(false);
    const genre = Form.useWatch('genre', form);
    const disable = (genre?.trim().length ?? 0) <= 3;

    const onCreate = async (values: Genre) => {
        setSubmit(true);
        const response: any = await genreCtrl.createGenre(values)

        if (response.status === 201) {
            setSubmit(false);
            notification.success({ message: 'Genre created successfully' });
            form.resetFields();
        } else {
            setSubmit(false);
            notification.error({ message: response.message });
        }
        setOpen(false)
        onCreated && onCreated();
    };

    return (
        <Modal
            title={title}
            open={open}
            onCancel={() => setOpen(false)}
            afterOpenChange={(opened) => opened && inputRef.current?.focus({ cursor: 'end' })}
            width={600}
            okText={okText}
            cancelText={cancelText}
            okButtonProps={{ htmlType: 'submit', loading: submit, disabled: disable }} modalRender={(dom) => (
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
                <Input
                    placeholder="Genre"
                    onInput={(value) => console.log(value)}
                    ref={inputRef}
                />
            </Form.Item>
        </Modal>
    );
}