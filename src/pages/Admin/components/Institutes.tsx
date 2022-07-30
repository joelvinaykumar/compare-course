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
} from "antd";
import { PlusCircleFilled, EditFilled, DeleteFilled, EyeFilled } from "@ant-design/icons";

import AddInstituteForm from "./AddInstituteForm";
import {
  deleteInstitutesAsync,
  getInstitutesAsync,
  selectInstitute,
} from "../Institute.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import theme from "../../../utils/theme";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../../utils/routes.enum";

type InstitutesProps = {};

const Institutes: React.FC<InstitutesProps> = () => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const { instituteData, status } = useAppSelector(selectInstitute);
  const loading = status === "loading"
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [formData, setFormData] = useState(null);

  const openInstittuteForm = () => setOpenForm(true);
  const closeForm = () => setOpenForm(false);
  const handleDelete = async (id: string) => {
    await dispatch(deleteInstitutesAsync(id))
    dispatch(getInstitutesAsync())
  }

  const rowActions = [
    {
      icon: <EyeFilled />,
      onclick: (record: any) => navigate(`${ROUTES.INSTITUTE}/${record._id}`, { replace: true }),
      label: "Preview"
    },
    {
      icon: <EditFilled />,
      onclick: (record: any) => {
        setOpenForm(true)
        setFormData(record)
      },
      label: "Edit"
    }
  ]

  const routes = [
    {
      path: "index",
      breadcrumbName: "Admin",
    },
    {
      path: "first",
      breadcrumbName: "Institutes",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "About",
      dataIndex: "about",
      key: "about",
      ellipsis: true,
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
      key: "faculty",
      render: (data: any) => (
        <Avatar.Group
          maxCount={3}
        >
          {data.map((member: any) => (
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
          {rowActions.map((row, index) => (
            <Tooltip key={index} title={row.label} placement="top">
              <Button type="text" icon={row.icon} onClick={() => row.onclick(record)} />
            </Tooltip>
          ))}
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record?._id)}
          >
            <Tooltip title="Delete" placement="top">
              <Button
                danger
                type="text"
                loading={loading}
                icon={<DeleteFilled />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getInstitutesAsync());
  }, []);

  return (
    <Container>
      <StyledTable
        title={() => (
          <StyledRow justify="space-between">
            <PageHeader
              title="Institutes"
              subTitle="Control data of institutes here"
              breadcrumb={{ routes }}
            />
            <Button
              type="primary"
              icon={<PlusCircleFilled />}
              onClick={openInstittuteForm}
            >
              Add Institute
            </Button>
          </StyledRow>
        )}
        columns={columns}
        dataSource={instituteData}
        pagination={false}
      />
      {openForm && (
        <AddInstituteForm open={openForm} onClose={closeForm} data={formData} />
      )}
    </Container>
  );
};

export default Institutes;

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
