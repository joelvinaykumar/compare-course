import React from "react"
import { Result, Button  } from "antd"
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../utils/routes.enum";

type NotFoundProps = {

}

const NotFound: React.FC<NotFoundProps> = () => {

  const navigate = useNavigate()

  const goToHome = () => navigate(ROUTES.HOME)

  return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={goToHome}>Back Home</Button>}
      />
  )
};

export default NotFound;