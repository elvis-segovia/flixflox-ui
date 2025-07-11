import { Flex, Layout, Typography, Spin, message } from "antd"
import { Content } from "antd/es/layout/layout"
import { UserOutlined } from "@ant-design/icons"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ViewersController } from "../../../controllers"
import { CreateProfileModal, ProfileCard } from "./components"

const { Title, Text } = Typography

export const Users: React.FC = () => {
    const navigate = useNavigate();
    const viewersController = new ViewersController();

    const [viewers, setViewers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchViewers();
    }, []);

    const fetchViewers = async () => {
        try {
            setLoading(true);
            const response = await viewersController.listViewers();
            setViewers(response.data.map((viewer: any) => ({
                id: viewer.id,
                name: viewer.name,
                icon: <UserOutlined />,
                color: viewer.color
            })));
        } catch (error) {
            console.error("Error fetching viewers:", error);
            message.error("Failed to load profiles");
        } finally {
            setLoading(false);
        }
    };

    const handleUserClick = useCallback((userId: string) => {
        try {
            if (userId === "new") {
                setModalVisible(true);
                return;
            }

            const selectedViewer = viewers.find(v => v.id === userId)
            
            if (!selectedViewer) {
                console.error(`User with id ${userId} not found`)
                return
            }

            localStorage.setItem("username", selectedViewer.name)
            navigate("/web/catalog")
            
        } catch (error) {
            console.error("Error handling user selection:", error)
            message.error("Error selecting profile")
        }
    }, [viewers, navigate])

    const handleModalCancel = () => {
        setModalVisible(false);
    };

    const handleModalSuccess = () => {
        message.success("Profile created successfully!");
        fetchViewers(); // Refresh the list
    };

    return (
        <Layout style={{ 
            minHeight: "100vh", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
        }}>
            <Content style={{ padding: "2rem", maxWidth: "800px", width: "100%" }}>
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <Title 
                        level={1} 
                        style={{ 
                            marginBottom: "1rem",
                            fontSize: "2.5rem",
                            fontWeight: "bold",
                            color: "#ffffff"
                        }}
                    >
                        Who's watching?
                    </Title>
                    <Text style={{ color: "#b0b0b0", fontSize: "1.1rem" }}>
                        Select your profile to continue
                    </Text>
                </div>

                {loading ? (
                    <div style={{ textAlign: "center", padding: "2rem" }}>
                        <Spin size="large" />
                        <div style={{ marginTop: "1rem", color: "#b0b0b0" }}>Loading profiles...</div>
                    </div>
                ) : (
                    <Flex 
                        gap="large" 
                        justify="center" 
                        align="center" 
                        wrap="wrap"
                        style={{ maxWidth: "600px", margin: "0 auto" }}
                    >
                        {viewers.map((viewer) => (
                            <ProfileCard
                                key={viewer.id}
                                id={viewer.id}
                                name={viewer.name}
                                icon={viewer.icon}
                                color={viewer.color}
                                onClick={handleUserClick}
                            />
                        ))}

                        <ProfileCard
                            id="new"
                            name="New Profile"
                            isNewProfile={true}
                            onClick={handleUserClick}
                        />
                    </Flex>
                )}
            </Content>

            <CreateProfileModal
                visible={modalVisible}
                onCancel={handleModalCancel}
                onSuccess={handleModalSuccess}
            />
        </Layout>
    )
}