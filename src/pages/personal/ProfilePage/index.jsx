import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Profile Page</h1>
            <Button onClick={() => {
                ["accessToken", "refreshToken"].forEach((key) => {
                    localStorage.removeItem(key);
                });
                navigate("/");
            }}>Logout</Button>
        </div>
    );
}

export default ProfilePage;
