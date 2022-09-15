import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes.enum";


type CourseCardProps = {
  id:string,
  title: string,
  tags: string[],
  ratings: number,
  cover?: string,
};

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  ratings,
  tags,
  cover = require("../assets/CardCover.png")
}) => {
  const navigate = useNavigate()

  const renderTags= () => {
    if(tags?.length === 0) return "No reviews"
    else if (tags?.length <= 3) return tags?.join(", ")
    else return tags?.slice(0, 3)?.join(", ") + (tags?.length>3 && `and ${tags?.length - 3} more`)
  }

  const handleNavigate = () => navigate(`../../${ROUTES.COURSE}/${id}`)

  return (
    <CardContainer onClick={handleNavigate}>
      {!!cover && <CoverImage src={cover} />}
      <Title strong>{title}</Title>
      <Views type="secondary">{Number(ratings)} reviwed this course</Views>
      <Views>{renderTags()}</Views>
    </CardContainer>
  );
};

export default CourseCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  cursor: pointer;

  &:hover {
    scale: 1.1;
    transition: all 0.2s ease;
  }
`;

const CoverImage = styled.img`
  border-radius: 10px;
  filter: drop-shadow(1px 5px 12px rgba(0, 0, 0, 0.2));
  margin-bottom: 10px;

  &:hover {
    filter: drop-shadow(1px 5px 12px rgba(0, 0, 0, 0.1));
  }
`;

const Title = styled(Typography.Text)`
  font-size: 12px;
  padding: 2px;
`;

const Views = styled(Typography.Text)`
  font-size: 11px;
  padding: 2px;
`;
