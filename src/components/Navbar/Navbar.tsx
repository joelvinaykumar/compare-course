import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Button,
  Layout,
  Typography,
  Space,
  Dropdown,
  Avatar,
} from "antd";
import styled from "styled-components";

import { AddReview } from "..";
import { ROUTES } from "../../utils/routes.enum";
import { currentUser, RoleLabel } from "../../utils/constants";
import { LogoutOutlined } from "@ant-design/icons";
import { logOutAsync } from "../AddReview/loginSlice";
import { useAppDispatch } from "../../redux/hooks";

type NavbarProps = {};
const { Header } = Layout;

const Navbar: React.FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [openLogin, setOpenLogin] = useState(false);

  const routes = [
    { title: "Home", route: ROUTES.HOME },
    {
      title: "Courses",
      route: null,
      children: [
        { title: "Data Science Courses", route: ROUTES.COURSES },
        { title: "Cloud Engineering Courses", route: ROUTES.COURSES },
        { title: "Fullstack Development Courses", route: ROUTES.COURSES },
        { title: "Devops Courses", route: ROUTES.COURSES },
        { title: "Cyber Security Courses", route: ROUTES.COURSES },
      ],
    },
  ];

  const routeTo = (route: string | null) => () => {
    if (route) navigate(route);
    else return null;
  };

  let profileMenuItems: any = [
    {
      title: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => dispatch(logOutAsync()),
    },
  ];

  const ProfileMenu = (
    <Dropdown
      placement="bottomRight"
      overlayStyle={{ minWidth: 200 }}
      overlay={
        <Menu>
          {profileMenuItems.map((item: any) => (
            <Menu.Item
              key={item?.title}
              icon={item?.icon}
              onClick={item?.onClick}
            >
              {item?.title}
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <Avatar size="large" src={currentUser?.picture} />
    </Dropdown>
  );

  return (
    <StyledHeader>
      <LeftMenu theme="light" mode="horizontal" expandIcon>
        <Menu.Item>
          <Logo src={require("../../assets/logo.png")} />
        </Menu.Item>
        {routes.map((route, index) => (
          <Menu.Item
            key={index + 1}
            defaultValue={0}
            onClick={routeTo(route.route)}
          >
            {route.children ? (
              <Menu.SubMenu title={route.title}>
                {route.children?.map((r) => (
                  <Menu.Item onClick={routeTo(r.route)}>
                    <Space>
                      <Typography>{r.title}</Typography>
                    </Space>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Typography.Text>{route.title}</Typography.Text>
            )}
          </Menu.Item>
        ))}
      </LeftMenu>
      <RightMenu>
        <Space align="end" size={30}>
          <Button type="primary" onClick={() => setOpenLogin(true)}>
            Add Review
          </Button>
          {currentUser && (
            <Space>
              <ProfileName>
                <Typography.Text strong style={{ height: 20 }}>
                  {currentUser?.name}
                </Typography.Text>
                <Typography.Text
                  type="secondary"
                  style={{ height: 15, whiteSpace: "nowrap" }}
                >
                  {/* @ts-ignore */}
                  {RoleLabel[currentUser?.role]}
                </Typography.Text>
              </ProfileName>
              {ProfileMenu}
            </Space>
          )}
        </Space>
      </RightMenu>
      {openLogin && (
        <AddReview open={openLogin} onClose={() => setOpenLogin(false)} />
      )}
    </StyledHeader>
  );
};

export default Navbar;

const StyledHeader = styled(Header)`
  padding: 0;
  display: flex;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.img`
  display: flex;
  width: 64px;
  height: 64px;
  padding: 10px;
  background-color: white;
`;

const LeftMenu = styled(Menu)`
  display: flex;
  align-items: center;
  width: 50%;
`;

const RightMenu = styled(Menu)`
  display: flex;
  width: 50%;
  justify-content: flex-end;
  align-items: center;
  padding-right: 50px;
`;

const ProfileName = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  backgroun-color: red;
  height: 80px;
`;
