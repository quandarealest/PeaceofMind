import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import jwt_decode from 'jwt-decode'
import { ThemeProvider, Box } from '@mui/material'

import { theme } from '../theme/CustomizedTheme'
import PoMMobileTable from '../components/PoMTable/PoMMobileTable'
import PoMTable from '../components/PoMTable/PoMTable'
import { logout, reset } from '../features/auth/authSlice'
import { getResidentList, reset as residentReset } from '../features/resident/residentSlice'
import { residentHeaderCells, residentMobileHeaderCells } from '../components/AdminDashboard/AdminDashboardEnum'
import { createData } from '../components/PoMTable/TableEnum'
import { normalizeDate, normalizePhoneNumber } from '../common/NormalizingData'

const Resident = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const residentSelector = useSelector(state => state.residents)

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

  useEffect(() => {
    if (residentSelector.isError) {
      toast.error(residentSelector.message)
    }
    dispatch(getResidentList())


  }, [residentSelector.isError, residentSelector.message, dispatch])

  const normalizedMobileResidentList = residentSelector.residents.length !== 0 ?
    residentSelector.residents.map(res => {
      const values = Object.values({
        userId: res.userId,
        residentNumber: res.residentNumber,
        name: res.firstName + ' ' + res.lastName,
        roomNumber: res.roomNumber,
      })
      return createData(values)
    }) : []

  const normalizedResidentList = residentSelector.residents.length !== 0 ?
    residentSelector.residents.map(res => {
      const values = Object.values({
        userId: res.userId,
        residentNumber: res.residentNumber,
        firstName: res.firstName,
        lastName: res.lastName,
        roomNumber: res.roomNumber,
        assistedSupervisor: res.supervisor.firstName + ' ' + res.supervisor.lastName,
        contactNumber: normalizePhoneNumber(res.contactNumber.toString()),
        createdAt: normalizeDate(new Date(res.createdAt)),
        updatedAt: normalizeDate(new Date(res.updatedAt))
      })
      return createData(values)
    }) : []

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'none' }, flexGrow: 1, margin: 4, height: 'calc(100vh - 90px - 32px - 32px)' }}>
        <PoMMobileTable
          headCells={residentMobileHeaderCells}
          rows={normalizedMobileResidentList}
          isLoading={residentSelector.isLoading}
          tableName=""
          tableType="resident"
          disableAdd={true}
          includeCheckbox={false}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'none', lg: 'flex' }, flexGrow: 1, margin: 4, height: 'calc(100vh - 90px - 32px - 32px)' }}>
        <PoMTable
          headCells={residentHeaderCells}
          rows={normalizedResidentList}
          isLoading={residentSelector.isLoading}
          tableName="Resident List"
          tableType="resident"
          disableAdd={true}
          includeCheckbox={false}
        />
      </Box>
    </ThemeProvider>
  );
}

export default Resident;