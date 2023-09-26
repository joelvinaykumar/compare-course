import React from "react"
import styled from "styled-components";
import { AiFillLock } from "react-icons/ai";

type LockedProps = {

}

const Locked: React.FC<LockedProps> = () => {
  return (
    <CenterDiv>
      <Container></Container>
      <AiFillLock fontSize={50} color="white" style={{position: "relative", top: '-50%', left: '50%'}} />
    </CenterDiv>
  )
};

export default Locked;

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #aaa;
  border-radius: 15px;
  background-image: url(${require("../assets/sai-kiran-anagani-HEzhw36Yk0M-unsplash.jpeg")});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
`

const CenterDiv = styled.div`
  width: 80%;
  height: 300px;
  margin-top: 50px;
`