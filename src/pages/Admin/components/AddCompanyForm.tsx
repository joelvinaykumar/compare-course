import React from "react";
import { Drawer, Form, Input, Space, Button, Select } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

import {
  createCompanyAsync,
  updateCompanyAsync,
  getCompaniesAsync,
  selectCompany
} from "../companySlice"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

type AddCompanyFormProps = {
  open: boolean;
  onClose: () => void;
  data: any;
};

const AddCompanyForm: React.FC<AddCompanyFormProps> = ({
  open,
  onClose,
  data = null,
}) => {

  const dispatch = useAppDispatch()
  const { status } = useAppSelector(selectCompany)
  const loading = status === "loading"

  const modeOptions = [
    { label: "Online", value: "Online"},
    { label: "Offline", value: "Offline"},
    { label: "Hybrid", value: "Hybrid"},
  ]

  const typeOptions = [
    { label: "CompetetiveExams", value: "CompetetiveExams" },
    { label: "Upskilling", value: "Upskilling"},
  ]

  const handleSubmit = async (values: any) => {
    const input = {
      ...values,
      faculty: values?.faculty?.map((f: any) => ({ name: f.name, picture: f.picture }))
    }
    if (data) {
      await dispatch(updateCompanyAsync({ id: data?._id, input }))
      dispatch(getCompaniesAsync())
    } else {
      dispatch(createCompanyAsync(input))
    }
  };

  const handleSubmitFailed = () => {};

  return (
    <Drawer
      visible={open}
      onClose={onClose}
      width={800}
      placement="right"
      title={data? "Edit Company data": "Add Company"}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        initialValues={{ ...data, remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Eg: Broadridge Solutions" />
        </Form.Item>
        <Form.Item label="About" name="about" rules={[{ required: false }]}>
          <Input.TextArea maxLength={1000} showCount />
        </Form.Item>
        <Form.Item label="Mode" name="mode" rules={[{ required: true }]}>
          <Select mode="multiple" options={modeOptions} placeholder="Select multiple modes" />
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[{ required: true }]}>
          <Select options={typeOptions} />
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
                      name={[name, 'name']}
                      rules={[{ required: true, message: "Missing name" }]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'picture']}
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
        <FullWidthButton  type="primary" htmlType="submit" loading={loading}>
          {data? "Update": "Submit"}
        </FullWidthButton>
      </Form>
    </Drawer>
  );
};

export default AddCompanyForm;

const FullWidthButton = styled(Button)`
  width: 100%;
`