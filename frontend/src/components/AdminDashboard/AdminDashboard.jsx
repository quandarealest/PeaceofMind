import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Paper, TableCell, Table, TableHead, TableRow, TableBody, Link, CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'

import { getEmployeeList } from '../../features/employee/employeeSlice'
import Title from '../Title/Title'

// Generate Order Data
function createData(employeeNumber, firstName, lastName, contactNumber, createdAt, updatedAt) {
  return { employeeNumber, firstName, lastName, contactNumber, createdAt, updatedAt };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function AdminDashboard() {
  const dispatch = useDispatch()

  const { employees, isLoading, isSuccess, isError, message } = useSelector(state => state.employees)
  const [employeeList, setEmployeeList] = useState(employees)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (employeeList.length === 0) {
      dispatch(getEmployeeList())
      setEmployeeList(employees)
    }
  }, [employees, isError])

  const normalizedEmployeeList = employeeList.length !== 0 ?
    employeeList.map(emp => createData(emp.employeeNumber, emp.firstName, emp.lastName, emp.contactNumber, emp.createdAt, emp.updatedAt)) : []
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Grid item xs={12} sx={{ flexBasis: '100%' }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Employee List</Title>
          {isLoading ? (
            <CircularProgress sx={{ color: "#32c2b4", marginLeft: "5px" }} size={24} thickness={6} />
          ) : (
              <>
                <Table size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee ID</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Contact Number</TableCell>
                      <TableCell>Created Date</TableCell>
                      <TableCell>Updated Date</TableCell>
                      {/* <TableCell align="right">Sale Amount</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {normalizedEmployeeList.map((row) => (
                      <TableRow key={row.employeeNumber}>
                        <TableCell>{row.employeeNumber}</TableCell>
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.contactNumber}</TableCell>
                        <TableCell>{row.createdAt}</TableCell>
                        <TableCell>{row.updatedAt}</TableCell>
                        {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table >
                <Link color="primary" href="#" sx={{ mt: 3 }}>
                  See more orders
                </Link>
              </>
            )}
        </Paper>
      </Grid>
    </Box>
  )
}

export default AdminDashboard
