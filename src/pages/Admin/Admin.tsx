import React from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom"
import { Layout, Menu, Typography } from "antd";
import { BankTwoTone, BookTwoTone, HomeTwoTone } from "@ant-design/icons";

import theme from "../../utils/theme";
import { ROUTES } from "../../utils/routes.enum";

type AdminProps = {};

const { Sider, Content } = Layout;

const Admin: React.FC<AdminProps> = () => {

  const navigate = useNavigate()

  const menuItems = [
    {
      label: "Home",
      link: ROUTES.HOME,
      icon: <HomeTwoTone twoToneColor={theme.primary} />,
      key: "1",
    },
    {
      label: "Institute",
      link: ROUTES.INSTITUTE,
      icon: <BankTwoTone twoToneColor={theme.primary} />,
      key: "2",
    },
    {
      label: "Courses",
      link: ROUTES.COURSE,
      icon: <BookTwoTone twoToneColor={theme.primary} />,
      key: "3",
    },
  ];

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
            padding: "80px 0"
          }}
        >
          <Menu defaultSelectedKeys={["1"]}>
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Typography.Text strong onClick={() => navigate(item.link)}>
                  {item.label}
                </Typography.Text>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
      </Layout>
        <StyledContent style={{margin: 0}}>
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
`
