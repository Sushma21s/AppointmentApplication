import React from 'react';
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
} from '@mui/material';

const AppointmentList = ({ appointments, onEdit, onDelete }) => {
  

  if (appointments.length === 0) {
    return <Typography variant="body1">No appointments yet.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Appointment List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Date & Time</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appt) => (
            <TableRow key={appt.id}>
              <TableCell>{appt.name}</TableCell>
              <TableCell>{appt.email}</TableCell>
              <TableCell>{appt.phone}</TableCell>
              <TableCell>
                {new Date(appt.dateTime).toLocaleString()}
              </TableCell>
              <TableCell>{appt.description || '—'}</TableCell>
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
    </TableContainer>
  );
};

export default AppointmentList;
