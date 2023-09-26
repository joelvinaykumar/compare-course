import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Typography,
  Space,
  Avatar,
  PageHeader,
  Button,
  Tabs,
  TabsProps,
} from "antd";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import {
  FcApproval,
  FcCustomerSupport,
  FcClock,
  FcMoneyTransfer,
} from "react-icons/fc";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCourseByIdAsync, selectCourse } from "../Admin/coursesSlice";
import { CustomButton, Reviews, Locked } from "../../components";
import { CourseForm } from "../Admin/components";
import { currentUser, getAvatarUrl, USER_ROLES } from "../../utils/constants";
import AuthContext from "../../utils/AuthContext";

type CourseDetailsProps = {};

type Instructor = {
  name: string;
  picture?: string;
};

const CourseDetails: React.FC<CourseDetailsProps> = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);
  const { courseDetails } = useAppSelector(selectCourse);
  const [courseFormVisible, setCourseFormVisible] = useState(false);
  const openCourseForm = () => setCourseFormVisible(true);
  const closeCourseForm = () => setCourseFormVisible(false);

  const Font = ReactQuill.Quill.import("formats/font"); // <<<< ReactQuill exports it
  Font.whitelist = ["DM Sans"]; // allow ONLY these fonts and the default
  ReactQuill.Quill.register(Font, true);

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });

  const goBack = () => navigate(-1);

  const items: TabsProps["items"] = [
    {
      key: "about",
      label: "About",
      children: authenticated? (
        <Details>
          <Space size={20}>
            <Space>
              <FcClock />
              <Typography.Text type="secondary">
                Created on {formatDate(courseDetails?.createdAt)}
              </Typography.Text>
            </Space>
            <Space>
              <FcClock />
              <Typography.Text type="secondary">
                Last updated on {formatDate(courseDetails?.updatedAt)}
              </Typography.Text>
            </Space>
          </Space>
          {courseDetails?.instructors?.length > 0 && (
            <Space>
              <Typography.Text type="secondary">Instructors</Typography.Text>
              <Avatar.Group>
                {courseDetails?.instructors?.map((instructor: Instructor) => (
                  <Avatar
                    src={instructor?.picture || getAvatarUrl(instructor?.name)}
                  />
                ))}
              </Avatar.Group>
            </Space>
          )}
          <ReactQuill
            readOnly
            style={{ fontFamily: "DM Sans", width: "90%", marginTop: 15 }}
            value={courseDetails?.description}
            theme="bubble"
          />
          <Typography.Title level={3}>Syllabus</Typography.Title>
          <ul>
            {courseDetails?.curricuulum?.map((point: string) => (
              <li>{point}</li>
            ))}
          </ul>
        </Details>
      ): (<Locked />),
    },
    {
      key: "reviews",
      label: "Reviews",
      children: authenticated? <Reviews type="course" id={id} />: <Locked />,
    },
  ];

  useEffect(() => {
    dispatch(getCourseByIdAsync(String(id)));
  }, [id, dispatch, courseDetails?.description]);

  return (
    <Container>
      <PageHeader
        title={<Typography.Title>{courseDetails.title}</Typography.Title>}
        extra={[
          <Button shape="round" onClick={goBack}>
            Back
          </Button>,
        ]}
      />
      <Row justify="space-between">
        <Tabs
          size="large"
          defaultActiveKey="reviews"
          items={items}
          onChange={(key) => console.log(key)}
          style={{width: '60%'}}
        />
        <CourseCard>
          <Cover
            src={
              courseDetails?.thumbnail || require("../../assets/CardCover.png")
            }
          />
          <Space direction="vertical" size={15}>
            <Space align="start">
              <MoneyIcon />
              <CardSubTitle>&#x20b9; {courseDetails?.price}</CardSubTitle>
            </Space>
            <Space>
              <ClockIcon />
              <CardSubTitle>
                {courseDetails?.no_of_hours} hours of content
              </CardSubTitle>
            </Space>
            {courseDetails?.provides_certificate ? (
              <Space>
                <ApprovalIcon />
                <CardSubTitle>Certificate Provided</CardSubTitle>
              </Space>
            ) : null}
            {courseDetails?.provides_support ? (
              <Space>
                <SupportIcon />
                <CardSubTitle>1:1 Support</CardSubTitle>
              </Space>
            ) : null}
          </Space>
          {currentUser?.role === USER_ROLES.ADMIN && (
            <CustomButton block type="primary" onClick={openCourseForm}>
              Edit
            </CustomButton>
          )}
        </CourseCard>
      </Row>
      {courseFormVisible && (
        <CourseForm
          open={courseFormVisible}
          onClose={closeCourseForm}
          data={courseDetails}
        />
      )}
    </Container>
  );
};

export default CourseDetails;

const Container = styled.div`
  margin-top: 50px;
  padding: 30px 50px;
  min-height: 83vh;
`;

const CourseCard = styled.div`
  border-radius: 20px;
  padding: 20px;
  height: 550px;
  width: 450px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  filter: drop-shadow(1px 5px 12px rgba(0, 0, 0, 0.1));
  position: sticky;
  top: 140px;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Cover = styled.img`
  border-radius: 20px;
  width: 100%;
  margin-bottom: 20px;
`;

const CardSubTitle = styled(Typography.Text)`
  font-size: 18px;
`;

const MoneyIcon = styled(FcMoneyTransfer)`
  font-size: 28px;
`;

const ApprovalIcon = styled(FcApproval)`
  font-size: 28px;
`;

const SupportIcon = styled(FcCustomerSupport)`
  font-size: 28px;
`;

const ClockIcon = styled(FcClock)`
  font-size: 28px;
`;
