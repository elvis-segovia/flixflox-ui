import { Button, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const items = [
    {
        key: 'movies',
        label: 'Movies',
    },
    {
        key: 'tv_shows',
        label: 'TV Shows',
    }
]

export const WebNavbar: React.FC = () => {
    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />
                <Button type="link" style={{ float: 'right', color: 'white' }}>
                    <Link to="/dashboard/login">Login</Link>
                </Button>
            </Header>
            <Outlet />
        </Layout>
    );
}