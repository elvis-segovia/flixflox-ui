import { Card, Layout } from "antd"
import { MainBreadcrumb } from "../breadcrumb"
import { Footer } from "antd/es/layout/layout";
import { APP_NAME } from "../../strings";

const { Content } = Layout;

export const MainBlock: React.FC<MainBlockProps> = ({ children, showBreadcrumb, title, button }) => {
    return (
        <Layout>
            <Content style={showBreadcrumb ? { margin: '0 16px' } : { margin: '20px 16px' }}>
                {showBreadcrumb ? <MainBreadcrumb /> : null}
                <Card title={title} extra={button}>
                    {children}
                </Card>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                {APP_NAME} v1.0.0 | © {new Date().getFullYear()} | Developed by {document.createElement("a").href} | <a href="https://github.com/elvus" target="_blank" rel="noopener noreferrer">View on GitHub</a> | Powered by <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Ant Design</a>
            </Footer>
        </Layout>
    )
}