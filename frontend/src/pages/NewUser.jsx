import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode'

import EmployeeAddNew from '../components/EmployeeAddNew/EmployeeAddNew'
import { logout, reset } from '../features/auth/authSlice'
import ResidentAddNew from '../components/ResidentAddNew/ResidentAddNEw'

function NewUser() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const newType = location.state.newType

  const { user } = useSelector(state => state.auth)


  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    const localUser = JSON.parse(localStorage.getItem('user'))
    if (localUser) {
      const token = localUser?.token
      //JWT check if token expired
      if (token) {
        const decodedToken = jwt_decode(token)
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          dispatch(logout())
          dispatch(reset())
        };
      }
    }
  }, [user, navigate])

  return (
    <>
      { newType === 'employee' ? (
        <EmployeeAddNew />
      ) : (
        <ResidentAddNew/>
      )}
    </>
  )
}

export default NewUser
