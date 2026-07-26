import { Col, Divider, Form, Input, InputNumber, Modal, notification, Row, Select, TimePicker } from "antd";
import React, { useCallback, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CatalogController } from "../../../../controllers";

dayjs.extend(customParseFormat);

interface ModalFormProps {
    title: string;
    open: boolean;
    data: any;
    okText: string;
    cancelText: string;
    setOpen: (open: boolean) => void;
    setRefresh: (refresh: boolean) => void;
}

const catalogCtrl = new CatalogController();

const toDayjs = (time?: string) => time ? dayjs(time, 'HH:mm:ss') : undefined;
const toTimeString = (time?: dayjs.Dayjs) => time ? time.format('HH:mm:ss') : null;

export const EpisodeForm: React.FC<ModalFormProps> = ({ title, data, open, setOpen, okText, cancelText, setRefresh }) => {
    const [form] = Form.useForm();
    const [submit, setSubmit] = React.useState(false);

    useEffect(() => {
        if (!open) return;
        form.resetFields();
        form.setFieldsValue({
            ...data,
            intro_start_time: toDayjs(data?.intro_start_time),
            intro_end_time: toDayjs(data?.intro_end_time),
            next_episode_time: toDayjs(data?.next_episode_time),
        });
    }, [data, open])

    const onSave = useCallback(async (values: any) => {
        try {
            setSubmit(true);
            await catalogCtrl.updateEpisode(data.uuid, data.season, data.episode, {
                ...values,
                intro_start_time: toTimeString(values.intro_start_time),
                intro_end_time: toTimeString(values.intro_end_time),
                next_episode_time: toTimeString(values.next_episode_time),
            });
            notification.success({ message: 'Episode updated successfully' });
            setOpen(false);
            setRefresh(true);
        } catch (error: any) {
            notification.error({
                message: 'Failed to update episode',
                description: error?.response?.data?.message ?? error?.message,
            });
        } finally {
            setSubmit(false);
        }
    }, [data, setOpen, setRefresh]);

    return (
        <Modal
            title={data?.season && data?.episode ? `${title} — S${data.season}E${data.episode}` : title}
            open={open}
            onCancel={() => setOpen(false)}
            width={720}
            okText={okText}
            cancelText={cancelText}
            maskClosable={false}
            okButtonProps={{ autoFocus: true, htmlType: 'submit', loading: submit }}
            cancelButtonProps={{ disabled: submit }}
            modalRender={(dom) => (
                <Form
                    form={form}
                    layout="vertical"
                    name="episodeForm"
                    requiredMark="optional"
                    onFinish={onSave}
                >
                    {dom}
                </Form>
            )}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input placeholder="Episode title" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="season"
                        label="Season"
                        rules={[
                            { required: true, message: 'Season required!' },
                            { type: 'number', min: 1 }
                        ]}
                    >
                        <InputNumber min={1} precision={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="episode"
                        label="Episode"
                        rules={[
                            { required: true, message: 'Episode required!' },
                            { type: 'number', min: 1 }
                        ]}
                    >
                        <InputNumber min={1} precision={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Divider orientation="left" orientationMargin={0} plain>Playback</Divider>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="intro_start_time"
                        label="Intro Start"
                        tooltip="Time when the intro starts"
                    >
                        <TimePicker
                            showNow={false}
                            format="HH:mm:ss"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="intro_end_time"
                        label="Intro End"
                        tooltip="Time when the intro ends"
                        dependencies={["intro_start_time"]}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || !getFieldValue("intro_start_time")) {
                                        return Promise.resolve();
                                    }
                                    if (value.isBefore(getFieldValue("intro_start_time"))) {
                                        return Promise.reject(new Error("End time must be after start time!"));
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <TimePicker
                            showNow={false}
                            format="HH:mm:ss"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="next_episode_time"
                        label="Next Episode"
                        tooltip="Time when the next episode prompt appears"
                    >
                        <TimePicker
                            showNow={false}
                            format="HH:mm:ss"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                name="skip_intro_display_message"
                label="Skip Intro Message"
                tooltip="Text shown on the skip intro button"
            >
                <Input placeholder="Skip Intro" autoComplete="off" />
            </Form.Item>
            <Divider orientation="left" orientationMargin={0} plain>Details</Divider>
            <Form.Item name="cast" label="Cast">
                <Select
                    mode="tags"
                    placeholder="Add cast members"
                    allowClear
                />
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[{ max: 500, message: "Description cannot exceed 500 characters" }]}
            >
                <Input.TextArea
                    rows={4}
                    placeholder="Enter episode description"
                    showCount
                    maxLength={500}
                />
            </Form.Item>
        </Modal>
    );
}
