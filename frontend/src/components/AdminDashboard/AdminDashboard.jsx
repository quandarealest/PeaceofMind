import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'

import { getEmployeeList, reset as employeeReset } from '../../features/employee/employeeSlice'
import { getResidentList, reset as residentReset } from '../../features/resident/residentSlice'
import PoMTable from '../PoMTable/PoMTable'
import { employeeHeaderCells, residentHeaderCells } from './AdminDashboardEnum'
import { createData } from '../PoMTable/TableEnum'
import { normalizeDate, normalizePhoneNumber } from '../../common/NormalizingData'


function AdminDashboard(props) {
  const dispatch = useDispatch()

  const employeeSelector = useSelector(state => state.employees)
  const residentSelector = useSelector(state => state.residents)

  useEffect(() => {
    if (employeeSelector.isError) {
      toast.error(employeeSelector.message)
    }
    if (residentSelector.isError) {
      toast.error(residentSelector.message)
    }
    dispatch(getEmployeeList())
    dispatch(getResidentList())

    return () => {
      dispatch(employeeReset())
      dispatch(residentReset())
    }
  }, [employeeSelector.isError, employeeSelector.message, residentSelector.isError, residentSelector.message, dispatch])

  const normalizedEmployeeList = employeeSelector.employees.length !== 0 ?
    employeeSelector.employees.map(emp => {
      const values = Object.values({
        userId: emp.userId,
        employeeNumber: emp.employeeNumber,
        firstName: emp.firstName,
        lastName: emp.lastName,
        contactNumber: normalizePhoneNumber(emp.contactNumber.toString()),
        createdAt: normalizeDate(new Date(emp.createdAt)),
        updatedAt: normalizeDate(new Date(emp.updatedAt))
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
    <Box sx={{ width: { xs: 420, sm: 730, md: '100%', lg: '100%' } }}>
      <br />
      <PoMTable
        headCells={employeeHeaderCells}
        rows={normalizedEmployeeList}
        isLoading={employeeSelector.isLoading}
        tableName="Employee List"
        tableType="employee"
        includeCheckbox={true} />
      <PoMTable
        headCells={residentHeaderCells}
        rows={normalizedResidentList}
        isLoading={residentSelector.isLoading}
        tableName="Resident List"
        tableType="resident"
        includeCheckbox={true} />
    </Box>
  )
}

export default AdminDashboard
