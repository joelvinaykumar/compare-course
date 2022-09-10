import React from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";

import {
  Home,
  Courses as BestCourses,
  Admin,
  SuperAdmin,
  NotFound,
  CourseDetails,
  Review,
  Unauthorized,
} from "../../pages";
import { CompanyDetails } from "../../pages/SuperAdmin/components"
import { Courses, AdminLogin } from "../../pages/Admin/components";
import { AppSkeleton } from "..";
import { ROUTES } from "../../utils/routes.enum";

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path={ROUTES.HOME} element={<AppSkeleton />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.COURSES} element={<BestCourses />} />
          <Route path={ROUTES.REVIEW} element={<Review />} />
          <Route path={ROUTES.COMPANY_BY_ID} element={<CompanyDetails />} />
          <Route path={ROUTES.COURSE_BY_ID} element={<CourseDetails />} />
          <Route path={ROUTES.ADMIN} element={<Admin />}>
            <Route path={ROUTES.HOME} element={<AdminLogin />} />
            <Route path={ROUTES.COURSE} element={<Courses />} />
          </Route>
        <Route path={ROUTES.SUPERADMIN} element={<SuperAdmin />} />
        </Route>
        <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
