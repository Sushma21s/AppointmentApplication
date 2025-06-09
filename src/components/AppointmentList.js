import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TablePagination,
} from '@mui/material';

const AppointmentList = ({ appointments, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (appointments.length === 0) {
    return <Typography variant="body1">No appointments yet.</Typography>;
  }

  const fields = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'dateTime', label: 'Date & Time' },
    { key: 'description', label: 'Description' },
  ];

  const paginatedAppointments = appointments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Appointment List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <TableCell key={field.key}>{field.label}</TableCell>
            ))}
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedAppointments.map((appt) => (
            <TableRow key={appt.id}>
              {fields.map((field) => (
                <TableCell key={field.key}>
                  {field.key === 'dateTime'
                    ? new Date(appt[field.key]).toLocaleString()
                    : appt[field.key] || '—'}
                </TableCell>
              ))}
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => onEdit(appt)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onDelete(appt.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={appointments.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />
    </TableContainer>
  );
};

export default AppointmentList;
