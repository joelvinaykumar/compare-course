import React, { useState } from "react";
import {
  Drawer, Form, Input, Space, Button, Select,
  Row, Col, Steps,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Quill from "react-quill";

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
  data?: any;
};

const CourseForm: React.FC<AddCourseFormProps> = ({
  open,
  onClose,
  data = null,
}) => {

  const dispatch = useAppDispatch()
  const { status } = useAppSelector(selectCourse)
  const loading = status === "loading"
  const [step, setStep] = useState(0)

  const handleStepChange = (step: number) => setStep(step)

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
    } else {
      dispatch(createCourseAsync(input))
      setTimeout(() => dispatch(getCoursesAsync()), 600)
    }
    onClose()
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
        <StyledStepper size="small" current={step} onChange={handleStepChange}>
          <Steps.Step title="Basic" />
          <Steps.Step title="Advanced" />
        </StyledStepper>
        {step===0 && (
          <>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: false }]}>
              <Quill theme="snow" />
            </Form.Item>
            <Form.Item label="Class Type" name="class_type" rules={[{ required: false }]}>
              <Select>
                {classTypeOptions.map(option => (
                  <Select.Option value={option}>{option}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Type" name="type" rules={[{ required: true }]}>
              <Select>
                {typeOptions.map(option => (
                  <Select.Option value={option}>{option}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Mode" name="mode" rules={[{ required: true }]}>
              <Select>
                {modeOptions.map(option => (
                  <Select.Option value={option}>{option}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </>
        )}
        {step===1 && (
          <>
            <Form.Item label="Link" name="link" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.List name="curricuulum" initialValue={[]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, i: number) => {
                    const removeFormItem = () => remove(name);
                    return (
                        <Row key={name.toString()}>
                          <Col span={22}>
                            <Form.Item
                              {...restField}
                              name={[name, "point"]}
                              rules={[{ required: true, message: "Missing name" }]}
                            >
                              <Input placeholder={`Syllabus item ${i+1}`} />
                            </Form.Item>
                          </Col>
                            <StyledMinusIcon onClick={removeFormItem} />

                        </Row>
                    );
                  })}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={add}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Syllabus in Curriculum
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.List name="instructor" initialValue={[]}>
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
                        <StyledMinusIcon onClick={removeFormItem} />
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
          </>
        )}
        <FullWidthButton  type="primary" htmlType="submit" loading={loading}>
          {data? "Update": "Submit"}
        </FullWidthButton>
      </Form>
    </Drawer>
  );
};

export default CourseForm;

const FullWidthButton = styled(Button)`
  width: 100%;
`

const StyledStepper = styled(Steps)`
  width: 60%;
  margin: 0 auto 30px auto;
`;

const StyledMinusIcon = styled(MinusCircleOutlined)`
  margin-left: 10px;
`;