import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { Row, Col, Typography } from "antd"

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCompanyByIdAsync, selectCompany } from "../Admin/companySlice";

type CourseDetailsProps = {

}

const CourseDetails: React.FC<CourseDetailsProps> = () => {

  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { instituteDetails, status, error } = useAppSelector(selectCompany)

  useEffect(() => {
    dispatch(getCompanyByIdAsync(String(id)))
  }, [])

  return (
    <Row justify="center">
      <CourseCover>
        
      </CourseCover>
    </Row>
  )
};

export default CourseDetails;


const CourseCover = styled(Row)`
  margin-top: 100px;
  border-radius: 20px;
  height: 250px;
  width: 95%;
  background-color: #173753;
`