import {  Layout, Menu, Dropdown, Avatar, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../authentication/authProvider";

interface NavbarProps {
    items: any;
    logo?: React.ReactNode;
    loginPath?: string;
    style?: React.CSSProperties;
}

export const WebNavbar: React.FC<NavbarProps> = ({
    items,
    logo = <div className="demo-logo" />,
    style
}) => {
    const { username, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const userMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: username,
            disabled: true,
        },
        {
            type: 'divider' as const,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: handleLogout,
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    ...style,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    {logo}
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['movies']}
                        items={items}
                        style={{ flex: 1, minWidth: 0 }}
                    />
                </div>
                <Dropdown
                    menu={{ items: userMenuItems }}
                    placement="bottomRight"
                    arrow
                >
                    <Space style={{ cursor: 'pointer', color: 'white' }}>
                        <Avatar icon={<UserOutlined />} />
                        <span>{localStorage.getItem("username") || username}</span>
                    </Space>
                </Dropdown>
            </Header>
            <Outlet />
        </Layout>
    );
}