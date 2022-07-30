import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, Button, Layout } from 'antd';
import styled from "styled-components"

import { AddReview } from ".."
import { ROUTES } from "../../utils/routes.enum";

type NavbarProps = {};
const { Header } = Layout;

const Navbar: React.FC<NavbarProps> = () => {

  const navigate = useNavigate()
  const [openLogin, setOpenLogin] = useState(false)

  const routes = [
    { title: "Home", route: ROUTES.HOME },
    { title: "Courses", route: ROUTES.COURSES }
  ]

  const routeTo = (route: string) => navigate(route)

  return (
    <StyledHeader>
      <Logo src={require("../../assets/logo.png")} />
      <LeftMenu theme="light" mode="horizontal">
        {routes.map((route, index) => (
          <Menu.Item key={index + 1} onClick={() => routeTo(route.route)}>
            {route.title}
          </Menu.Item>
        ))}
      </LeftMenu>
      <RightMenu>
        <Button type="primary" onClick={() => setOpenLogin(true)}>
          Add Review
        </Button>
        <AddReview open={openLogin} onClose={() => setOpenLogin(false)} />
      </RightMenu>
    </StyledHeader>
  );
};

export default Navbar;

const StyledHeader = styled(Header)`
  padding: 0;
  display: flex;
  position:fixed;
  width:100%;
  left:0;
  top:0;
  z-index: 1000;
`

const Logo = styled.img`
  display: flex;
  width: 64px;
  height: 64px;
  padding: 10px;
  background-color: white;
`

const LeftMenu = styled(Menu)`
  display: flex;
  align-items: center;
  width: 50%;
`

const RightMenu = styled(Menu)`
  display: flex;
  width: 50%;
  justify-content: flex-end;
  align-items: center;
  padding-right: 50px;
`