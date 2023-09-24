import React, { useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Space,
  Button,
  Select,
  Row,
  Col,
  Modal,
  Typography,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Quill from "react-quill";

import {
  createCompanyAsync,
  updateCompanyAsync,
  getCompaniesAsync,
  selectCompany,
} from "../companySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

type AddCompanyFormProps = {
  open: boolean;
  onClose: () => void;
  data: any;
};

const CompanyForm: React.FC<AddCompanyFormProps> = ({
  open,
  onClose,
  data = null,
}) => {
  const dispatch = useAppDispatch();
  const { status, password } = useAppSelector(selectCompany);
  const loading = status === "loading";

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const openPasswordModal = () => setPasswordVisible(true);
  const closePasswordModal = () => {
    setPasswordVisible(false);
    onClose();
  };

  const modeOptions = [
    { label: "Online", value: "Online" },
    { label: "Offline", value: "Offline" },
    { label: "Hybrid", value: "Hybrid" },
  ];

  const typeOptions = [
    { label: "CompetetiveExams", value: "CompetetiveExams" },
    { label: "Upskilling", value: "Upskilling" },
  ];

  const handleSubmit = async (values: any) => {
    const input = {
      ...values,
      faculty: values?.faculty?.map((f: any) => ({
        name: f.name,
        picture: f.picture,
      })),
    };

    if (data) {
      await dispatch(updateCompanyAsync({ id: data?._id, input }));
      onClose();
    } else {
      dispatch(createCompanyAsync(input));
    }
    setTimeout(() => dispatch(getCompaniesAsync({})), 700);
    openPasswordModal();
  };

  const handleSubmitFailed = () => {};

  return (
    <Drawer
      visible={open}
      onClose={onClose}
      width={800}
      placement="right"
      title={data ? "Edit Company data" : "Onboard Company"}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        initialValues={{
          ...data,
          adminEmail: data?.admin[0].email,
          adminName: data?.admin[0].name,
          remember: true,
        }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
      >
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item
              label="Admin Name"
              name="adminName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Harry" disabled={data} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Admin Email"
              name="adminEmail"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="harry@oscorp.com" disabled={data} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Eg: Broadridge Solutions" />
        </Form.Item>
        <Form.Item label="Mode" name="mode" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            options={modeOptions}
            placeholder="Select multiple modes"
          />
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[{ required: true }]}>
          <Select options={typeOptions} />
        </Form.Item>
        <Form.Item label="About" name="about" rules={[{ required: false }]}>
          <Quill theme="snow" />
        </Form.Item>

        <Form.List name="faculty" initialValue={[]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => {
                const removeFormItem = () => remove(name);
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      rules={[{ required: true, message: "Missing name" }]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "picture"]}
                      rules={[{ required: false }]}
                    >
                      <Input placeholder="Picture" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={removeFormItem} />
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={add}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Faculty (Optional)
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <FullWidthButton type="primary" htmlType="submit" loading={loading}>
          Save
        </FullWidthButton>
      </Form>
      {passwordVisible && password && (
        <Modal
          title="Temporary Password"
          footer={null}
          open={passwordVisible}
          onCancel={closePasswordModal}
        >
          <MiniText>
            Please save this password as it will not be provided next time.
            {"\n"}
          </MiniText>
          <MegaText code copyable>
            {password}
          </MegaText>
        </Modal>
      )}
    </Drawer>
  );
};

export default CompanyForm;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

const MiniText = styled(Typography.Text)`
  font-size: 13px;
`;

const MegaText = styled(Typography.Text)`
  font-size: 19px;
  margin-top: 50px;
`;
