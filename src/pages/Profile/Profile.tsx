import React, { useEffect } from "react"
import {Row, Avatar, Tabs, TabsProps, Typography} from 'antd';
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProfileAsync, selectProfile } from "./profile.slice";

type ProfileProps = {

}

const Profile: React.FC<ProfileProps> = () => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(selectProfile);

  useEffect(() => {
    dispatch(fetchProfileAsync())
  }, [dispatch])

  const items: TabsProps['items'] = [
    {
      key: 'reviews',
      label: 'Reviews',
      children: '',
    },
    {
      key: 'rewards',
      label: 'Rewards',
      children: '',
    },
  ];

  return (
    <div>
      <HeaderRow>
        <Avatar size={150} src={require("../../assets/peter-chirkov.jpeg") || data?.picture} crossOrigin="anonymous" />
        <Typography.Title level={3}>{data?.name}</Typography.Title>
        <Typography.Title level={5} type="secondary">{data?.role}</Typography.Title>
      </HeaderRow>
      <DetailsRow>
        <Tabs defaultActiveKey="reviews" items={items} onChange={(key: string) => {
          console.log(key);
        }} />
      </DetailsRow>
    </div>
  )
};

export default Profile;

const HeaderRow = styled(Row)`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-top: 60px;
`

const DetailsRow = styled(Row)`
  min-height: 400px;
  display: flex;
  justify-content: center;
  background-color: white;
`