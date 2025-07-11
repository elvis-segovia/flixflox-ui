import { Avatar, Card, Typography } from "antd"
import { UserOutlined, PlusOutlined } from "@ant-design/icons"

const { Title } = Typography

interface ProfileCardProps {
    id: string;
    name: string;
    icon?: React.ReactNode;
    color?: string;
    isNewProfile?: boolean;
    onClick: (id: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
    id,
    name,
    icon = <UserOutlined />,
    color = "#1890ff",
    isNewProfile = false,
    onClick
}) => {
    const cardIcon = isNewProfile ? <PlusOutlined /> : icon;
    const cardColor = isNewProfile ? "#52c41a" : color;

    return (
        <Card
            hoverable
            style={{
                width: 140,
                textAlign: "center",
                background: "rgba(45, 45, 45, 0.8)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                transform: "scale(1)"
            }}
            className="user-card"
            onClick={() => onClick(id)}
        >
            <Avatar
                size={80}
                icon={cardIcon}
                style={{
                    backgroundColor: cardColor,
                    marginBottom: "1rem",
                    border: "3px solid rgba(255, 255, 255, 0.2)"
                }}
            />
            <Title 
                level={4} 
                style={{ 
                    margin: 0,
                    fontSize: "1rem",
                    color: "#ffffff"
                }}
            >
                {name}
            </Title>
        </Card>
    );
}; 