import { Typography } from "antd";
import React, { useEffect } from "react"
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import useQuery from "../../utils/useQuery";
import { loginLinkedInAsync } from "../Login/loginSlice";

type AuthCallbackProps = {

}

const AuthCallback: React.FC<AuthCallbackProps> = () => {
  const query = useQuery();
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loginLinkedInAsync(String(query.get("access_token"))))
  }, [dispatch, query])

  return (
    <Container>
      <Typography.Text strong>Redirecting you ...</Typography.Text>
    </Container>
  )
};

export default AuthCallback;

const Container = styled.div`
  width: 100%;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`