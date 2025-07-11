import { Modal, Form, Input, Switch, Select, Button } from "antd"
import { useState } from "react"
import { ViewersController } from "../../../../controllers"

const { Option } = Select

interface ViewerFormData {
    name: string;
    pin?: string;
    status?: string;
    use_pin?: boolean;
}

interface CreateProfileModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
}

// Array of attractive colors for user profiles
const PROFILE_COLORS = [
    "#52c41a", // Green
    "#fa8c16", // Orange
    "#eb2f96", // Pink
    "#722ed1", // Purple
    "#13c2c2", // Cyan
    "#f5222d", // Red
    "#faad14", // Gold
    "#a0d911", // Lime
    "#2f54eb", // Geek Blue
    "#fa541c", // Volcano
    "#eb2f96", // Magenta
    "#13c2c2", // Geek Cyan
    "#fa8c16", // Sunset Orange
    "#722ed1", // Geek Purple
];

const getRandomColor = (): string => {
    return PROFILE_COLORS[Math.floor(Math.random() * PROFILE_COLORS.length)];
};


export const CreateProfileModal: React.FC<CreateProfileModalProps> = ({
    visible,
    onCancel,
    onSuccess
}) => {
    const [formLoading, setFormLoading] = useState(false);
    const [form] = Form.useForm();
    const viewersController = new ViewersController();



    const handleCreateViewer = async (values: ViewerFormData) => {
        try {
            setFormLoading(true);
            
            // Prepare the data according to the model
            const viewerData = {
                name: values.name,
                pin: values.pin || null,
                status: values.status || "active",
                use_pin: values.use_pin || false,
                color: getRandomColor()
            };

            const response = await viewersController.createViewer(viewerData);
            
            if (response.status === 201 || response.status === 200) {
                onSuccess();
                handleModalCancel();
            } else {
                throw new Error("Failed to create profile");
            }
        } catch (error) {
            console.error("Error creating viewer:", error);
            throw error;
        } finally {
            setFormLoading(false);
        }
    };

    const handleModalCancel = () => {
        onCancel();
        form.resetFields();
    };

    return (
        <Modal
            title="Create New Profile"
            open={visible}
            onCancel={handleModalCancel}
            footer={null}
            width={500}
            style={{ top: 20 }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleCreateViewer}
                initialValues={{
                    use_pin: false,
                    status: "active"
                }}
            >
                <Form.Item
                    name="name"
                    label="Profile Name"
                    rules={[
                        { required: true, message: 'Please enter a profile name!' },
                        { min: 2, message: 'Name must be at least 2 characters!' },
                        { max: 50, message: 'Name must be less than 50 characters!' }
                    ]}
                >
                    <Input 
                        placeholder="Enter profile name"
                    />
                </Form.Item>

                <Form.Item
                    name="use_pin"
                    label="Use PIN Protection"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.use_pin !== currentValues.use_pin}
                >
                    {({ getFieldValue }) => 
                        getFieldValue('use_pin') ? (
                            <Form.Item
                                name="pin"
                                label="PIN Code"
                                rules={[
                                    { required: true, message: 'Please enter a PIN code!' },
                                    { pattern: /^\d{4,6}$/, message: 'PIN must be 4-6 digits!' }
                                ]}
                            >
                                <Input.Password 
                                    placeholder="Enter 4-6 digit PIN"
                                />
                            </Form.Item>
                        ) : null
                    }
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                >
                    <Select
                        style={{ 
                            background: "rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.2)"
                        }}
                    >
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                    </Select>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                    <Button 
                        onClick={handleModalCancel}
                        style={{ marginRight: 8 }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        loading={formLoading}
                    >
                        Create Profile
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}; 