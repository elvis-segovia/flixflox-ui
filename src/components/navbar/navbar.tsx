import { Button, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { Link, Outlet } from "react-router-dom";

interface NavbarProps {
    items: any;
    logo?: React.ReactNode;
    loginPath?: string;
    style?: React.CSSProperties;
}

export const WebNavbar: React.FC<NavbarProps> = ({
    items,
    logo = <div className="demo-logo" />,
    loginPath = "/dashboard/login",
    style
}) => {
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
                    ...style,
                }}
            >
                {logo}
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['movies']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />
                <Button type="link" style={{ float: 'right', color: 'white' }}>
                    <Link to={loginPath}>Login</Link>
                </Button>
            </Header>
            <Outlet />
        </Layout>
    );
}