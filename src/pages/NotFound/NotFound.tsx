import React from "react"
import { Result  } from "antd"
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../utils/routes.enum";
import { CustomButton } from "../../components";

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
      extra={<CustomButton type="primary" onClick={goToHome}>Take me Home</CustomButton>}
    />
  )
};

export default NotFound;