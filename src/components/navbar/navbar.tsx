import { Layout, Menu, Dropdown, Avatar, Space } from "antd";
import { UserOutlined, LogoutOutlined, SearchOutlined, BellOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../authentication/authProvider";
import { APP_NAME } from "../../strings";

interface NavbarProps {
    items: any;
    logo?: React.ReactNode;
    loginPath?: string;
    style?: React.CSSProperties;
}

export const WebNavbar: React.FC<NavbarProps> = ({
    items,
    logo,
    style
}) => {
    const { username, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            label: localStorage.getItem("username") || username,
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
        <Layout style={{ minHeight: '100vh', background: '#141414' }}>
            <Layout.Header
                className={`web-navbar ${scrolled ? 'web-navbar-scrolled' : ''}`}
                style={{
                    position: 'fixed',
                    top: 0,
                    zIndex: 100,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: scrolled ? 'rgba(20, 20, 20, 0.95)' : 'linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent)',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    transition: 'all 0.3s ease',
                    borderBottom: 'none',
                    padding: '0 48px',
                    height: 68,
                    ...style,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    {logo || (
                        <span style={{
                            color: '#e8611a',
                            fontSize: '1.6rem',
                            fontWeight: 800,
                            letterSpacing: '-0.5px',
                            marginRight: 40,
                            textShadow: '0 0 20px rgba(232, 97, 26, 0.3)',
                        }}>
                            {APP_NAME}
                        </span>
                    )}
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['movies']}
                        items={items}
                        className="web-nav-menu"
                        style={{
                            flex: 1,
                            minWidth: 0,
                            background: 'transparent',
                            borderBottom: 'none',
                            fontSize: '0.95rem',
                        }}
                    />
                </div>
                <Space size="middle" style={{ alignItems: 'center' }}>
                    <SearchOutlined style={{ color: '#fff', fontSize: 20, cursor: 'pointer' }} />
                    <BellOutlined style={{ color: '#fff', fontSize: 20, cursor: 'pointer' }} />
                    <Dropdown
                        menu={{ items: userMenuItems }}
                        placement="bottomRight"
                        arrow
                    >
                        <Space style={{ cursor: 'pointer', color: 'white', marginLeft: 8 }}>
                            <Avatar
                                style={{ backgroundColor: '#e8611a' }}
                                icon={<UserOutlined />}
                                size={32}
                            />
                        </Space>
                    </Dropdown>
                </Space>
            </Layout.Header>
            <Layout.Content style={{ background: '#141414', marginTop: 0 }}>
                <Outlet />
            </Layout.Content>
        </Layout>
    );
}