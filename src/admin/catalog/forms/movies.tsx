import { Button, Form, Input, InputNumber, Select, Space, TimePicker, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

interface MovieFormProps {
    form: any;
    onCreate: (values: any) => void;
    saving: boolean;
    disabled: boolean;
    uploadProps: any;
}

const currentYear = new Date().getFullYear() + 1;
const yearOptions = Array.from({ length: currentYear - 1980 }, (_v, k) => ({
    label: k + 1980,
    value: k + 1980
}));

const genreOptions = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy',
    'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy',
    'Film-Noir', 'History', 'Horror', 'Music', 'Musical',
    'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller',
    'War', 'Western'
].map(genre => ({ label: genre, value: genre }));

export const MoviesForm: React.FC<MovieFormProps> = ({ form, onCreate, saving, disabled }) => {

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
            name="movieForm"
            onFinish={(values) => onCreate(values)}
            initialValues={{
                type: 'movie',
                rating: 5,
                release_year: new Date().getFullYear(),
                intro_start_time: dayjs('00:00:00', "HH:mm:ss"),
                intro_end_time: dayjs('00:00:00', "HH:mm:ss"),
            }}
            disabled={disabled}
        >
            <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please input the title!' }]}
            >
                <Input placeholder="Enter the movie title" autoComplete="off"/>
            </Form.Item>
            <Form.Item
                name="type"
                label="Type"
                hidden
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="release_year"
                label="Release Year"
                rules={[{ required: true, message: 'Please input the release year!' }]}
            >
                <Select
                    placeholder="Select release year"
                    showSearch
                    optionFilterProp="label"
                    options={yearOptions}
                    allowClear
                />
            </Form.Item>
            <Form.Item
                name="genre"
                label="Genre"
                rules={[{ required: true, message: 'Please input the genre!' }]}
            >
                <Select
                    mode="multiple"
                    placeholder="Select genre"
                    options={genreOptions}
                    allowClear
                />
            </Form.Item>
            <Form.Item
                name="rating"
                label="Rating"
                rules={[{ required: true, message: 'Please input the rating!' }]}
            >
                <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    style={{ width: '100%' }}
                    placeholder="Enter rating (0.0 - 10.0)"
                />
            </Form.Item>
            <Space.Compact>
                <Form.Item
                    name="intro_start_time"
                    label="Intro Start Time"
                    tooltip="Time when the intro starts in the movie"
                >
                    <TimePicker format="HH:mm:ss" showNow={false} />
                </Form.Item>
                <Form.Item
                    name="intro_end_time"
                    label="Intro End Time"
                    dependencies={['intro_start_time']}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || !getFieldValue('intro_start_time')) {
                                    return Promise.resolve();
                                }
                                if (value.isBefore(getFieldValue('intro_start_time'))) {
                                    return Promise.reject(new Error('End time must be after start time!'));
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <TimePicker
                        format="HH:mm:ss"
                        showNow={false}
                    />
                </Form.Item>
            </Space.Compact>
            <Form.Item
                name="cast"
                label="Cast"
            >
                <Select
                    mode="tags"
                    placeholder="Select cast"
                    allowClear
                />
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[{ max: 500, message: 'Description cannot exceed 500 characters' }]}
            >
                <Input.TextArea
                    rows={4}
                    placeholder="Enter the movie description"
                    showCount
                    maxLength={500}
                />
            </Form.Item>
            <Form.Item
                name="file_path"
                label="Files"
                valuePropName="file"
                rules={[{ required: true, message: 'Please input the file path!' }]}
                getValueFromEvent={normFile}
            >
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