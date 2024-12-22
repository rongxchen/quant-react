import React, { useState } from 'react';
import { Form, Input, Flex, message } from 'antd';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Avatar, Checkbox } from "@mui/joy";
import { setCookie, findCookie } from "../../../utils/cookie_util";
import { login, getUserInfo } from "../../../api/user_api";
import { useNavigate, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../../utils/auth_util';

const LoginPage = () => {
    const [form] = Form.useForm();
    const [Message, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [email, setEmail] = useState(findCookie("email") || "");
    const [password, setPassword] = useState(findCookie("password") || "");
    const [remember, setRemember] = useState(email !== "" && password !== "");

    if (isAuthenticated()) {
        return <Navigate to="/profile" />;
    }

    const onFinish = async (values) => {
        if (remember) {
            setCookie("email", values.email);
            setCookie("password", values.password);
        }
        const res = await login(values.email, values.password);
        if (res.data.token_type && res.data.token_type === "bearer") {
            localStorage.setItem("accessToken", res.data.access_token);
            localStorage.setItem("refreshToken", res.data.refresh_token);
            const userInfo = await getUserInfo();
            if (userInfo.data.code === 0) {
                localStorage.setItem("userInfo", JSON.stringify(userInfo.data.data));
                navigate("/profile");
            } else {
                Message.error(userInfo.data.message);
            }
        } else {
            Message.error(res.data.message);
        }
    };

    const onRmbChange = (e) => {
        const checked = e.target.checked;
        setRemember(checked);
    }

    return (
        <>
            {contextHolder}
            <div className="flex-center" style={{ height: "100vh", alignItems: "center" }}>
                <div style={{ width: "24%", minWidth: "300px" }}>
                    <div className="flex-center" style={{ marginBottom: "25px" }}>
                        <Avatar src={"https://mui.com/static/images/avatar/1.jpg"} variant="solid" size="lg"></Avatar>
                    </div>
                    <Form
                        form={form}
                        name="login"
                        initialValues={{
                            email: email,
                            password: password,
                        }}
                        onFinish={onFinish}
                    >
                        {/* Email */}
                        <Form.Item
                            name="email"
                            rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                            ]}
                        ><Input prefix={<UserOutlined />} placeholder="Email" />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            name="password"
                            rules={[
                            {
                                min: 4,
                                message: 'Password must be longer than 4!',
                            },
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ]}
                        ><Input.Password 
                            prefix={<LockOutlined />} 
                            placeholder="Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                        </Form.Item>

                        {/* Operations */}
                        <Form.Item>
                            <Flex justify="space-between" align="center">
                            <Checkbox checked={remember} onChange={onRmbChange} size="sm" label="Remember me"></Checkbox>
                            <a href="#">Forgot password</a>
                            </Flex>
                        </Form.Item>

                        {/* Login Button */}
                        <Form.Item>
                            <Button size="sm" type="submit" style={{ width: "100%" }}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default LoginPage;
