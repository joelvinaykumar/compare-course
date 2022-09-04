import React from "react";
import { Drawer, Form, Input, Space, Button, Select, Row, Col } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

import {
  createCourseAsync,
  updateCourseAsync,
  getCoursesAsync,
  selectCourse
} from "../coursesSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

type AddCourseFormProps = {
  open: boolean;
  onClose: () => void;
  data: any;
};

const AddCourseForm: React.FC<AddCourseFormProps> = ({
  open,
  onClose,
  data = null,
}) => {

  const dispatch = useAppDispatch()
  const { status } = useAppSelector(selectCourse)
  const loading = status === "loading"

  const classTypeOptions = [
    "Online",
    "Offline",
    "Hybrid"
  ]

  const typeOptions = [
    "Certifications/Upskill",
    "CompetetiveExams"
  ]

  const modeOptions = [
    "Micro",
    "Short-Term",
    "Long-Term",
    "Self-Learning",
    "Live-Classes"
  ]

  const handleSubmit = async (values: any) => {
    const input = {
      ...values,
      curricuulum: values?.curricuulum?.map((item: any) => item.point) || [],
      instructor: values?.instructor?.map((f: any) => ({ name: f.name, picture: f.picture })) || [],
    }
    if (data) {
      await dispatch(updateCourseAsync({ id: data?._id, input }))
      dispatch(getCoursesAsync())
    } else {
      dispatch(createCourseAsync(input))
    }
  };

  const handleSubmitFailed = () => {};

  return (
    <Drawer
      visible={open}
      onClose={onClose}
      width={800}
      placement="right"
      title={data? "Edit Course data": "Add Course"}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        initialValues={{ ...data, remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: false }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Class Type" name="class_type" rules={[{ required: false }]}>
          <Select>
            {classTypeOptions.map(option => (
              <Select.Option value={option}>{option}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[{ required: false }]}>
          <Select>
            {typeOptions.map(option => (
              <Select.Option value={option}>{option}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Mode" name="mode" rules={[{ required: false }]}>
          <Select>
            {modeOptions.map(option => (
              <Select.Option value={option}>{option}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Link" name="link" rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        <Form.List name="curricuulum" initialValue={[]}>
          {(fields, { add, remove }) => (
            <Row>
              {fields.map(({ key, name, ...restField }) => {
                const removeFormItem = () => remove(name);
                return (
                  <Col span={24}>
                    <Space key={key} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, "point"]}
                        rules={[{ required: true, message: "Missing name" }]}
                      >
                        <Input placeholder="This course helps with..." />
                      </Form.Item>
                      <MinusCircleOutlined onClick={removeFormItem} />
                    </Space>
                  </Col>
                );
              })}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={add}
                  block
                  icon={<PlusOutlined />}
                >
                  Add syllabus in curricuulum
                </Button>
              </Form.Item>
            </Row>
          )}
        </Form.List>
        <Form.List name="instructor">
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
                  Add Instructor
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

export default AddCourseForm;

const FullWidthButton = styled(Button)`
  width: 100%;
`