/* eslint-disable no-template-curly-in-string */
import React, { useContext, useEffect } from "react"
import styled from "styled-components";
import { Typography, Button, Row, Divider, Form, Input, Space } from "antd"
import { EyeTwoTone, EyeInvisibleOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

import { CustomButton } from "../../components"
import { loginAsync, selectLogin } from "./loginSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AuthContext from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes.enum";

type LoginProps = {

}

const Login: React.FC<LoginProps> = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status } = useAppSelector(selectLogin)
  const { authenticated } = useContext(AuthContext)
  const loading = status === 'loading'

  useEffect(() => {
    if(authenticated) navigate(ROUTES.HOME)
  }, [authenticated, navigate])

  const handleLogin = (values: any) => dispatch(loginAsync({ ...values }))
  
  return (
    <Container>
      <LeftCover />
      <RightArea>
        <StyledRow justify="space-between">
          <Typography.Title level={4}>
            Hello, welcome to EvaluatR!
          </Typography.Title>
          <br />
          <Typography.Text type="secondary">Please login here using</Typography.Text>
          <ButtonRow justify="space-between">
            <StyledButton shape="round">
              <Space>
                <img alt="google login" src={require("../../assets/Google_Logo.png")} width={15} />
                <Typography.Text>Google</Typography.Text>
              </Space>
            </StyledButton>
            <StyledButton shape="round">
              <Space>
                <img alt="google login" src={require("../../assets/office-365.png")} width={20} />
                <Typography.Text>Microsoft</Typography.Text>
              </Space>
            </StyledButton>
          </ButtonRow>
        <Divider orientation="center" plain>
          <Typography.Text type="secondary" style={{ fontSize: 12 }} >or continue with</Typography.Text>
        </Divider>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          style={{ width: '100%' }}
          layout="vertical"
          validateMessages={{
            types: {
              email: "${label} should be a valid email address"
            },
            default: "Validation error on field ${name}",
            required: "${label} missing",
            enum: "${label} must be one of [${enum}]",
          }}
          onFinish={handleLogin}
        >
          <Form.Item name="email" rules={[{ type: "email", required: true }]}>
            <StyledInput placeholder="Email" prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <StyledInput.Password
              placeholder="Password"
              prefix={<LockOutlined />}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item>
            <CustomButton block htmlType="submit" type="primary" loading={loading}>
              Login
            </CustomButton>
          </Form.Item>
        </Form>
        </StyledRow>
      </RightArea>
    </Container>
  )
};

export default Login;


const Container = styled.div`
  width: 100%;
  height: 95vh;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
`

const LeftCover = styled.div`
  width: 60%;
  height: 100%;
  background-image: url(${require("../../assets/peter-chirkov.jpeg")});
  background-size: cover;
`

const RightArea = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledRow = styled(Row)`
  width: 60%;
  margin-top: 15px;
`

const ButtonRow = styled(Row)`
  width: 100%;
`

const StyledButton = styled(Button)`
  min-width: 130px;
  margin-top: 20px;
`

const StyledInput = styled(Input)`  
  width: 100%;
`