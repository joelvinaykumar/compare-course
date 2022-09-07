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
import { LogoutOutlined, UserOutlined, CaretDownFilled } from "@ant-design/icons";
import styled from "styled-components";

import { AddReview } from "..";
import { ROUTES } from "../../utils/routes.enum";
import { currentUser, USER_ROLES } from "../../utils/constants";
import { logOutAsync } from "../AddReview/loginSlice";
import { useAppDispatch } from "../../redux/hooks";

type NavbarProps = {};
const { Header } = Layout;

const Navbar: React.FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [openLogin, setOpenLogin] = useState(false);

  const getRoutes = () => {
    const routes = [
      { title: "Home", route: "/" },
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
    ]

    switch (currentUser?.role) {
      case USER_ROLES.SUPER_ADMIN:
        return [
          {
            title: "Home",
            route: ROUTES.SUPERADMIN,
          }
        ]
      case USER_ROLES.ADMIN:
        return [
          ...routes,
          {
            title: "Dashboard",
            route: ROUTES.ADMIN,
          },
          {
            title: "Courses",
            route: ROUTES.COURSES,
          },
          {
            title: "Company Profile",
            route: ROUTES.COMPANY_BY_ID,
          }
        ]
      case USER_ROLES.USER:
        return routes
      default:
        return routes;
    }
  }

  const routeTo = (route: string | null) => () => {
    if (route) navigate(route);
    else return null;
  };

  let profileMenuItems: any = [
    {
      title: "Profile",
      icon: <UserOutlined />,
      onClick: () => dispatch(logOutAsync()),
    },
    {
      title: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => dispatch(logOutAsync()),
    },
  ];

  const ProfileMenu = (
    <Dropdown
      arrow
      placement="bottom"
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
      <Button type="text">
        <Space>
          <Avatar src={currentUser?.picture} />
          <Typography.Text>Joel Vinay Kumar</Typography.Text>
          <ArrowDownIcon />
        </Space>
      </Button>
    </Dropdown>
  );

  return (
    <StyledHeader>
      <LeftMenu theme="light" mode="horizontal" expandIcon>
        <Menu.Item disabled>
          <Logo src={require("../../assets/logo.png")} />
        </Menu.Item>
        {getRoutes()?.map((route, index) => (
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
          {![USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN].includes(currentUser?.role) && (
            <StyledButton type="primary" onClick={() => setOpenLogin(true)}>
              Write a Review
            </StyledButton>
          )}
          {currentUser?.name ? ProfileMenu: null}
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
  width: 80px;
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
  padding-right: 20px;
`;

const StyledButton = styled(Button)`
  filter: drop-shadow(1px 5px 12px rgba(29, 51, 84, 0.5))
`

const ArrowDownIcon = styled(CaretDownFilled)`
  font-size: 18px;
`