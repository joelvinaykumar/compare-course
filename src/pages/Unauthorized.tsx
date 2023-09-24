import React from "react"
import { Result, Button  } from "antd"

import { useNavigate } from "react-router-dom";
import { currentUser, USER_ROLES } from "../utils/constants";
import { ROUTES } from "../utils/routes.enum";


type NotFoundProps = {

}

const NotFound: React.FC<NotFoundProps> = () => {

  const navigate = useNavigate()
  const isSuperAdmin = currentUser?.role === USER_ROLES.SUPER_ADMIN;
  const logMeOut = () => isSuperAdmin? navigate(ROUTES.SUPERADMIN): navigate(-1)

  return (
      <Result
        status="403"
        title="Unauthorized"
        subTitle="Sorry, you don't have right permission to view this page."
        extra={<Button type="primary" onClick={logMeOut}>Take me Back</Button>}
      />
  )
};

export default NotFound;