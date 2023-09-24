import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../utils/routes.enum";
import { currentUser } from "../utils/constants";
import { useContext } from "react";
import AuthContext from "../utils/AuthContext";

type AuthRoleProps = {
  allowedRoles: string[];
};

const AuthRole: React.FC<AuthRoleProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const { authenticated } = useContext(AuthContext);

  if(!authenticated) {
    return <Outlet />
  }

  return currentUser?.role && allowedRoles?.includes(currentUser?.role) ? (
    <Outlet />
  ) : (
    <Navigate
      to={ROUTES.UNAUTHORIZED}
      state={{ from: location }}
      replace
    />
  );
};

export default AuthRole;
