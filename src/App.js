import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Button,
  Box,
  Container
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './components/styles/editModal.scss';
import AppointmentList from './components/AppointmentList';
import AppointmentCalendar from './components/CalendarView';
import ConfirmDeleteDialog from './components/DeleteAppointment';
import appointmentImage from './components/images/appointmentImage.png';
import AppointmentModal from "./components/AddApointmentModal"

const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [view, setView] = useState('list');

  useEffect(() => {
    const stored = localStorage.getItem('appointments');
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (appointments.length)
      localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appt) => {
    setAppointments((prev) => [...prev, appt]);
    setShowFormModal(false);
  };

  const updateAppointment = (updated) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  };

  const deleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleEdit = (appt) => {
    setEditing(appt);
    setShowEditModal(true);
  };

  const handleDelete = (appt) => {
    setDeleting(appt);
    setShowDeleteDialog(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <Box sx={{ padding: 3 }}>
        <Box
          sx={{
            position: 'relative',
            backgroundImage: `url(${appointmentImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff',
            width: '100%',
            borderRadius: 2,
            overflow: 'hidden',
            mb: 4,
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'white',
                textShadow: '2px 2px 6px rgba(0,0,0,0.5)',
              }}
            >
              Book Your Appointment Effortlessly
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                maxWidth: '600px',
                margin: '0 auto',
                color: 'white',
                textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
              }}
            >
              Schedule, manage, and track your appointments all in one place.
            </Typography>
          </Box>
        </Box>

        <Container sx={{ py: 4 }}>
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
            className="mobile-view"
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button
                variant={view === 'list' ? 'contained' : 'outlined'}
                onClick={() => setView('list')}
              >
                View Appointments
              </Button>
              <Button
                variant={view === 'calendar' ? 'contained' : 'outlined'}
                onClick={() => setView('calendar')}
              >
                Calendar View
              </Button>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowFormModal(true)}
            >
              Book Appointment
            </Button>
          </Box>

          <Box sx={{ width: '100%' }}>
            {view === 'list' && (
              <AppointmentList
                appointments={appointments}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
            {view === 'calendar' && (
              <AppointmentCalendar
                appointments={appointments}
                onSelectAppointment={handleEdit}
              />
            )}
          </Box>
          <AppointmentModal
            open={showFormModal}
            onClose={() => setShowFormModal(false)}
            onSubmit={addAppointment}
          />
          <AppointmentModal
            open={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSubmit={updateAppointment}
            appointment={editing}
          />

          <ConfirmDeleteDialog
            open={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
            onConfirm={deleteAppointment}
            appointment={deleting}
          />
        </Container>

      </Box>
    </LocalizationProvider>
  );
};

export default App;
