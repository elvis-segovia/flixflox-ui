import { Card, Layout } from "antd"
import { MainBreadcrumb } from "../breadcrumb"
import { Footer } from "antd/es/layout/layout";

const { Content } = Layout;

export const MainBlock: React.FC<MainBlockProps> = ({ children, showBreadcrumb, title, button }) => {
    return (
        <Layout>
            <Content style={ showBreadcrumb ? { margin: '0 16px' } : { margin: '20px 16px' }}>
                {showBreadcrumb ? <MainBreadcrumb /> : null}
                <Card title={title} extra={button}>
                    {children}
                </Card>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                StreamUI ©{new Date().getFullYear()} Created by <a href="https://github.com/elvus">elvus</a>
            </Footer>
        </Layout>
    )
}