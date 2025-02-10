import { Card, Layout } from "antd"
import { MainBreadcrumb } from "../breadcrumb"

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
            {/* <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer> */}
        </Layout>
    )
}