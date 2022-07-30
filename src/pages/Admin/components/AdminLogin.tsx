import React from "react"
import styled from "styled-components"
import { Form, Input, Button } from "antd"
import { MailOutlined, LockOutlined } from "@ant-design/icons"

type AdminLoginProps = {

}

const AdminLogin: React.FC<AdminLoginProps> = () => {

  const handleSubmit = (values: any) => {

  }

  const handleSubmitFailed = () => {

  }

  return (
    <Container>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
        style={{ width: "60%" }}
      >
        <Form.Item label="Email">
          <Input prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <FullWidthButton  type="primary" htmlType="submit">
          Login
        </FullWidthButton>
      </Form>
    </Container>
  )
};

export default AdminLogin;

const Container = styled.div`
  width: 75%;
  min-height: 80vh;
  padding: 40px;
  float: right;
  display: flex;
  align-items: center;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`