import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider, List, Avatar } from "antd";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getReviewsAsync, selectReview } from "../pages/Review/Review.slice";

type ReviewsProps = {
  type: "company" | "course";
  id?: string;
}

const Reviews: React.FC<ReviewsProps> = ({type, id}) => {
  const dispatch = useAppDispatch();
  const { reviewsData, status } = useAppSelector(selectReview);
  const loading = status === "loading";

  useEffect(() => {
    // dispatch(getReviewsAsync({
    //   type,
    //   id,
    // }))
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
          renderItem={(item: any) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={<Avatar src={item.anonymous? require("../assets/incognito.png"): item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      {/* </InfiniteScroll> */}
    </InfiniteDiv>
  )
};

export default Reviews;

const InfiniteDiv = styled.div`
  height: 400px;
  overflow: auto;
  padding: 0 16px;
`