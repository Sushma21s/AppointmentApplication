import React from 'react';
import {
  Calendar,
  dateFnsLocalizer,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = ({ appointments, onSelectAppointment }) => {
  const now = new Date();

  const events = appointments.map((appt) => ({
    id: appt.id,
    title: `${appt.name} - ${appt.description || 'Appointment'}`,
    start: new Date(appt.dateTime),
    end: new Date(appt.dateTime),
    allDay: false,
    resource: appt,
  }));

  return (
    <div style={{ height: '600px', marginTop: 32 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => {
          if (new Date(event.start) < now) {
            alert('Cannot select past appointments.');
            return;
          }
          onSelectAppointment(event.resource);
        }}
        selectable
        onSelectSlot={(slotInfo) => {
          if (new Date(slotInfo.start) < now) {
            alert('Cannot create appointments in the past.');
            return;
          }
        }}
        dayPropGetter={(date) => {
          const isPast = date < new Date().setHours(0, 0, 0, 0);
          return {
            style: {
              backgroundColor: isPast ? '#f0f0f0' : 'white',
              color: isPast ? '#999' : 'black',
              pointerEvents: isPast ? 'none' : 'auto',
            },
          };
        }}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default CalendarView;
