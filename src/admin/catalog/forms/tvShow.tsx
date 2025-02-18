import { Button, Form, Input, InputNumber, Select, TimePicker, Upload } from "antd"
import { InboxOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface TvShowFormProps {
    form: any;
    onCreate: (values: any) => void;
    saving: boolean;
    uploadProps: any;
}

const { Dragger } = Upload;

export const TvShowForm: React.FC<TvShowFormProps> = ({ form, onCreate, saving, uploadProps }) => {
    return (
        <Form
            form={form}
            layout="vertical"
            name="tvShowForm"
            onFinish={onCreate}
            initialValues={{
                type: 'tvshow',
                rating: 0.0,
                season: 1,
                release_year: new Date().getFullYear()
            }}
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
                        Array.from({ length: new Date().getFullYear() - 1980 }, (_v, k) => k + 1980)
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
                    options={[
                        { label: 'Action', value: 'Action' },
                        { label: 'Adventure', value: 'Adventure' },
                        { label: 'Animation', value: 'Animation' },
                        { label: 'Biography', value: 'Biography' },
                        { label: 'Comedy', value: 'Comedy' },
                        { label: 'Crime', value: 'Crime' },
                        { label: 'Documentary', value: 'Documentary' },
                        { label: 'Drama', value: 'Drama' },
                        { label: 'Family', value: 'Family' },
                        { label: 'Fantasy', value: 'Fantasy' },
                        { label: 'Film-Noir', value: 'Film-Noir' },
                        { label: 'History', value: 'History' },
                        { label: 'Horror', value: 'Horror' },
                        { label: 'Music', value: 'Music' },
                        { label: 'Musical', value: 'Musical' },
                        { label: 'Mystery', value: 'Mystery' },
                        { label: 'Romance', value: 'Romance' },
                        { label: 'Sci-Fi', value: 'Sci-Fi' },
                        { label: 'Sport', value: 'Sport' },
                        { label: 'Thriller', value: 'Thriller' },
                        { label: 'War', value: 'War' },
                        { label: 'Western', value: 'Western' }
                    ]}
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
            <Form.Item
                name="description"
                label="Description"
                rules={[{ max: 500, message: 'Description cannot exceed 500 characters' }]}
            >
                <Input.TextArea
                    rows={4}
                    placeholder="Enter TV show description"
                    showCount
                    maxLength={500}
                />
            </Form.Item>
            <Form.Item name="cast" label="Cast">
                <Select
                    mode="tags"
                    placeholder="Select cast"
                    allowClear
                />
            </Form.Item>
            <Form.Item
                name="season"
                label="Season"
                rules={[
                    { required: true, message: 'Please input the season number!' },
                    { type: 'number', min: 1, message: 'Season must be at least 1' }
                ]}
            >
                <InputNumber
                    min={1}
                    style={{ width: '100%' }}
                    placeholder="Enter season number"
                />
            </Form.Item>
            <Form.Item
                name="intro_start_time"
                label="Intro Start Time"
                tooltip="Time when the intro starts in the episode"
            >
                <TimePicker format="HH:mm:ss" showNow={false} />
            </Form.Item>
            <Form.Item
                name="intro_end_time"
                label="Intro End Time"
                tooltip="Time when the intro ends in the episode"
            >
                <TimePicker format="HH:mm:ss" showNow={false} />
            </Form.Item>
            <Form.Item name="file_path" label="Files" rules={[{ required: true, message: 'Please input the file path!' }]}>
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" loading={saving}>
                    {saving ? 'Saving...' : 'Save'}
                </Button>
                <Link to="/movies/catalog" style={{ marginLeft: 8 }}>
                    <Button>
                        Cancel
                    </Button>
                </Link>
            </Form.Item>
        </Form>
    )
}