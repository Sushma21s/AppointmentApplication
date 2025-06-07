import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  dateTime: null,
  description: '',
};

const AppointmentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = 'Valid email is required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      errs.phone = 'Valid 10-digit phone number is required';
    if (!formData.dateTime) errs.dateTime = 'Appointment date/time is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleDateChange = (value) => {
    setFormData((f) => ({ ...f, dateTime: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        id: Date.now(), 
      });
      setFormData(initialFormState); 
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Book an Appointment
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateTimePicker
            label="Appointment Date & Time"
            value={formData.dateTime}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!errors.dateTime}
                helperText={errors.dateTime}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description / Reason (Optional)"
            name="description"
            fullWidth
            multiline
            minRows={2}
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppointmentForm;
