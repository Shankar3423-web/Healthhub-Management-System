// routes/historyRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const AppointmentStatus = require('../models/AppointmentStatus');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Document = require('../models/Document'); // To check uploads

// GET: Patient's full medical history
router.get('/history', auth, async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user.id);
    const patient = await Patient.findOne({ email: user.email });
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }

    // Get all appointments
    const appointments = await Appointment
      .find({ patientId: patient.patientId })
      .sort({ date: -1 });

    // Get statuses
    const statuses = await AppointmentStatus.find({
      appointmentId: { $in: appointments.map(a => a._id) }
    });
    const statusMap = statuses.reduce((map, s) => {
      map[s.appointmentId.toString()] = s;
      return map;
    }, {});

    // Get uploaded documents
    const documents = await Document.find({ patientId: patient.patientId });
    const docsByDoctor = documents.reduce((map, doc) => {
      if (!map[doc.doctorId]) map[doc.doctorId] = [];
      map[doc.doctorId].push(doc);
      return map;
    }, {});

    // Merge data
    const history = await Promise.all(appointments.map(async (apt) => {
      const status = statusMap[apt._id.toString()] || {
        status: 'Pending',
        completedAt: null
      };

      const hasDocuments = documents.some(doc =>
        doc.appointmentId
          ? doc.appointmentId.toString() === apt._id.toString()
          : doc.doctorId.toString() === apt.doctorId?.toString()
      );

      return {
        appointmentId: apt._id,
        doctorName: apt.doctorName,
        doctorSpecialization: apt.doctorSpecialization,
        date: apt.date,
        time: apt.doctorId?.availableTimings || '10:00 AM - 5:00 PM',
        consultationFee: apt.consultationFee,
        status: apt.status || status.status, // Prefer direct status
        completedAt: status.completedAt || (apt.status === 'Completed' ? apt.updatedAt : null),
        hasDocuments
      };
    }));

    res.json(history);
  } catch (err) {
    console.error('History fetch error:', err.message);
    res.status(500).send('Server error');
  }
});

// 🔹 GET: Doctor searching for a patient's history by email
router.get('/patient/:email', auth, async (req, res) => {
  try {
    const { email } = req.params;
    const doctorEmail = req.user.email;

    // 1. Verify Requesting Doctor
    const doctor = await Doctor.findOne({ email: doctorEmail });
    if (!doctor) {
      return res.status(403).json({ msg: 'Access denied. Doctors only.' });
    }

    // 2. Find Patient by Email
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found with that email' });
    }

    // 3. Find Completed Appointments for this Doctor-Patient pair
    // "trace the history for the doctor who he had treated"
    const appointments = await Appointment.find({
      patientId: patient.patientId,
      doctorId: doctor._id,
      status: 'Completed'
    }).sort({ date: -1 });

    // 4. Format Result
    const results = await Promise.all(appointments.map(async (apt) => {
      // Check for documents uploaded for this patient
      // We can check if any documents exist for this patient (generic) or specific to this doctor
      // healthhub-frontend/src/Dashboards/Doctor/PatientHistory.js expects 'hasDocuments' boolean
      const docCount = await Document.countDocuments({
        patientId: patient.patientId,
        doctorId: doctor._id
      });

      return {
        _id: apt._id, // unique key
        doctorName: doctor.name, // The doctor viewing it is the one who treated
        date: apt.date,
        consultationFee: apt.consultationFee,
        hasDocuments: docCount > 0,
        status: apt.status
      };
    }));

    res.json(results);
  } catch (err) {
    console.error('Search patient history error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;