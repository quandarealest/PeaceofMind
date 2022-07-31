import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'
import { ThemeProvider, Box, CircularProgress } from '@mui/material'
import EmployeeEdit from '../components/EmployeeAddNew/EmployeeEdit'
import { logout , reset as userReset} from '../features/auth/authSlice'
import ResidentAddingNew from '../components/ResidentAddNew/ResidentAddingNew'
import { reset as employeeReset, getEmployeeDetail } from '../features/employee/employeeSlice'

function EditUser() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedUserId = location.state.selectedUserId

  const newType = location.state.newType

  const { user } = useSelector(state => state.auth)
  const { employeeDetail, isError, isLoading, message } = useSelector(state => state.employees)
  console.log(employeeDetail)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (!selectedUserId) {
      navigate('/')
    }else {
      if (isError) {
        toast.error(message)
      }
      dispatch(getEmployeeDetail({ token: user.token, userId: selectedUserId }))
    }
    return () => {
      dispatch(employeeReset())
    }
  }, [isError, message, dispatch])

  return (
    <>
      { newType === 'employee' ? (
        <>
        {
          isLoading ? (
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
              <CircularProgress sx={{ marginLeft: "5px" }} size={40} thickness={6} />
            </Box>
          ) : (
              Object.keys(employeeDetail).length !== 0 && (
                <EmployeeEdit detail={employeeDetail} isLoading={isLoading} user={user} />
              )
            )
          }
          
        </>
        
      ) : (
        <ResidentAddingNew/>
      )}
    </>
  )
}

export default EditUser
