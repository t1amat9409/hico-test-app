import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEmployeeContext } from '../hooks/useEmployeeContext';
import { Box } from '@mui/material';

export const EmployeeList = () => {
  const { employeeList, onEmployeeSelected } = useEmployeeContext()
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Employee #</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Salutation</TableCell>
            <TableCell align="right">Profile Colour</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeList.map((row) => (
            <TableRow
              key={row.employeeNo}
              onClick={() => onEmployeeSelected(row)}
              data-cy={`employeeListItem`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, 'cursor': 'pointer' }}
            >
              <TableCell component="th" scope="row">
                {row.employeeNo}
              </TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.salutation}</TableCell>
              <TableCell align="right">{row.color}</TableCell>
            </TableRow>
          ))}
          {employeeList.length === 0 && (
            <TableRow>
              <TableCell align="center" colSpan={5}>
              <Box sx={{
              p: 6
            }}>
              No Employees Found!
              </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
