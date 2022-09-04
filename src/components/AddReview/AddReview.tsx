import React from "react";
import styled from "styled-components";
import { Modal, Button, Input, Form } from "antd";

import LoginSvg from "../../assets/login.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginAsync, selectLogin } from "./loginSlice";

type LoginProps = {
  open: boolean;
  onClose: () => void;
};

const Login: React.FC<LoginProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectLogin);
  const loading = status === "loading";

  const onLogin = (values: any) => {
    dispatch(loginAsync({ ...values, onClose }))
  };

  return (
    <Modal
      visible={open}
      onCancel={onClose}
      footer={null}
      width={600}
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
            marginBottom: 10,
          }}
        />
        Easily login and add your precious review
      </>

      <Form layout="inline" onFinish={onLogin}>
        <Form.Item name="email" rules={[{ required: true }]}>
          <StyledInput type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <StyledInput type="password" placeholder="Password" />
        </Form.Item>
        <Button type="primary" loading={loading} htmlType="submit">
          Login
        </Button>
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
  );
};

export default Login;

// const GoogleButton = styled(Button)`
//   border-radius: 10px;
//   border: 0;
//   filter: drop-shadow(1px 1px 10px rgba(0, 0, 0, 0.1));
//   height: 45px;
//   width: 400px;
// `;

const StyledInput = styled(Input)`
  width: 100%;
`;
