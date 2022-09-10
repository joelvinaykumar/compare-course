import React from "react";
import styled from "styled-components";
import { Input, Typography, Row, Col, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { SuperAdmin } from "../../pages";
import { CarouselCard } from "../../components";
import { currentUser, USER_ROLES } from "../../utils/constants";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  if (currentUser?.role === USER_ROLES.SUPER_ADMIN) {
    return <SuperAdmin />;
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
        <Row gutter={[40, 8]}>
          {new Array(4).fill(0).map((_) => (
            <StyledCol span={6}>
              <CarouselCard />
            </StyledCol>
          ))}
        </Row>
      </StyledRow>
      <StyledRow align="top">
        <Space align="baseline">
          <Typography.Title level={3}>Data Science courses</Typography.Title>
          <Typography.Link>See More</Typography.Link>
        </Space>
        <Row gutter={[40, 8]}>
          {new Array(4).fill(0).map((_) => (
            <StyledCol span={6}>
              <CarouselCard />
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
  margin-bottom: 30px;
  flex-direction: column;
`;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
`;
