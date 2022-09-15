import React, { useEffect, useState } from "react";
import { Card, Avatar, Row, Col, Typography, Tabs } from "antd";
import { useParams } from "react-router-dom";
import Quill from "react-quill";
import styled from "styled-components";

import { getCompanyByIdAsync, selectCompany } from "../companySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import theme from "../../../utils/theme";
import { CourseCard, CustomButton } from "../../../components";
import { CourseForm } from "../../Admin/components";
import { getCoursesAsync, selectCourse } from "../../Admin/coursesSlice";

type CompanyDetailsProps = {};

const CompanyDetails: React.FC<CompanyDetailsProps> = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { instituteDetails } = useAppSelector(selectCompany);
  const { courseData } = useAppSelector(selectCourse);

  const [courseFormVisible, setCourseFormVisible] = useState(false);
  const openCourseForm = () => setCourseFormVisible(true);
  const closeCourseForm = () => setCourseFormVisible(false);

  useEffect(() => {
    dispatch(getCompanyByIdAsync(String(id)));
    dispatch(getCoursesAsync());
  }, [dispatch, id]);

  return (
    <Container>
      <CompanyInfoCard>
        <Card
          loading={false}
          cover={
            <img
              alt="company cover iamge"
              src={require("../../../assets/CoverImg.png")}
            />
          }
        >
          <Card.Meta
            avatar={
              instituteDetails?.companyLogo ? (
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  src={require("../../../assets/logo.png")}
                />
              ) : (
                <StyledAvatar
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                >
                  {instituteDetails?.name &&
                    instituteDetails?.name
                      ?.split(" ")
                      ?.map((s: string) => s?.[0])
                      .join("")}
                </StyledAvatar>
              )
            }
          />
          <Row>
            <Col span={2} />
            <Col span={19}>
              <Typography.Title level={3}>
                {instituteDetails?.name}
              </Typography.Title>
            </Col>
          </Row>
          <Tabs
            size="large"
            tabBarExtraContent={{
              right: (
                <CustomButton type="primary" onClick={openCourseForm}>
                  Add a course
                </CustomButton>
              ),
            }}
          >
            <Tabs.TabPane tab="About" key="about">
              <About>
                <Quill
                  readOnly
                  value={instituteDetails?.about}
                  theme="bubble"
                />
              </About>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Courses" key="courses" active>
              <StyledRow gutter={[24, 32]}>
                {courseData.map((course: any) => (
                  <StyledCol span={6}>
                    <CourseCard
                      id={course?._id}
                      title={course.title}
                      tags={[course.class_type, course.type, course.mode]}
                      ratings={course?.ratings?.length}
                    />
                  </StyledCol>
                ))}
              </StyledRow>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Reviews" key="reviews"></Tabs.TabPane>
          </Tabs>
        </Card>
      </CompanyInfoCard>
      {courseFormVisible && (
        <CourseForm open={courseFormVisible} onClose={closeCourseForm} />
      )}
    </Container>
  );
};

export default CompanyDetails;

const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CompanyInfoCard = styled.div`
  width: 95%;
  margin-bottom: 15px;
  filter: drop-shadow(1px 1px 12px rgba(29, 51, 84, 0.1));
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${theme.secondary};
  margin-top: -60px;
  border: 3px solid #eee;
`;

const About = styled.div`
  width: 70%;
`;

const StyledRow = styled(Row)`
  padding: 30px 0;
`;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
`;
