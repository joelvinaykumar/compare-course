import React from "react";
import styled from "styled-components";
import { Statistic, Row, Card, PageHeader, Col, Typography } from "antd";
import { TinyArea } from "@ant-design/plots";
import { Datum } from "@antv/g2plot";


type AdminProps = {};

const Admin: React.FC<AdminProps> = () => {

  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];
  const config = {
    height: 200,
    autoFit: false,
    data,
    smooth: true,
  };

  return (
    <Container>
      <PageHeader title="Dashboard" />
      <Row gutter={[32, 16]}>
        <Col span={24}>
          <Card>
            <Row>
              <StyledCol span={6}>
                <Statistic title="All Courses" value={2} />
              </StyledCol>
              <StyledCol span={6}>
                <Statistic title="Total Reviews" value={"2.4k"} />
              </StyledCol>
              <StyledCol span={6}>
                <Statistic title="Positive Reviews" value={"1.9k"} />
              </StyledCol>
              <StyledCol span={6}>
                <Statistic title="Negative Reviews" value={"0.5k"} />
              </StyledCol>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <TinyArea
              {...config}
              tooltip={{
                follow: true,
                customContent: (title: string, data: any[]) => {
                  return (
                    <Typography.Title level={4}>
                      {data[0]?.value}
                    </Typography.Title>
                  );
                },
                formatter: (data: Datum) => {
                  return { name: data.x, value: `${data.y} reviews` };
                },
              }}
              useDeferredLabel
              yAxis={{ field: "Reviews" }}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;

const Container = styled.div`
  width: 100%;
  min-height: 91vh;
  margin-top: 80px;
  padding: 30px;
`;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
`;
