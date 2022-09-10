import React from "react"
import styled from "styled-components"
import { Typography } from "antd";

import theme from "../utils/theme";

type CarouselCardProps = {

}

const CarouselCard: React.FC<CarouselCardProps> = () => {
  return (
    <CardContainer imageSource={"https://sarahcordiner.com/wp-content/uploads/2019/10/YouTube-Thumbnail.png"}>
      <Title strong>How to create your beginner online course | Step 3</Title>
      <Views>10.7k reviwed this course</Views>
    </CardContainer>
  )
};

export default CarouselCard;

const CardContainer = styled.div<{ imageSource: string }>`
  display: flex;
  flex-direction: column;
  height: 150px;
  width: 280px;
  border-radius: 10px;
  cursor: pointer;
  background: linear-gradient(to bottom, rgba(61, 61, 61, 0.2), #444), url("${props => props.imageSource}");
  background-size: cover;
  filter: drop-shadow(1px 5px 12px ${theme.primaryRgba});

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease;
  }
`
  
const Title = styled(Typography.Text)`
  font-size: 14px;
  padding: 2px;
  position: relative;
  top: 80px;
  color: white;
  padding: 0 10px;
  `
  
  const Views = styled(Typography.Text)`
  font-size: 11px;
  padding: 2px;
  position: relative;
  top: 80px;
  color: white;
  padding: 0 10px;
`