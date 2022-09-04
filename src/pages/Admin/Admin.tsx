import React from "react";
import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import { BankTwoTone, BookTwoTone, HomeTwoTone } from "@ant-design/icons";

import theme from "../../utils/theme";
import { ROUTES } from "../../utils/routes.enum";

type AdminProps = {};

const { Sider, Content } = Layout;

const Admin: React.FC<AdminProps> = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const menuItems = [
    {
      label: "Home",
      route: ROUTES.HOME,
      icon: <HomeTwoTone twoToneColor={theme.primary} />,
    },
    {
      label: "Company",
      route: ROUTES.COMPANY,
      icon: <BankTwoTone twoToneColor={theme.primary} />,
    },
    {
      label: "Courses",
      route: ROUTES.COURSE,
      icon: <BookTwoTone twoToneColor={theme.primary} />,
    },
  ];

  const currentMenuItem = () => {
    if (location.pathname === "/admin") {
      return [menuItems[0]?.label];
    }
    const path = location.pathname.substring(7, location.pathname.length);
    console.log(path)
    return [menuItems.filter((menu) => menu.route === path)[0]?.label];
  };

  return (
    <Container>
      <Layout hasSider>
        <Sider
          theme="light"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            padding: "80px 0",
          }}
        >
          <Menu defaultSelectedKeys={currentMenuItem()}>
            {menuItems.map((item) => (
              <Menu.Item key={item.label} icon={item.icon}>
                <Typography.Text onClick={() => navigate(item.route)}>
                  {item.label}
                </Typography.Text>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
      </Layout>
      <StyledContent style={{ margin: 0 }}>
        <Outlet />
      </StyledContent>
    </Container>
  );
};

export default Admin;

const Container = styled.div`
  width: 100%;
  padding: 50px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledContent = styled(Content)`
  margin: 0;
  width: 75%;
`;
