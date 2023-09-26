import React from "react"
import styled from "styled-components"
import { Typography } from "antd";

import theme from "../utils/theme";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes.enum";

type CarouselCardProps = {
  _id: string,
  title: string,
  thumbnail: string,
  ratings: string[],
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  _id,
  title,
  thumbnail,
  ratings
}) => {
  const navigate = useNavigate()

  const handleNavigate = () => navigate(`../../${ROUTES.COURSE}/${_id}`)

  return (
    <CardContainer
      imageSource={thumbnail || require("../assets/CardCover.png")}
      onClick={handleNavigate}
    >
      <Title strong>{title}</Title>
      <Views>{ratings.length} reviwed this course</Views>
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
    transition: all 0.3s ease-out;
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