import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Col,
  Form,
  Input,
  Rate,
  Row,
  Select,
  Typography,
  Checkbox,
} from "antd";

import AuthContext from "../../utils/AuthContext";
import { CustomButton } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectReview, getCompaniesLiteAsync, getCoursesLiteAsync, addReviewAsync } from "./Review.slice";
import { REVIEW_KEY_CONSTANT } from "../../utils/constants";

type ReviewProps = {};

const Review: React.FC<ReviewProps> = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { institutePublicData, coursePublicData, error, status } = useAppSelector(selectReview);
  const { authenticated } = useContext(AuthContext);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false);
  const loading = status === 'loading';
  const company = Form.useWatch('company', form);
  const anonymous = Form.useWatch('anonymous', form);
  const self_declaration = Form.useWatch('self_declaration', form);

  const handleSubmit = (values: any) => {
    localStorage.setItem(REVIEW_KEY_CONSTANT, JSON.stringify(values))
    dispatch(addReviewAsync({
      ...values,
      anonymous: !!anonymous
    }));
    if(!error) {
      console.log(error);
      form.resetFields();
      localStorage.removeItem(REVIEW_KEY_CONSTANT);
    }
    setTimeout(() => {
      setSubmitBtnDisabled(true);
    }, 60*1000);
  };

  useEffect(() => {
    dispatch(getCompaniesLiteAsync())
  }, [dispatch])

  useEffect(() => {
    dispatch(getCoursesLiteAsync(company))
  }, [company, dispatch])

  return (
    <Container>
      <Typography.Title level={2}>
        <StarEmojiSpan>&#11088;</StarEmojiSpan>
        Rate a Course
      </Typography.Title>
      <Typography.Text>
        It'll just take a minute or two. Promise! You can stay completely
        anonymous.
      </Typography.Text>
      <StyledForm
        form={form}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        initialValues={
          authenticated? JSON.parse(String(localStorage.getItem(REVIEW_KEY_CONSTANT))) : {}
        }
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 8]}>
          <Col span={12} xs={24} lg={12}>
            <Form.Item
              name="company"
              label="Company"
              rules={[{ required: true }]}
            >
              <Select>
                {institutePublicData.map((value: any) => (
                  <Select.Option value={value?._id}>{value?.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} xs={24} lg={12}>
            <Form.Item
              name="course"
              label="Course"
              rules={[{ required: true, }]}
            >
              <Select disabled={!coursePublicData.length}>
                {coursePublicData.map((value: any) => (
                  <Select.Option value={value?._id}>{value?.title}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 8]}>
          <Col span={12} xs={24} lg={12}>
            <Form.Item name="pros" label="Pros" rules={[{ required: true }]}>
              <Input.TextArea allowClear />
            </Form.Item>
          </Col>
          <Col span={12} xs={24} lg={12}>
            <Form.Item name="cons" label="Cons" rules={[{ required: true }]}>
              <Input.TextArea allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="feedback"
          label="Feedback to Management"
          rules={[{ required: true }]}
        >
          <Input.TextArea allowClear />
        </Form.Item>
        <Row gutter={[24, 8]}>
          <Col span={5} xs={24} lg={5}>
            <Form.Item name="overall" label="Overall Rating">
              <StyledRate allowClear allowHalf />
            </Form.Item>
          </Col>
          <Col span={5} xs={24} lg={5}>
            <Form.Item name="content" label="Content">
              <StyledRate allowClear allowHalf />
            </Form.Item>
          </Col>
          <Col span={5} xs={24} lg={5}>
            <Form.Item name="placement" label="Placement Support">
              <StyledRate allowClear allowHalf />
            </Form.Item>
          </Col>
          <Col span={5} xs={24} lg={5}>
            <Form.Item name="faculty" label="Faculty Teaching">
              <StyledRate allowClear allowHalf />
            </Form.Item>
          </Col>
          <Col span={4} xs={24} lg={4}>
            <Form.Item name="doubt_solving" label="Doubt Solving">
              <StyledRate allowClear allowHalf />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="self_declaration" label="Self Declaration" valuePropName="checked" rules={[{ required: true }]}>
          <Checkbox>I pinky swear I've taken this course on my own!</Checkbox>
        </Form.Item>
        <Form.Item name="anonymous" label="I'm anonymous" valuePropName="checked" rules={[{ required: false }]}>
          <Checkbox defaultChecked={false}>Stay anonymous</Checkbox>
        </Form.Item>
        <CustomButton htmlType="submit" loading={loading} disabled={!self_declaration && submitBtnDisabled} width={20} type="primary">
          Submit my Review
        </CustomButton>
      </StyledForm>
    </Container>
  );
};

export default Review;

const Container = styled.div`
  padding: 50px;
  margin-top: 30px;
  min-height: 88vh;
`;

const StyledForm = styled(Form)`
  margin-top: 20px;
`;

const StarEmojiSpan = styled.span`
  font-size: 30px;
  margin-right: 10px;
`;

const StyledRate = styled(Rate)`
  font-size: 30px;
`;
