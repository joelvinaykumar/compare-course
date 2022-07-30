import React from "react"
import styled from "styled-components"
import { Modal, Button, Input, Form, Space } from "antd"

import LoginSvg from "../../assets/login.svg"

type LoginProps = {
  open: boolean,
  onClose: () => void
}

const Login: React.FC<LoginProps> = ({ open, onClose }) => {
  return (
    <Modal
      visible={open}
      onCancel={onClose}
      footer={null}
      bodyStyle={{
        height: 400,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <>
        <img
          alt="login"
          src={LoginSvg}
          width={200}
          style={{
            marginBottom: 10
          }}
        />
        Easily login and add your precious review
      </>

      <Form>
        <Space>
          <StyledInput placeholder="Email" />
          <StyledInput placeholder="Password" />
          <Button type="primary">Login</Button>
        </Space>
      </Form>
      {/* <GoogleButton type="primary">
        <img
          alt="google logo"
          width={20}
          style={{ marginRight: 10 }}
          src={require("../../assets/Google_Logo.png")}
        />
        Use Google to Login
      </GoogleButton> */}
    </Modal>
  )
};

export default Login;

const GoogleButton = styled(Button)`
  border-radius: 10px;
  border: 0;
  filter: drop-shadow(1px 1px 10px rgba(0, 0, 0, 0.1));
  height: 45px;
  width: 400px;
`

const StyledInput = styled(Input)`
  width: 100%;
`