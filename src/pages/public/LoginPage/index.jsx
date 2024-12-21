import React, { useState } from 'react';
import { Form, Input, Flex, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Avatar, Checkbox } from "@mui/joy";
import { setCookie } from "../../../utils/cookie_util";
import { login } from "../../../api/user_api";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [form] = Form.useForm();
    const [remember, setRemember] = useState(false);
    const [Message, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        if (remember) {
            setCookie("email", values.email);
            setCookie("password", values.password);
        }
        const res = await login(values.email, values.password);
        if (res.data.token_type && res.data.token_type === "bearer") {
            localStorage.setItem("accessToken", res.data.access_token);
            localStorage.setItem("refreshToken", res.data.refresh_token);
            navigate("/profile");
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
                            email: "user@email.com",
                            password: "0000",
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
                        ><Input prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>

                        {/* Operations */}
                        <Form.Item>
                            <Flex justify="space-between" align="center">
                            <Checkbox onChange={onRmbChange} size="sm" label="Remember me"></Checkbox>
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
