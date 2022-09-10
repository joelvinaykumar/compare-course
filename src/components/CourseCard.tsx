import React from "react"
import styled from "styled-components"
import { Typography } from "antd";

import theme from "../utils/theme";

type CourseCardProps = {

}

const CourseCard: React.FC<CourseCardProps> = () => {

  const data = ["CopyWriting", "Online Learning", "Course Writing"]

  return (
    <CardContainer>
      <CoverImage src="https://sarahcordiner.com/wp-content/uploads/2019/10/YouTube-Thumbnail.png" />
      <Title strong>How to create your beginner online course | Step 3</Title>
      <Views type="secondary">10.7k reviwed this course</Views>
      <Views>{data?.join(", ")}</Views>
    </CardContainer>
  )
};

export default CourseCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  `
const CoverImage = styled.img`
  border-radius: 10px;
  filter: drop-shadow(1px 5px 12px ${theme.primaryRgba});
  margin-bottom: 10px;
`
  
const Title = styled(Typography.Text)`
  font-size: 12px;
  padding: 2px;
`

const Views = styled(Typography.Text)`
  font-size: 11px;
  padding: 2px;
`