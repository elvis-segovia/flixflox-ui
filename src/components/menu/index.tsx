import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Layout, Menu, Space, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { APP_NAME } from '../../strings';

const { Sider } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

interface MainMenuProps {
    menuItems: MenuItem[];
}

export const MainMenu: React.FC<MainMenuProps> = ({ menuItems }) => {
    const [collapsed, setCollapsed] = useState(false);
    //set current key
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const currentPath = location.pathname.split('/dashboard').slice(1)[0]
    console.log(currentPath);
    const currentKey = useMemo(() => menuItems.find((item) => item?.key?.toString().includes(currentPath))?.key?.toString() || '', [currentPath, menuItems]);
    // close submenus on deselect
    const onSelect: MenuProps['onSelect'] = ({ key }) => {
        if(openKeys.includes(key as string)) return;
    }
    // open one submenu on select
    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        setOpenKeys(keys as string[]);
    }
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center', paddingInlineStart: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" style={{ width: 32, height: 32 }} />
                    <Space style={{ marginLeft: 16 }}>
                        <Title level={5} style={{ margin: 0, color: 'white' }}>{APP_NAME}</Title>
                    </Space>
                </div>
            </Header>
            <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme='dark'>
                    <Menu theme="dark" selectedKeys={[currentKey]} mode="inline" items={menuItems} onSelect={onSelect} onOpenChange={onOpenChange} openKeys={openKeys}/>
                </Sider>
                <Outlet />
            </Layout>
        </Layout>
    );
};