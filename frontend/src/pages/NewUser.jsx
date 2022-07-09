import { useLocation } from 'react-router-dom'

import EmployeeAddNew from '../components/EmployeeAddNew/EmployeeAddNew'

function NewUser() {
  const location = useLocation()
  const newType = location.state.newType

  return (
    <>
      { newType === 'employee' ? (
        <EmployeeAddNew />
      ) : (null)}
    </>
  )
}

export default NewUser
