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
  Steps,
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
  const { status } = useAppSelector(selectCompany);
  const loading = status === "loading";

  const [step, setStep] = useState(0);

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
      dispatch(getCompaniesAsync());
    } else {
      dispatch(createCompanyAsync(input));
    }
    onClose()
  };

  const handleStepChange = (step: number) => setStep(step);

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
        initialValues={{ ...data, remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
      >
        <StyledStepper size="small" onChange={handleStepChange} current={step}>
          <Steps.Step title="Basic" />
          <Steps.Step title="Advanced" />
        </StyledStepper>
        {step === 0 && (
          <>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item
                  label="Admin Name"
                  name="adminName"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Harry" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Admin Email"
                  name="adminEmail"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input placeholder="harry@oscorp.com" />
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
          </>
        )}
        {step === 1 && (
          <>
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
          </>
        )}
        <FullWidthButton type="primary" htmlType="submit" loading={loading}>
          Save
        </FullWidthButton>
      </Form>
    </Drawer>
  );
};

export default CompanyForm;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

const StyledStepper = styled(Steps)`
  width: 60%;
  margin: 0 auto 30px auto;
`;
