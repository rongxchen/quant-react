import { Button } from "@mui/joy";
import { Menu } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const menuItems = [
    { 
        key: "/", 
        label: "Home" 
    },
    { 
        key: "/about", 
        label: "About", 
    },
].map((item) => ({
    key: item.key,
    label: item.label,
    children: item.children,
}));

const HeaderMenu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [current, setCurrent] = useState(location.pathname);
    for (const item of menuItems) {
        if (!item.children || item.children.length === 0) {
            continue;
        }
        for (const subitem of item.children) {
            if (subitem.key === location.pathname) {
                setCurrent(item.key);
            }
        }
    }

    return (
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
            <Menu
                onClick={(e) => {
                    navigate(e.key);
                }}
                theme="light"
                mode="horizontal"
                selectedKeys={[current]}
                // items={menuItems}
                style={{ width: "70%" }}
            >
                {menuItems.map((item) => (
                    <React.Fragment key={item.key}>
                        {item.children && item.children.length > 0 ? (
                            <Menu.SubMenu key={item.key} title={item.label}>
                                {item.children.map((subitem) => (
                                    <Menu.Item key={subitem.key}>
                                        {subitem.label}
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        ) : (
                            <Menu.Item key={item.key} title={item.label}>
                                {item.label}
                            </Menu.Item>
                        )}
                    </React.Fragment>
                ))}
            </Menu>
            <div style={{ minWidth: "200px" }}>
                <Button onClick={() => {navigate("/login")}} variant="soft" style={{ marginRight: "20px" }}>Login</Button>
                <Button>Signup</Button>
            </div>
        </div>
    )
}

export default HeaderMenu;
