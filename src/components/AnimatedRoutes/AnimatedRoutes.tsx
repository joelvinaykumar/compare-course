import React from "react"
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from "react-router-dom"

import { Home, Courses as BestCourses, Admin, InstituteDetails, NotFound } from "../../pages";
import { Institutes, Courses, AdminLogin } from "../../pages/Admin/components"
import { AppSkeleton } from "..";
import { ROUTES } from "../../utils/routes.enum";

const AnimatedRoutes: React.FC = () => {

  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path={ROUTES.HOME} element={<AppSkeleton />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.COURSES} element={<BestCourses />} />
          <Route path={ROUTES.INSTITUTE_BY_ID} element={<InstituteDetails />} />
          <Route path={ROUTES.ADMIN} element={<Admin />} >
            <Route path={ROUTES.HOME} element={<AdminLogin />} />
            <Route path={ROUTES.INSTITUTE} element={<Institutes />} />
            <Route path={ROUTES.COURSE} element={<Courses />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
};

export default AnimatedRoutes;
