import React, { useEffect } from "react";
import styled from "styled-components";
import { Input, Typography, Row, Col, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { SuperAdmin, Admin } from "../../pages";
import { CarouselCard } from "../../components";
import { currentUser, USER_ROLES } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getHomeCoursesAsync, selectCourse } from "../Admin/coursesSlice";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const { homeCoursesData } = useAppSelector(selectCourse);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  useEffect(() => {
    dispatch(getHomeCoursesAsync())
  }, [dispatch]);

  if (currentUser?.role === USER_ROLES.SUPER_ADMIN) {
    return <SuperAdmin />;
  }

  if (currentUser?.role === USER_ROLES.ADMIN) {
    return <Admin />;
  }

  return (
    <Row justify="center">
      <SearchContainer>
        <Search
          autoFocus
          placeholder="Search online, offline courses ..."
          suffix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputMode="search"
          size="large"
          allowClear
        />
        <Text strong>Discover the best of best courses.</Text>
        <SubText>Competetive Exams. Courses. Certifications.</SubText>
      </SearchContainer>
      <StyledRow align="top">
        <Space align="baseline">
          <Typography.Title level={3}>Data Science courses</Typography.Title>
          <Typography.Link>See More</Typography.Link>
        </Space>
        <Row gutter={[40, 8]} style={{width: '100%'}}>
          {[...homeCoursesData].map((course) => (
            <StyledCol span={6}>
              <CarouselCard {...course} />
            </StyledCol>
          ))}
        </Row>
      </StyledRow>
      <StyledRow align="top">
        <Space align="baseline">
          <Typography.Title level={3}>Fullstack Development courses</Typography.Title>
          <Typography.Link>See More</Typography.Link>
        </Space>
        <Row gutter={[40, 8]} style={{width: '100%'}}>
          {homeCoursesData.map((course) => (
            <StyledCol span={6}>
              <CarouselCard {...course} />
            </StyledCol>
          ))}
        </Row>
      </StyledRow>
    </Row>
  );
};

export default Home;

const SearchContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 60px;
  background-color: #173753;
  align-content: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Search = styled(Input)`
  width: 50%;
  border-radius: 10px;
  margin-bottom: 15px;
  filter: drop-shadow(1px 10px 10px rgba(255, 255, 255, 0.2));
`;

const Text = styled(Typography.Text)`
  color: white;
  font-size: 18px;
`;

const SubText = styled(Typography.Text)`
  color: white;
  font-size: 14px;
`;

const StyledRow = styled(Row)`
  margin-top: 50px;
  width: 80%;
  margin-bottom: 30px;
  flex-direction: column;
`;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
`;
