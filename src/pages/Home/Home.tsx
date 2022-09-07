import React from "react";
import styled from "styled-components";
import { Input, Typography, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { SuperAdmin } from "../../pages"
import { currentUser, USER_ROLES } from "../../utils/constants";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  if(currentUser?.role === USER_ROLES.SUPER_ADMIN) {
    return <SuperAdmin />
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
        <Text strong>Discover best courses.</Text>
        <SubText>Competetive Exams. Courses. Certifications.</SubText>
      </SearchContainer>

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

