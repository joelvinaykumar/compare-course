import React, { useCallback, useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  Slider,
  Typography,
  Tag,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import FilterBox from "./components";
import { selectCourse, getCoursesAsync } from "../Admin/coursesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CourseCard } from "../../components";
import { debounce } from "lodash";

type CoursesProps = {};

const Courses: React.FC<CoursesProps> = () => {
  const dispatch = useAppDispatch();
  const { courseData, status } = useAppSelector(selectCourse);
  const loading = status === "loading"

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [types, setTypes] = useState<string[]>([]);
  const [classTypes, setClassTypes] = useState<string[]>([]);
  const [courseTypes, setCourseTypes] = useState<string[]>([]);
  const [categoryTypes, setCategoryTypes] = useState<string[]>([]);

  const typeOptions = ["Certifications/Upskill", "CompetetiveExams"];
  
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

  const debouncedSearch = useCallback(
    debounce((text) => {
      dispatch(getCoursesAsync({
        rating,
        type: types,
        classType: classTypes,
        mode: courseTypes,
        title: text,
      }))
    }, 600)  
  , [classTypes, courseTypes, dispatch, rating, types]);

  useEffect(() => {
    dispatch(getCoursesAsync({
      rating,
      type: types,
      classType: classTypes,
      mode: courseTypes,
    }));
  }, [dispatch, rating, types, classTypes, courseTypes]);

  return (
    <Container>
      <Sidebar>
        <Search
          placeholder="Search ..."
          suffix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            debouncedSearch(e.target.value)
          }}
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
          title="Types"
          getter={types}
          options={typeOptions}
          setter={setTypes}
        />
        <FilterBox
          title="Class Types"
          getter={classTypes}
          options={classTypeOptions}
          setter={setClassTypes}
        />
        <FilterBox
          title="Course Mode"
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
            {types.map((tag) => (
              <StyledTag
                key={tag}
                closable
                onClose={() => {
                  setTypes(types.filter((c) => c !== tag));
                }}
              >
                {tag}
              </StyledTag>
            ))}
            {classTypes.map((tag) => (
              <StyledTag
                key={tag}
                closable
                onClose={() => {
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
                onClose={() => {
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
                onClose={() => {
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
            <Col span={6}>
              <CourseCard
                id={item?._id}
                loading={loading}
                createdAt={item?.createdAt}
                title={item?.title}
                ratings={item?.ratings?.length}
                tags={[item?.type, item?.class_type, item?.mode]}
                key={item?._id}
              />
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
