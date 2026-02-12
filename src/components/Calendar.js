import React, { useState } from 'react';
import { checkAvailability } from '../services/bookingService';

const hours = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="calendar-grid">
      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      
      <div className="slots-container">
        {hours.map(hour => (
          <div key={hour} className="time-slot" onClick={() => openBookingModal(hour)}>
            <span>{hour}hs</span>
            {/* Aquí llamarías a checkAvailability para mostrar cupos */}
            <div className="badge">Disponibles: --</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
