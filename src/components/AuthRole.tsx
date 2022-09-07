import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../utils/routes.enum";
import { currentUser, USER_ROLES } from "../utils/constants";

type AuthRoleProps = {
  allowedRoles: string[];
};

const AuthRole: React.FC<AuthRoleProps> = ({ allowedRoles }) => {
  const location = useLocation();

  const isSuperAdmin = currentUser?.role === USER_ROLES.SUPER_ADMIN;

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
