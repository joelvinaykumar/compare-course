import React, { useEffect } from "react"
import { useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getInstituteByIdAsync, selectInstitute } from "../Admin/Institute.slice";

type CourseDetailsProps = {

}

const CourseDetails: React.FC<CourseDetailsProps> = ({}) => {

  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { instituteDetails, status, error } = useAppSelector(selectInstitute)

  useEffect(() => {
    dispatch(getInstituteByIdAsync(String(id)))
  }, [])

  return (
    <div>
      {JSON.stringify(instituteDetails)}
    </div>
  )
};

export default CourseDetails;
