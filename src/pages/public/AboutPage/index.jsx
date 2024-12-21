import HeaderMenu from "../../../components/public/HeaderMenu";
import { Layout } from 'antd';

const { Header, Content } = Layout;

const AboutPage = () => {
    return (
        <Layout>
            <Header style={{ position: "sticky", top: 0, zIndex: 1000, maxWidth: "100%", backgroundColor: "white" }}>
                <HeaderMenu />
            </Header>
            <Content className="flex-center">
                <h1>This ia a Quant Platform</h1>
            </Content>
      </Layout>
    )
}

export default AboutPage;
