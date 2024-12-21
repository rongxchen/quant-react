import { useNavigate } from "react-router-dom";
import { Empty } from 'antd';
import { Button } from "@mui/joy";

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/", { replace: true });
    }

    return (
        <div style={{ display: "grid", justifyContent: "center", placeItems: "center", height: "100%", marginTop: "150px" }}>
            <Empty description={"Page Not Found"} />
            <Button onClick={handleBack} style={{ marginTop: "20px" }}>Go to Home</Button>
        </div>
    )
}

export default PageNotFound;
