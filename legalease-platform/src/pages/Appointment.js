import React, { useContext, useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AuthContext from '../context/AuthContext';
import { getAppointments, createAppointment } from '../utilities/api';

const localizer = momentLocalizer(moment);

const Appointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    caseId: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsData = await getAppointments();
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      const appointmentData = {
        title: formData.title,
        description: formData.description,
        date: dateTime.toISOString(),
      };

      const newAppointment = await createAppointment(appointmentData);
      setAppointments([...appointments, newAppointment]);
      setShowModal(false);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        caseId: '',
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const calendarEvents = appointments.map((appointment) => ({
    id: appointment._id,
    title: appointment.title,
    start: new Date(appointment.date),
    end: new Date(new Date(appointment.date).getTime() + 60 * 60 * 1000), // 1 hour duration
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="appointments">
      <div className="container">
        <div className="page-header">
          <h1>Appointments</h1>
          {user?.role === 'user' && (
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Schedule Appointment
            </button>
          )}
        </div>

        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Schedule New Appointment</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;