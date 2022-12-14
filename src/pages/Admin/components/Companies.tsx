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
  Tag,
} from "antd";
import { useNavigate } from "react-router-dom";
import { PlusCircleFilled, EditFilled, DeleteFilled, EyeFilled } from "@ant-design/icons";

import AddCompanyForm from "./AddCompanyForm";
import {
  deleteCompanyAsync,
  getCompaniesAsync,
  selectCompany,
} from "../companySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import theme from "../../../utils/theme";
import { ROUTES } from "../../../utils/routes.enum";

type CompaniesProps = {};

const Companies: React.FC<CompaniesProps> = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { instituteData, status } = useAppSelector(selectCompany);
  const loading = status === "loading"
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [formData, setFormData] = useState(null);

  const openCompanyForm = () => {
    setFormData(null);
    setOpenForm(true)
  };
  const closeForm = () => setOpenForm(false);
  const handleDelete = async (id: string) => {
    await dispatch(deleteCompanyAsync(id))
    dispatch(getCompaniesAsync())
  }

  const rowActions = [
    {
      icon: <EyeFilled />,
      onclick: (record: any) => navigate(`${ROUTES.COMPANY}/${record._id}`, { replace: true }),
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
      breadcrumbName: "Companies",
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
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
      render: (data: any) => (
        <Space>
          {data?.map((m: string) => <Tag>{m}</Tag>)}
        </Space>
      )
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
      render: (text: string, record: any) => (
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
    dispatch(getCompaniesAsync());
  }, [dispatch]);

  return (
    <Container>
      <StyledTable
        title={() => (
          <StyledRow justify="space-between">
            <PageHeader
              title="Companies"
              subTitle="Control data of companies here"
              breadcrumb={{ routes }}
            />
            <Button
              type="primary"
              icon={<PlusCircleFilled />}
              onClick={openCompanyForm}
            >
              Onboard Company
            </Button>
          </StyledRow>
        )}
        columns={columns}
        dataSource={instituteData}
        pagination={false}
      />
      {openForm && (
        <AddCompanyForm open={openForm} onClose={closeForm} data={formData} />
      )}
    </Container>
  );
};

export default Companies;

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
