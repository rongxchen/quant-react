import HeaderMenu from "../../../components/public/HeaderMenu";
import { Layout } from 'antd';
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../../utils/auth_util";

const { Header, Content } = Layout;

const HomePage = () => {
    if (isAuthenticated()) {
        return <Navigate to="/profile" />;
    }

    return (
        <Layout>
            <Header style={{ position: "sticky", top: 0, zIndex: 1000, maxWidth: "100%", backgroundColor: "white" }}>
                <HeaderMenu />
            </Header>
            <Content className="flex-center">
                <h1>Quant Platform</h1>
            </Content>
      </Layout>
    )
}

export default HomePage;
