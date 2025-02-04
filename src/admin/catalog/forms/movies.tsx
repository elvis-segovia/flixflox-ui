import { Button, Form, Input, InputNumber, Select, Upload } from "antd"
import { InboxOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


type MovieForm = {
    form: any;
    onCreate: any;
    props: any;
    saving: boolean;
}
const { Dragger } = Upload;

export const MoviesForm: React.FC<MovieForm> = ({form, onCreate, props, saving}) => {
    return (
        <Form form={form} layout="vertical" name="movieForm" onFinish={(values) => onCreate(values)} initialValues={{ type: 'movie', rating: '0.0' }}>
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="type" label="Type" hidden>
                <Input />
            </Form.Item>
            <Form.Item name="release_year" label="Release Year" rules={[{ required: true, message: 'Please input the release year!' }]}>
                <Select
                    placeholder="Select a year"
                    showSearch
                    optionFilterProp="label"
                    options={
                        Array.from({ length: new Date().getFullYear() - 1980 }, (_v, k) => k + 1980).map((year) => {
                            return {
                                label: year,
                                value: year
                            }
                        })
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
            <Form.Item name="rating" label="Rating" rules={[{ required: true, message: 'Please input the rating!' }]}>
                <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    style={{ width: '100%' }}
                    placeholder="Rating"
                />
            </Form.Item>
            <Form.Item name="description" label="Description">
                <Input />
            </Form.Item>
            <Form.Item name="cast" label="Cast">
                <Select
                    mode="tags"
                    placeholder="Select cast"
                    allowClear
                />
            </Form.Item>
            <Form.Item name="file_path" label="File" rules={[{ required: true, message: 'Please input the file path!' }]}>
                <Dragger {...props} maxCount={1}>
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
                <Link to="/catalog" style={{ marginLeft: 8 }}>
                    <Button>
                        Cancel
                    </Button>
                </Link>
            </Form.Item>
        </Form>
    )
}