import React from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";

import {
  Home,
  Login,
  Courses as BestCourses,
  Admin,
  SuperAdmin,
  NotFound,
  CourseDetails,
  Review,
  AuthCallback,
  Unauthorized,
  Profile,
} from "../../pages";
import { CompanyDetails } from "../../pages/SuperAdmin/components"
import { AuthRole, AppSkeleton } from "..";
import { ROUTES } from "../../utils/routes.enum";
import { USER_ROLES } from "../../utils/constants";

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path={ROUTES.HOME} element={<AppSkeleton />}>
          <Route path={ROUTES.HOME} element={<Home />} />
        </Route>
        <Route path={ROUTES.HOME}>
          <Route path={ROUTES.HOME} element={<AppSkeleton />}>
            <Route path={ROUTES.COURSES} element={<BestCourses />} />
            <Route element={<AuthRole allowedRoles={[USER_ROLES.USER]} />}>
              <Route path={ROUTES.REVIEW} element={<Review />} />
            </Route>
            <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallback />} />
            <Route path={ROUTES.COMPANY_BY_ID} element={<CompanyDetails />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.COURSE_BY_ID} element={<CourseDetails />} />
            <Route path={ROUTES.ADMIN} element={<Admin />} />
            <Route element={<AuthRole allowedRoles={[USER_ROLES.SUPER_ADMIN]} />}>
              <Route path={ROUTES.SUPERADMIN} element={<SuperAdmin />} />
            </Route>
          </Route>
        </Route>
        <Route element={<AppSkeleton />} >
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>
        <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
