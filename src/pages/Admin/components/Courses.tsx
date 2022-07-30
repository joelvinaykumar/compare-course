import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Row,
  Table,
  Button,
  PageHeader,
  Avatar,
  Space,
  Popconfirm,
  Tooltip,
  Typography,
  TableColumnsType
} from "antd";
import { PlusCircleFilled, EditFilled, DeleteFilled } from "@ant-design/icons";

import AddCourseForm from "./AddCourseForm";
import {
  deleteCourseAsync,
  getCoursesAsync,
  selectCourse,
} from "../Courses.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import theme from "../../../utils/theme";

type CoursesProps = {};

const Courses: React.FC<CoursesProps> = () => {
  const dispatch = useAppDispatch();
  const { courseData, status } = useAppSelector(selectCourse);
  const loading = status === "loading"
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [formData, setFormData] = useState(null);

  const openCourseForm = () => setOpenForm(true);
  const closeForm = () => setOpenForm(false);
  const handleDelete = async (id: string) => {
    await dispatch(deleteCourseAsync(id))
    dispatch(getCoursesAsync())
  }

  const routes = [
    {
      path: "index",
      breadcrumbName: "Admin",
    },
    {
      path: "first",
      breadcrumbName: "Courses",
    },
  ];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <Typography.Link href={record?.link}>{text}</Typography.Link>
      )
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    // {
    //   title: "Average Rating",
    //   dataIndex: "average_rating",
    //   key: "average_rating",
    // },
    {
      title: "Class Type",
      dataIndex: "class_type",
      key: "class_type",
    },
    {
      title: "Course Type",
      dataIndex: "type",
      key: "type",
    },
    // {
    //   title: "Mode",
    //   dataIndex: "mode",
    //   key: "mode",
    // },
    {
      title: "Instructors",
      dataIndex: "instructor",
      key: "instructor",
      render: (data: any) => (
        <Avatar.Group
          maxCount={3}
        >
          {data?.map((member: any) => (
            <Tooltip title={member?.name} placement="top">
              {member?.picture ? (
                <StyledAvatar src={member?.picture} color={theme.secondary} />
              ): (
                <StyledAvatar color={theme.secondary}>
                  {member?.name[0]}
                </StyledAvatar>
              )}
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any, index: number) => (
        <Space>
          <Button
            icon={<EditFilled />}
            type="text"
            onClick={() => {
              setOpenForm(true)
              setFormData(record)
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record?._id)}
          >
            <Button
              danger
              type="text"
              loading={loading}
              icon={<DeleteFilled />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getCoursesAsync());
  }, []);

  return (
    <Container>
      <StyledTable
        title={() => (
          <StyledRow justify="space-between">
            <PageHeader
              title="Courses"
              subTitle="Control data of courses here"
              breadcrumb={{ routes }}
            />
            <Button
              type="primary"
              icon={<PlusCircleFilled />}
              onClick={openCourseForm}
            >
              Add Course
            </Button>
          </StyledRow>
        )}
        columns={columns}
        dataSource={courseData}
        pagination={false}
      />
      {openForm && (
        <AddCourseForm open={openForm} onClose={closeForm} data={formData} />
      )}
    </Container>
  );
};

export default Courses;

const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  padding: 40px;
  float: right;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledRow = styled(Row)`
  width: 100%;
`;

const StyledTable = styled(Table)`
  margin-top: 20px;
  width: 100%;
`;

const StyledAvatar = styled(Avatar)<{ color: string }>`
  background-color: ${(props) => props.color};
`;
