import React from "react"
import { Outlet } from "react-router-dom"
import { Layout, Row } from 'antd';
import styled from "styled-components"

import { Navbar, AnimatedPage } from ".."


type AppSkeletonProps = {

}

const { Content, Footer } = Layout;

const AppSkeleton: React.FC<AppSkeletonProps> = () => {

  return (
    <Layout>
      <Navbar />
      <Layout style={{ position:"relative" }}>
        <StyledContent>
          <AnimatedPage><Outlet /></AnimatedPage>
        </StyledContent>
      </Layout>
      <Footer>
        <Row justify="center">
          Copyrights @ 2022. Compare Courses. All rights reserved
        </Row>
      </Footer>
    </Layout>
  )
};

export default AppSkeleton;

const StyledContent = styled(Content)`
  margin: 0;
  // background-color: white
`