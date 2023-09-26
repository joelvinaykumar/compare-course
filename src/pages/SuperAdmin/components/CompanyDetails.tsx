import React, { useEffect, useState } from "react";
import { Card, Avatar, Row, Col, Typography, Tabs, Empty } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Quill from "react-quill";
import styled from "styled-components";

import { getCompanyByIdAsync, selectCompany } from "../companySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import theme from "../../../utils/theme";
import { CourseCard, CustomButton } from "../../../components";
import { CourseForm } from "../../Admin/components";
import { getCoursesAsync, selectCourse } from "../../Admin/coursesSlice";
import { currentUser, USER_ROLES } from "../../../utils/constants";
import CompanyForm from "./CompanyForm";

type CompanyDetailsProps = {};

const CompanyDetails: React.FC<CompanyDetailsProps> = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { instituteDetails } = useAppSelector(selectCompany);
  const { courseData } = useAppSelector(selectCourse);

  const [courseFormVisible, setCourseFormVisible] = useState<boolean>(false);
  const [companyFormVisible, setCompanyFormVisible] = useState<boolean>(false);
  const openCourseForm = () => setCourseFormVisible(true);
  const closeCourseForm = () => setCourseFormVisible(false);
  const openCompanyForm = () => setCompanyFormVisible(true);
  const closeCompanyForm = () => setCompanyFormVisible(false);

  useEffect(() => {
    dispatch(getCompanyByIdAsync(String(id)));
    dispatch(getCoursesAsync({}));
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
                <EditIcon onClick={openCompanyForm} />
              </Typography.Title>
            </Col>
          </Row>
          <Tabs
            size="large"
            tabBarExtraContent={{
              right: currentUser?.role === USER_ROLES.ADMIN && (
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
              <StyledRow gutter={[40, 24]}>
                {courseData.map((course: any) => (
                  <Col span={6}>
                    <CourseCard
                      id={course?._id}
                      createdAt={course?.createdAt}
                      title={course.title}
                      tags={[course.class_type, course.type, course.mode]}
                      ratings={course?.ratings?.length}
                    />
                  </Col>
                ))}
              </StyledRow>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Reviews" key="reviews">
              <Empty description="No reviews at this time."/>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </CompanyInfoCard>
      {courseFormVisible && (
        <CourseForm open={courseFormVisible} onClose={closeCourseForm} />
      )}
      {companyFormVisible && (
        <CompanyForm data={instituteDetails} open={companyFormVisible} onClose={closeCompanyForm} />
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

const EditIcon = styled(EditFilled)`
  margin-left: 10px;
  font-size: 18px;
`