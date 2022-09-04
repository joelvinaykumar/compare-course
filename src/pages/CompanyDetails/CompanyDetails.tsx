import React, { useEffect } from "react"
import { useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCompanyByIdAsync, selectCompany } from "../Admin/companySlice";

type CompanyDetailsProps = {

}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({}) => {

  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { instituteDetails, status, error } = useAppSelector(selectCompany)

  useEffect(() => {
    dispatch(getCompanyByIdAsync(String(id)))
  }, [])

  return (
    <div>
      {JSON.stringify(instituteDetails)}
    </div>
  )
};

export default CompanyDetails;
