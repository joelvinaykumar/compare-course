import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Row, Typography, Space } from "antd"
import { SafetyCertificateOutlined,  } from "@ant-design/icons"
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { FcApproval, FcCustomerSupport, FcClock } from "react-icons/fc";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCourseByIdAsync, selectCourse } from "../Admin/coursesSlice";
import { CustomButton } from "../../components";
import { CourseForm } from "../Admin/components";


type CourseDetailsProps = {

}

const CourseDetails: React.FC<CourseDetailsProps> = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch()
  const { courseDetails } = useAppSelector(selectCourse)
  const [courseFormVisible, setCourseFormVisible] = useState(false);
  const openCourseForm = () => setCourseFormVisible(true);
  const closeCourseForm = () => setCourseFormVisible(false);

  const Font = ReactQuill.Quill.import('formats/font'); // <<<< ReactQuill exports it
  Font.whitelist = ['DM Sans'] ; // allow ONLY these fonts and the default
  ReactQuill.Quill.register(Font, true);

  const formatDate = (date: string, tag: string) => {
    return `${tag} on ${new Date(date).toLocaleString("en-US", {
      month: 'long',
      day: 'numeric',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric'
    })}`
  }

  useEffect(() => {
    dispatch(getCourseByIdAsync(String(id)))
  }, [id, dispatch])
  
  return (
    <Container>
      <Row justify="space-between">
        <Details>
          <Typography.Title>{courseDetails.title}</Typography.Title>
          <Space size={20}>
            <Space>
              <FcClock />
              <Typography.Text>{formatDate(courseDetails?.createdAt, "Created")}</Typography.Text>
            </Space>
            <Space>
              <FcClock />
              <Typography.Text>{formatDate(courseDetails?.updatedAt, "Last Updated")}</Typography.Text>
            </Space>
          </Space>
          <ReactQuill
            readOnly
            style={{ fontFamily: "DM Sans" }}
            value={courseDetails?.description}
            theme="bubble"
          />
        </Details>
        <CourseCard>
          <Cover src={require("../../assets/CardCover.png")}/>
          <Space direction="vertical" size={15}>
            <Space>
              <ClockIcon />
              <CardSubTitle>30 hours of content</CardSubTitle>
            </Space>
            <Space>
              <ApprovalIcon />
              <CardSubTitle>Certificate Provided</CardSubTitle>
            </Space>
            <Space>
              <SupportIcon />
              <CardSubTitle>Online Support</CardSubTitle>
            </Space>
          </Space>
            <CustomButton
              block
              type="primary"
              onClick={openCourseForm}
            >
              Edit
            </CustomButton>
        </CourseCard>
      </Row>
      {courseFormVisible && (
        <CourseForm
          open={courseFormVisible}
          onClose={closeCourseForm}
          data={courseDetails}
      />)}
    </Container>
  )
};

export default CourseDetails;

const Container = styled.div`
  min-height: 89vh;
  margin-top: 100px;
  padding: 30px;
`

const CourseCard = styled.div`
  border-radius: 20px;
  padding: 20px;
  height: 550px;
  width: 450px;
  background-color: #fff;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
`

const Details = styled.div`

`

const Cover = styled.img`
  border-radius: 20px;
  width: 100%;
  margin-bottom: 20px;
`

const CardSubTitle = styled(Typography.Text)`
  font-size: 18px;
`

const ApprovalIcon = styled(FcApproval)`
  font-size: 28px;
`

const SupportIcon = styled(FcCustomerSupport)`
  font-size: 28px;
`

const ClockIcon = styled(FcClock)`
  font-size: 28px;
`