import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { APP_NAME } from '../../strings';
import { DownOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MoonOutlined, SunOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../authentication/authProvider';
import { useTheme } from '../theme/themeProvider';
import Logo from '../../assets/logo.png';

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
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const currentPath = `/${location.pathname.split('/').slice(1, 4).filter(elm => elm).join('/')}`;
    const auth = useAuth();
    const { mode, toggleTheme } = useTheme();
    const {
        token: { colorBgContainer, colorText, colorTextSecondary }
    } = theme.useToken()

    const currentKey = useMemo(() => {
        const currentOpenKey = openKeys.find((key) => currentPath.includes(key));

        return (
            currentOpenKey
                ? (menuItems.find((item: any) => item.key?.toString().includes(currentOpenKey)) as any)
                    ?.children?.find((child: any) => child.key?.toString().includes(currentPath))
                    ?.key
                : menuItems.find((item: any) => item.key?.toString().includes(currentPath))?.key
        )?.toString() ?? "";
    }, [currentPath, menuItems, openKeys]);

    const onSelect: MenuProps['onSelect'] = ({ key }) => {
        if (openKeys.includes(key as string)) return;
    }

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        setOpenKeys(keys as string[]);
    }

    const logout: MenuProps['items'] = [
        {
            key: 'logout',
            label: (
                <a onClick={async () => await auth.logout()}>
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
                            <img src={Logo} alt="Logo" className="logo-image" />
                        )}
                        {!collapsed && (
                            <>
                                <img src={Logo} alt="Logo" className="logo-image" />
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
                    boxShadow: mode === 'dark'
                        ? '0 1px 2px 0 rgba(0, 0, 0, 0.2)'
                        : '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Button
                            type="text"
                            icon={mode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
                            onClick={toggleTheme}
                            style={{
                                fontSize: '18px',
                                width: 40,
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: mode === 'dark' ? '#fbbf24' : colorTextSecondary,
                            }}
                        />
                        <Dropdown menu={{ items: logout }} placement="bottomRight" trigger={['click']}>
                            <div className="user-dropdown">
                                <Avatar
                                    style={{
                                        backgroundColor: '#e8611a',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    icon={<UserOutlined />}
                                />
                                <span style={{
                                    color: colorText,
                                    fontSize: '14px',
                                    fontWeight: 500
                                }}>
                                    {auth.username}
                                </span>
                                <DownOutlined style={{ fontSize: '12px', color: colorTextSecondary }} />
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Outlet />
            </Layout>
        </Layout>
    );
};
