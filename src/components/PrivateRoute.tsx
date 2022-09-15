import { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import AuthContext from "../utils/AuthContext";
import { currentUser } from "../utils/constants";
import { ROUTES } from "../utils/routes.enum";

const PrivateRoute = () => {
  const location = useLocation();
  const { authenticated } = useContext(AuthContext);
  
  return authenticated && currentUser?.role ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
