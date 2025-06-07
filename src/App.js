import React, { useState,useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import AppointmentCalendar from './components/CalendarView';
import EditAppointmentModal from './components/EditAppointnt';
import ConfirmDeleteDialog from './components/DeleteAppointment';

const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    useEffect(() => {
    const stored = localStorage.getItem('appointments');
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);
  useEffect(() => {
  localStorage.setItem('appointments', JSON.stringify(appointments));
}, [appointments]);


  const addAppointment = (appt) => {
    setAppointments((prev) => [...prev, appt]);

    console.log(appointments,"check apointmentf");
    
  };

  const updateAppointment = (updated) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  };

  const deleteAppointment = (id) => {
        console.log(id,"sdfssssssss")

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
        <h1>Appointment Booking Application </h1>
      <div style={{ padding: 20 }}>
        <AppointmentForm onSubmit={addAppointment} />
        <AppointmentList
          appointments={appointments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <AppointmentCalendar
          appointments={appointments}
          onSelectAppointment={handleEdit}
        />
        <EditAppointmentModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={updateAppointment}
          appointment={editing}
        />
        <ConfirmDeleteDialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={deleteAppointment}
          appointment={deleting}
        />
      </div>
    </LocalizationProvider>
  );
};

export default App;
