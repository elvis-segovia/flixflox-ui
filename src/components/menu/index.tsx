import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { APP_NAME } from '../../strings';
import { DownOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../authentication/authProvider';

const { Sider } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

interface MainMenuProps {
    menuItems: MenuItem[];
}
const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

export const MainMenu: React.FC<MainMenuProps> = ({ menuItems }) => {
    const [collapsed, setCollapsed] = useState(false);
    //set current key
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const currentPath = location.pathname.split('/').slice(2, 3).filter(elm => elm).join('/')
    const currentKey = useMemo(() => menuItems.find((item) => item?.key?.toString().includes(currentPath))?.key?.toString() || '', [currentPath, menuItems]);
    const auth = useAuth();
    const {
        token: { colorBgContainer }
    } = theme.useToken()
    // close submenus on deselect
    const onSelect: MenuProps['onSelect'] = ({ key }) => {
        if (openKeys.includes(key as string)) return;
    }
    // open one submenu on select
    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        setOpenKeys(keys as string[]);
    }

    const logout: MenuProps['items'] = [
        {
            key: 'logout',
            label: (
                <a onClick={() => auth.logout()}>
                    <Space>
                        <LogoutOutlined />
                        <span>Logout</span>
                    </Space>
                </a>
            )
        }
    ]

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={siderStyle} trigger={null} collapsible collapsed={collapsed}>
                <div className="logo-container">
                    <div className="logo-content">
                        {collapsed && (
                            <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="Logo" className="logo-image" />
                        )}
                        {!collapsed && (
                            <>
                                <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="Logo" className="logo-image" />
                                <Space className="title-space">
                                    <div className="title-container">
                                        <Title level={5} ellipsis className="main-title">
                                            {APP_NAME}
                                        </Title>
                                    </div>
                                </Space>
                            </>
                        )}
                    </div>
                </div>
                <Menu theme="dark" selectedKeys={[currentKey]} mode="inline" items={menuItems} onSelect={onSelect} onOpenChange={onOpenChange} openKeys={openKeys} />
            </Sider>
            <Layout>
                <Header style={{
                    padding: '0 24px',
                    background: colorBgContainer,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '64px',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 48,
                                height: 48,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Dropdown menu={{ items: logout }} placement="bottomRight" trigger={['click']}>
                            <div className="user-dropdown">
                                <Avatar
                                    style={{
                                        backgroundColor: '#1890ff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    icon={<UserOutlined />}
                                />
                                <span style={{
                                    color: 'rgba(0, 0, 0, 0.85)',
                                    fontSize: '14px',
                                    fontWeight: 500
                                }}>
                                    {auth.username}
                                </span>
                                <DownOutlined style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)' }} />
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Outlet />
            </Layout>
        </Layout>
    );
};