import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../utils/AuthContext";
import { currentUser, USER_ROLES } from "../utils/constants";
import { ROUTES } from "../utils/routes.enum";

const PrivateRoute = ({ children }: { children: any }) => {
  const location = useLocation();

  const { authenticated } = useContext(AuthContext);

  return authenticated && currentUser?.role ? (
    children
  ) : (
    <Navigate
      to={ROUTES.UNAUTHORIZED}
      state={{ from: location }}
      replace
    />
  );
};

export default PrivateRoute;
