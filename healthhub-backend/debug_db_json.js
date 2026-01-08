
const mongoose = require('mongoose');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
require('dotenv').config();

const uri = process.env.MONGO_URI;

async function checkDB() {
    try {
        await mongoose.connect(uri);

        const pendingDocs = await Doctor.find({ status: 'pending' });
        const allDocs = await Doctor.find({});

        console.log(JSON.stringify({
            pendingDoctorsCount: pendingDocs.length,
            pendingDoctorsNames: pendingDocs.map(d => d.name),
            totalDoctors: allDocs.length
        }, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

checkDB();
