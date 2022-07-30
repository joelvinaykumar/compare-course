import React from "react";
import { Drawer, Form, Input, Space, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

import {
  createInstituteAsync,
  updateInstituteAsync,
  getInstitutesAsync,
  selectInstitute
} from "../Institute.slice"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

type AddInstituteFormProps = {
  open: boolean;
  onClose: () => void;
  data: any;
};

const AddInstituteForm: React.FC<AddInstituteFormProps> = ({
  open,
  onClose,
  data = null,
}) => {

  const dispatch = useAppDispatch()
  const { status } = useAppSelector(selectInstitute)
  const loading = status === "loading"

  const handleSubmit = async (values: any) => {
    const input = {
      ...values,
      faculty: values.faculty.map((f: any) => ({ name: f.name, picture: f.picture }))
    }
    if (data) {
      await dispatch(updateInstituteAsync({ id: data?._id, input }))
      dispatch(getInstitutesAsync())
    } else {
      dispatch(createInstituteAsync(input))
    }
  };

  const handleSubmitFailed = () => {};

  return (
    <Drawer
      visible={open}
      onClose={onClose}
      placement="right"
      title={data? "Edit Institute data": "Add Institute"}
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
          <Input />
        </Form.Item>
        <Form.Item label="About" name="about" rules={[{ required: false }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.List name="faculty">
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
                  Add Faculty
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

export default AddInstituteForm;

const FullWidthButton = styled(Button)`
  width: 100%;
`