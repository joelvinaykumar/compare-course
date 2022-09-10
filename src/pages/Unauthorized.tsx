import React from "react"
import { Result, Button  } from "antd"

import { useAppDispatch } from "../redux/hooks";
import { logOutAsync } from "./Review/loginSlice"


type NotFoundProps = {

}

const NotFound: React.FC<NotFoundProps> = () => {

  const dispatch = useAppDispatch()

  const logMeOut = () => dispatch(logOutAsync())

  return (
      <Result
        status="403"
        title="Unauthorized"
        subTitle="Sorry, you don't have right permission to view this page."
        extra={<Button type="primary" onClick={logMeOut}>Log me out</Button>}
      />
  )
};

export default NotFound;