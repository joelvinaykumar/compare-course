import React from "react";
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
import {
  LogoutOutlined,
  UserOutlined,
  CaretDownFilled,
} from "@ant-design/icons";
import styled from "styled-components";

import { ROUTES } from "../../utils/routes.enum";
import { currentUser, RoleLabel, USER_ROLES } from "../../utils/constants";
import { logOutAsync } from "../../pages/Login/loginSlice";
import { useAppDispatch } from "../../redux/hooks";

type NavbarProps = {};
const { Header } = Layout;

const Navbar: React.FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const routes = [
    { title: "Home", route: "/" },
    {
      title: "Courses",
      route: "/courses",
      children: [
        { title: "Data Science Courses", route: ROUTES.COURSES },
        { title: "Cloud Engineering Courses", route: ROUTES.COURSES },
        { title: "Fullstack Development Courses", route: ROUTES.COURSES },
        { title: "Devops Courses", route: ROUTES.COURSES },
        { title: "Cyber Security Courses", route: ROUTES.COURSES },
      ],
    },
  ];

  const getRoutes = () => {
    switch (currentUser?.role) {
      case USER_ROLES.SUPER_ADMIN:
        return [
          {
            title: "Home",
            route: ROUTES.SUPERADMIN,
          },
        ];
      case USER_ROLES.ADMIN:
        return [
          {
            title: "Dashboard",
            route: "/",
          },
          {
            title: "Company Profile",
            route: `${ROUTES.COMPANY}/${currentUser.organization?._id}`,
          },
        ];
      case USER_ROLES.USER:
        return routes;
      default:
        return routes;
    }
  };

  const routeTo = (route: string | null) => () => {
    if (route) navigate(route);
    else return null;
  };

  let profileMenuItems: any = [
    {
      title: "Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/me"),
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
      trigger={["click"]}
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
        <Space align="center">
          <Avatar src={currentUser?.picture} />
          <ProfileName>
            <Typography.Text>Joel Vinay Kumar</Typography.Text>
            {/* @ts-ignore */}
            <Typography.Text type="secondary">
              {/* @ts-ignore */}
              {RoleLabel?.[currentUser?.role]}
            </Typography.Text>
          </ProfileName>
          <ArrowDownIcon />
        </Space>
      </Button>
    </Dropdown>
  );

  return (
    <StyledHeader theme="light">
      <Logo src={require("../../assets/logo.png")} onClick={routeTo("/")} />
      <RightMenu mode="horizontal" theme="light" expandIcon>
        {getRoutes()?.map((route, index) => (
          <Menu.Item
            key={index + 1}
            defaultValue={"1"}
            onClick={routeTo(route.route)}
          >
            {route.children ? (
              <Menu.SubMenu key={route.title} title={route.title}>
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
      </RightMenu>
      <Space align="end" size={20}>
        {![USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN].includes(
          currentUser?.role
        ) && (
          <StyledButton type="link" onClick={routeTo(ROUTES.REVIEW)}>
            Write a Review
          </StyledButton>
        )}
        {!currentUser && (
          <StyledButton type="primary" onClick={routeTo(ROUTES.LOGIN)}>
            Login
          </StyledButton>
        )}
        {currentUser ? ProfileMenu : null}
      </Space>
    </StyledHeader>
  );
};

export default Navbar;

const StyledHeader = styled(Header)`
  padding: 0;
  padding-right: 20px;
  display: flex;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
  background-color: white;
`;

const Logo = styled.img`
  scale: 0.7;
  cursor: pointer;
`;


const RightMenu = styled(Menu)`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const ProfileName = styled.div`
  display: flex;
  flex-direction: column;
  backgroun-color: red;
  text-align: left;
`;

const StyledButton = styled(Button)`
  filter: drop-shadow(1px 5px 12px rgba(29, 51, 84, 0.5));
`;

const ArrowDownIcon = styled(CaretDownFilled)`
  font-size: 18px;
`;
