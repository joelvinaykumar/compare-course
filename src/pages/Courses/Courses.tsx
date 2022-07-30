import React, { useEffect, useState } from "react";
import {
  Row, Input, List, Space, Rate, Slider,
  Typography, Tag, Comment, Avatar, Form, Button
} from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  SearchOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import FilterBox from "./components";
import {
  selectCourse,
  getCoursesAsync
} from "../Admin/Courses.slice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"

type CoursesProps = {};

const Courses: React.FC<CoursesProps> = () => {
  
  const dispatch = useAppDispatch()
  const { courseData, status } = useAppSelector(selectCourse)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [classTypes, setClassTypes] = useState<string[]>([]);
  const [showComments, setShowComments] = useState<boolean>(true);
  const [comment, setComment] = useState<string>("");
  const loading = status === "loading"

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

  const Editor = () => (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={() => {}}
      onFinishFailed={() => {}}
    >
      <Form.Item>
        <Input.TextArea
          rows={1}
          onChange={e => setComment(e.target.value)}
          value={comment}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={loading}
          type="primary"
          size="small"
        >
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );

  const IconText = ({ icon, text, onClick }: any) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  useEffect(() => {
    dispatch(getCoursesAsync())
  }, []);

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
          <ClearBtn>
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
          options={classTypeOptions}
          setter={setClassTypes}
        />
        <FilterBox
          title="Course Types"
          options={courseTypeOptions}
          setter={setClassTypes}
        />
        <FilterBox
          title="Category Types"
          options={categoryOptions}
          setter={setClassTypes}
        />
      </Sidebar>
      <Content>
        {classTypes && (
          <SelectedTagsArea>
            {classTypes.map((classType) => (
              <StyledTag
                key={classType}
                onClose={(e) => {
                  e.stopPropagation();
                  console.log(e);
                }}
              >
                {classType}
              </StyledTag>
            ))}
          </SelectedTagsArea>
        )}
        <List
          itemLayout="vertical"
          size="large"
          dataSource={courseData}
          renderItem={(item: any) => (
            <List.Item
              key={item.title}
              style={{
                backgroundColor: "white",
                marginBottom: 10,
                borderRadius: 10,
              }}
              actions={[
                <IconText
                  icon={StarOutlined}
                  text="156"
                  key="list-vertical-star-o"
                />,
                <IconText
                  icon={LikeOutlined}
                  text="156"
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={MessageOutlined}
                  text="2"
                  key="list-vertical-message"
                  onClick={() => setShowComments(show => !show)}
                />,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                title={
                  <a href={item.href}>
                    {item.title}<br />
                    <Rate allowHalf disabled count={5} value={4} />
                  </a>
                }
                description={item.description}
              />
              {item.content}
              <Editor />
              {showComments && (
                <Comment
                  author={<a>Han Solo</a>}
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                  content={
                    <p>
                      We supply a series of design principles, practical patterns and high quality design
                    </p>
                  }
                  datetime={new Date().toUTCString()}
                />
              )}             
            </List.Item>
          )}
        />
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
`;
