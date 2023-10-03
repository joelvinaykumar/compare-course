import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row, List, Avatar, Card, Typography, Col, Rate, Space, Input, Table } from "antd";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getReviewsAsync, selectReview } from "../pages/Review/Review.slice";
import { formatDate } from "../utils/helpers";

type ReviewsProps = {
  type: "company" | "course" | "user";
  id?: string;
}

const Reviews: React.FC<ReviewsProps> = ({type, id}) => {
  const dispatch = useAppDispatch();
  const { reviewsData, status } = useAppSelector(selectReview);
  const loading = status === "loading";

  useEffect(() => {
    dispatch(getReviewsAsync({
      type,
      id,
    }))
  }, [dispatch, id, type]);

  return (
    <InfiniteDiv>
      {/* <InfiniteScroll
        dataLength={reviewsData.length}
        next={() => {}}
        hasMore={reviewsData.length < 50}
        loader={<Skeleton count={1} enableAnimation baseColor="rgba(56, 103, 214, 0.2)" />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      > */}
        
        <List
          dataSource={reviewsData}
          loading={loading}
          rowKey={item => item._id}
          renderItem={(item: any) => (
            <StyledCard>
              <List.Item key={item._id}>
                <List.Item.Meta
                  avatar={<Avatar size="large" src={!item.anonymous? require("../assets/incognito.png"): item.picture} />}
                  title={
                    <StyledTitle>
                      <Typography.Title level={5}>{!item?.anonymous ? "Anonymous": item.created_by}</Typography.Title>
                    </StyledTitle>
                  }
                  description={formatDate(item.createdAt)}
                />
              </List.Item>
              <StyledDescription>
                  <Space size={15} direction="vertical">
                    <Row>
                      <Col xs={12}>
                        <Typography>Overall</Typography>
                        <Rate allowHalf disabled value={item?.overall} />
                      </Col>
                      <Col xs={12}>
                        <Typography>Faculty</Typography>
                        <Rate allowHalf disabled value={item?.faculty} />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Typography>Placement</Typography>
                        <Rate allowHalf disabled value={item?.placement} />
                      </Col>
                      <Col xs={12}>
                        <Typography>Doubt Solving</Typography>
                        <Rate allowHalf disabled value={item?.doubt_solving} />
                      </Col>
                    </Row>
                    {item?.feedback ? (
                      <StyledTitle>
                        <Typography>Feedback</Typography>
                        <Input.TextArea value={item?.feedback} disabled />
                      </StyledTitle>
                    ): null}
                    <Table
                      pagination={false}
                      columns={[
                        {
                          key: 'pros',
                          dataIndex: 'pros',
                          title: 'Pros',
                          align: 'center',
                        },
                        {
                          key: 'cons',
                          dataIndex: 'cons',
                          title: 'Cons',
                          align: 'center',
                        }
                      ]}
                      dataSource={[
                        {
                          pros: <Typography.Text type="secondary">{item.pros}</Typography.Text>,
                          cons: <Typography.Text type="secondary">{item.cons}</Typography.Text>,
                        }
                      ]}
                    />
                  </Space>
              </StyledDescription>
            </StyledCard>
          )}
        />
      {/* </InfiniteScroll> */}
    </InfiniteDiv>
  )
};

export default Reviews;

const InfiniteDiv = styled.div`
  height: 800px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledCard = styled(Card)`
  margin: 20px 0;
`

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
