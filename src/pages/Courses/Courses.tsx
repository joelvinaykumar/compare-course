import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  List,
  Space,
  Slider,
  Typography,
  Tag,
  Avatar,
  Tooltip,
  Card,
} from "antd";
import {
  LikeFilled,
  EyeFilled,
  SearchOutlined,
  StarFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import FilterBox from "./components";
import { selectCourse, getCoursesAsync } from "../Admin/coursesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

type CoursesProps = {};

const Courses: React.FC<CoursesProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { courseData, status } = useAppSelector(selectCourse);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [classTypes, setClassTypes] = useState<string[]>([]);
  const [courseTypes, setCourseTypes] = useState<string[]>([]);
  const [categoryTypes, setCategoryTypes] = useState<string[]>([]);
  const loading = status === "loading";

  const classTypeOptions = ["Online", "Offline", "Hybrid"];

  const courseTypeOptions = [
    "Micro",
    "Short-Term",
    "Long-Term",
    "Self-Learning",
    "Live Classes",
  ];

  const categoryOptions = [
    "Data Science",
    "Marketing",
    "Coding",
    "Operations",
    "Finance",
    "Accounting",
    "Human Resources",
    "Placement Preparation",
  ];

  const clearAllFilters = () => {
    setSearchQuery("");
    setRating(5);
    setClassTypes([]);
    setCourseTypes([]);
    setCategoryTypes([]);
  };

  const IconText = ({ icon, text, key, color }: any) => (
    <Space>
      {React.createElement(icon, { style: { color } })}
      {text}
    </Space>
  );

  useEffect(() => {
    dispatch(getCoursesAsync());
  }, [dispatch]);

  return (
    <Container>
      <Sidebar>
        <Search
          placeholder="Search ..."
          suffix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputMode="search"
          allowClear
        />
        <Row
          justify="end"
          align="middle"
          style={{ marginBottom: 20, width: "90%" }}
        >
          <ClearBtn onClick={clearAllFilters}>
            Clear All Filters
            <DeleteOutlined />
          </ClearBtn>
        </Row>
        <Typography.Title level={5}>{`Filter by Rating`}</Typography.Title>
        <Typography.Text>{`Below ${rating}`}</Typography.Text>
        <Slider
          style={{ width: "80%" }}
          value={rating}
          onChange={(e: any) => setRating(e)}
          min={1}
          max={5}
        />
        <FilterBox
          title="Class Types"
          getter={classTypes}
          options={classTypeOptions}
          setter={setClassTypes}
        />
        <FilterBox
          title="Course Types"
          getter={courseTypes}
          options={courseTypeOptions}
          setter={setCourseTypes}
        />
        <FilterBox
          title="Category Types"
          getter={categoryTypes}
          options={categoryOptions}
          setter={setCategoryTypes}
        />
      </Sidebar>
      <Content>
        {classTypes && (
          <SelectedTagsArea>
            {classTypes.map((tag) => (
              <StyledTag
                key={tag}
                closable
                onClose={(e) => {
                  setClassTypes(classTypes.filter((c) => c !== tag));
                }}
              >
                {tag}
              </StyledTag>
            ))}
            {courseTypes.map((tag) => (
              <StyledTag
                key={tag}
                closable
                onClose={(e) => {
                  setCourseTypes(courseTypes.filter((c) => c !== tag));
                }}
              >
                {tag}
              </StyledTag>
            ))}
            {categoryTypes.map((tag) => (
              <StyledTag
                key={tag}
                closable
                onClose={(e) => {
                  setCategoryTypes(categoryTypes.filter((c) => c !== tag));
                }}
              >
                {tag}
              </StyledTag>
            ))}
          </SelectedTagsArea>
        )}
        <Row gutter={[40, 24]}>
          {courseData.map((item: any) => (
            <Col span={8}>
              <Card
                hoverable
                cover={<CardCover />}
                actions={[
                  <EyeFilled onClick={() => navigate("abcd")} />
                ]}
              >
                <Card.Meta
                  title={
                    <Space direction="vertical">
                      <Typography.Text strong>{item.title}</Typography.Text>
                      <Avatar.Group size="small" maxCount={3}>
                        <Tooltip title="Aziz Nasser">
                          <Avatar size="small" />
                        </Tooltip>
                        <Avatar size="small" />
                        <Avatar size="small" />
                        <Avatar size="small" />
                        <Avatar size="small" />
                      </Avatar.Group>
                    </Space>
                  }
                  description={
                    <Typography.Paragraph
                      type="secondary"
                      ellipsis={{ rows: 2 }}
                    >
                      {item.description}
                    </Typography.Paragraph>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Container>
  );
};

export default Courses;

const Container = styled.div`
  width: 100%;
  padding: 40px;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Sidebar = styled.div`
  width: 18%;
  left: 0;
`;

const Content = styled.div`
  width: 80%;
  left: 15%;
`;

const Search = styled(Input)`
  border-radius: 10px;
  margin-bottom: 15px;
  width: 90%;
`;
const ClearBtn = styled.a`
  color: red;
  cursor: pointer;
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 0 10px;
`;

const SelectedTagsArea = styled(Row)`
  margin-bottom: 20px;
`;

const StyledTag = styled(Tag)`
  font-size: 16px;
  padding: 4px 16px;
  margin-bottom: 10px;
  background-color: #cddafd;
  color: #1b263b;
  filter: drop-shadow(1px 1px 10px rgba(205, 218, 253, 1));
`;

const CardCover = styled.div`
  background-image: url("https://img-b.udemycdn.com/course/480x270/17782_50e2_14.jpg");
  background-size: cover;
  height: 150px;
  border-radius: 10px;
  transition: all 250ms ease-out;
  display: hidden;
  
  &:hover {
    display: visible;
    box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.5);
  }
`