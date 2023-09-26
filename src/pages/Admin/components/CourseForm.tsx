import React, { useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Steps,
  Checkbox,
  InputNumber,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Quill from "react-quill";

import {
  createCourseAsync,
  updateCourseAsync,
  getCoursesAsync,
  selectCourse,
} from "../coursesSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { currentUser } from "../../../utils/constants";

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
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectCourse);
  const loading = status === "loading";
  const [step, setStep] = useState(0);

  const handleStepChange = (step: number) => setStep(step);

  const classTypeOptions = ["Online", "Offline", "Hybrid"];

  const typeOptions = ["Certifications/Upskill", "CompetetiveExams"];

  const modeOptions = [
    "Micro",
    "Short-Term",
    "Long-Term",
    "Self-Learning",
    "Live-Classes",
  ];

  const handleSubmit = async (values: any) => {
    const input = {
      ...values,
      curricuulum: (values?.curricuulum || [])?.map((item: any) => item.point),
      company: currentUser?.organization?._id
    };
    
    if (data) {
      await dispatch(updateCourseAsync({ id: data?._id, input }));
    } else {
      dispatch(createCourseAsync(input));
      setTimeout(() => dispatch(getCoursesAsync({})), 600);
    }
    onClose();
  };

  const handleSubmitFailed = () => {};

  return (
    <Drawer
      visible={open}
      onClose={onClose}
      width={800}
      placement="right"
      title={data ? "Edit Course data" : "Add Course"}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        initialValues={{
          ...data,
          curricuulum: data?.curricuulum?.map((point: string) => ({ point })),
          remember: true,
        }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
      >
        <StyledStepper size="small" current={step} onChange={handleStepChange}>
          <Steps.Step title="Basic" />
          <Steps.Step title="Advanced" />
        </StyledStepper>
        {step === 0 && (
          <>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: false }]}
            >
              <Quill theme="snow" />
            </Form.Item>
            <Form.Item
              label="Class Type"
              name="class_type"
              rules={[{ required: false }]}
            >
              <Select>
                {classTypeOptions.map((option) => (
                  <Select.Option value={option}>{option}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Type" name="type" rules={[{ required: true }]}>
              <Select>
                {typeOptions.map((option) => (
                  <Select.Option value={option}>{option}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Mode" name="mode" rules={[{ required: true }]}>
              <Select>
                {modeOptions.map((option) => (
                  <Select.Option value={option}>{option}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Link" name="link" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Thumbnail" name="thumbnail" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </>
        )}
        {step === 1 && (
          <>
          <Row>
            <Col span={12}>
              <Form.Item label="Price" name="price" rules={[{ required: false }]}>
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Hours of Content"
                name="no_of_hours"
                rules={[{ required: false }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
            <Form.Item
              name="provides_certificate"
              valuePropName="checked"
              rules={[{ required: false }]}
            >
              <Checkbox children="Is Certificate Provided ?" />
            </Form.Item>
            <Form.Item
              name="provides_support"
              valuePropName="checked"
              rules={[{ required: false }]}
            >
              <Checkbox children="Is Support Provided ?" />
            </Form.Item>
            <Form.List name="curricuulum" initialValue={[]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, i: number) => {
                    const removeFormItem = () => remove(name);
                    return (
                      <Row key={name.toString()} align="middle">
                        <Col span={22}>
                          <Form.Item
                            {...restField}
                            label={`Syllabus point ${i + 1}`}
                            name={[name, "point"]}
                            rules={[
                              { required: true, message: "Missing name" },
                            ]}
                          >
                            <Input placeholder={`Syllabus item ${i + 1}`} />
                          </Form.Item>
                        </Col>
                        <Col span={2}>
                          <StyledMinusIcon onClick={removeFormItem} />
                        </Col>
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
            <Form.List name="instructors" initialValue={[]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, i: number) => {
                    const removeFormItem = () => remove(name);
                    return (
                      <Row key={name.toString()} align="middle">
                        <Col span={22}>
                          <Form.Item
                            {...restField}
                            label={`Instructor ${i + 1}`}
                            name={[name, "name"]}
                            rules={[
                              { required: true, message: "Missing name" },
                            ]}
                          >
                            <Input placeholder="Name" />
                          </Form.Item>
                        </Col>
                        <Col span={2}>
                          <StyledMinusIcon onClick={removeFormItem} />
                        </Col>
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
                      Add Instructor
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
        )}
        <FullWidthButton type="primary" htmlType="submit" loading={loading}>
          {data? "Update": "Submit"}
        </FullWidthButton>
      </Form>
    </Drawer>
  );
};

export default CourseForm;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

const StyledStepper = styled(Steps)`
  width: 60%;
  margin: 0 auto 30px auto;
`;

const StyledMinusIcon = styled(MinusCircleOutlined)`
  margin-left: 10px;
`;
