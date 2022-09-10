import React, { useContext } from "react"
import styled from "styled-components"


import AuthContext from "../../utils/AuthContext";
import Login from "./components";

type ReviewProps = {

}

const Review: React.FC<ReviewProps> = () => {

  const { authenticated } = useContext(AuthContext)

  if(!authenticated) {
    return <Login />
  }

  return (
    <div>
      
    </div>
  )
};

export default Review;
