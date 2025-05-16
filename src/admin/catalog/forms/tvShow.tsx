import { Button, Card, Form, Input, InputNumber, Select, Space, TimePicker, Upload } from "antd"
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';

interface TvShowFormProps {
    form: any;
    onCreate: (values: any) => void;
    saving: boolean;
    disabled: boolean;
    uploadProps: any;
}


export const TvShowForm: React.FC<TvShowFormProps> = ({ form, onCreate, saving, disabled }) => {
    const genres = [
        'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
        'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 'History',
        'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi',
        'Sport', 'Thriller', 'War', 'Western'
    ];

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.file;
    };

    return (
        <Form
            form={form}
            layout="vertical"
            name="tvShowForm"
            onFinish={onCreate}
            initialValues={{
                type: 'tvshow',
                rating: 5,
                release_year: new Date().getFullYear(),
                show_details: [{
                    season: 1,
                    episode: 1
                }] // Initialize with one episode
            }}
            disabled={disabled}
        >
            <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please input the title!' }]}
            >
                <Input placeholder="Enter TV show title" />
            </Form.Item>
            <Form.Item name="type" label="Type" hidden>
                <Input />
            </Form.Item>
            <Form.Item
                name="release_year"
                label="Release Year"
                rules={[{ required: true, message: 'Please select the release year!' }]}
            >
                <Select
                    placeholder="Select release year"
                    showSearch
                    optionFilterProp="label"
                    options={
                        Array.from({ length: (new Date().getFullYear() + 1) - 1980 }, (_v, k) => k + 1980)
                            .map((year) => ({ label: year, value: year }))
                            .reverse()
                    }
                    allowClear
                />
            </Form.Item>
            <Form.Item name="genre" label="Genre" rules={[{ required: true, message: 'Please input the genre!' }]}>
                <Select
                    mode="multiple"
                    placeholder="Select genre"
                    options={genres.map((genre) => ({ label: genre, value: genre }))}
                    allowClear
                />
            </Form.Item>
            <Form.Item
                name="rating"
                label="Rating"
                rules={[
                    { required: true, message: 'Please input the rating!' },
                    { type: 'number', min: 0, max: 10, message: 'Rating must be between 0 and 10' }
                ]}
            >
                <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    style={{ width: '100%' }}
                    placeholder="Enter rating (0.0 - 10.0)"
                />
            </Form.Item>
            <Form.List name="show_details">
                {(fields, { add, remove }) => (
                    <Space direction="vertical" size="middle" style={{ display: 'flex', width: '100%' }}>
                        {fields.map(({ key, name }) => (
                            <Card
                                key={key}
                                title={`S${form.getFieldValue(['show_details', name, 'season']) || ''}E${form.getFieldValue(['show_details', name, 'episode']) || ''}`}
                                extra={
                                    <MinusCircleOutlined
                                        onClick={() => fields.length > 1 && remove(name)}
                                        style={{ color: fields.length === 1 ? '#ccc' : '#ff4d4f' }}
                                    />
                                }
                            >
                                <Form.Item
                                    name={[name, "title"]}
                                    label="Title"
                                    rules={[{ required: true, message: 'Please input the title!' }]}
                                >
                                    <Input placeholder="Episode title" />
                                </Form.Item>
                                <Space direction="horizontal" style={{ width: '100%', gap: '16px' }}>
                                    <Form.Item
                                        name={[name, "season"]}
                                        label="Season"
                                        rules={[
                                            { required: true, message: 'Season required!' },
                                            { type: 'number', min: 1 }
                                        ]}
                                    >
                                        <InputNumber min={1} style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        name={[name, "episode"]}
                                        label="Episode"
                                        rules={[
                                            { required: true, message: 'Episode required!' },
                                            { type: 'number', min: 1 }
                                        ]}
                                    >
                                        <InputNumber min={1} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Space>
                                <Space.Compact>
                                    <Form.Item
                                        name={[name, "intro_start_time"]}
                                        label="Intro Start Time"
                                        tooltip="Time when the intro starts in the movie"
                                    >
                                        <TimePicker 
                                            showNow={false} 
                                            format="HH:mm:ss"
                                            onChange={(time) => {
                                                if (time) {
                                                    form.setFieldsValue({
                                                        [name]: {
                                                            intro_start_time: dayjs(time).format('HH:mm:ss')
                                                        }
                                                    });
                                                }
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={[name, "intro_end_time"]}
                                        label="Intro End Time"
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
                                            onChange={(time) => {
                                                if (time) {
                                                    form.setFieldsValue({
                                                        [name]: {
                                                            intro_end_time: dayjs(time).format('HH:mm:ss')
                                                        }
                                                    });
                                                }
                                            }}
                                        />
                                    </Form.Item>
                                </Space.Compact>
                                <Form.Item
                                    name={[name, "next_episode_time"]}
                                    label="Next Episode"
                                >
                                    <TimePicker 
                                        showNow={false} 
                                        format="HH:mm:ss"
                                        onChange={(time) => {
                                            if (time) {
                                                form.setFieldsValue({
                                                    [name]: {
                                                        next_episode_time: dayjs(time).format('HH:mm:ss')
                                                    }
                                                });
                                            }
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item name={[name, "cast"]} label="Cast">
                                    <Select
                                        mode="tags"
                                        placeholder="Select cast"
                                        allowClear
                                    />
                                </Form.Item>
                                <Form.Item
                                    name={[name, "description"]}
                                    label="Description"
                                    rules={[{ max: 500, message: "Description cannot exceed 500 characters" }]}
                                >
                                    <Input.TextArea
                                        rows={4}
                                        placeholder="Enter TV show description"
                                        showCount
                                        maxLength={500}
                                    />
                                </Form.Item>
                                <Form.Item name={[name, "file_path"]} label="Files" valuePropName="file" rules={[{ required: true, message: 'Please input the file path!' }]} getValueFromEvent={normFile}>
                                    <Upload
                                        listType="picture"
                                        accept=".mp4, .avi, .flv, .mkv, .mov, .wmv, .webm"
                                        beforeUpload={() => {
                                            return false;
                                        }}
                                    >
                                        <Button type="primary" icon={<UploadOutlined />}>
                                            Upload
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            </Card>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    const lastIndex = fields.length - 1;
                                    const lastSeason = form.getFieldValue(['show_details', lastIndex, 'season']) || 1;
                                    const lastEpisode = form.getFieldValue(['show_details', lastIndex, 'episode']) || 0;
                                    add({
                                        season: lastSeason,
                                        episode: lastEpisode + 1
                                    });
                                }}
                                block
                                icon={<PlusOutlined />}
                            >
                                Add Episode
                            </Button>
                        </Form.Item>
                    </Space>
                )}
            </Form.List>
            <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" loading={saving}>
                    {saving ? 'Saving...' : 'Save'}
                </Button>
                <Link to={`${import.meta.env.VITE_STREAMAPI_PREFIX_ADMIN}/movies`} style={{ marginLeft: 8 }}>
                    <Button>
                        Cancel
                    </Button>
                </Link>
            </Form.Item>
        </Form>
    )
}