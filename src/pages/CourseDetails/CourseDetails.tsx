import React from "react"
import styled from "styled-components"
import { Row } from "antd"


type CourseDetailsProps = {

}

const CourseDetails: React.FC<CourseDetailsProps> = () => {

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