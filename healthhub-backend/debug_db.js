
const mongoose = require('mongoose');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
require('dotenv').config();

const uri = process.env.MONGO_URI;

async function checkDB() {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(uri);
        console.log('Connected!');

        const pendingUsers = await User.find({ status: 'pending' });
        console.log(`Pending Users: ${pendingUsers.length}`);
        pendingUsers.forEach(u => console.log(` - User: ${u.name} (${u.email}) [${u.role}]`));

        const pendingDoctors = await Doctor.find({ status: 'pending' });
        console.log(`Pending Doctors: ${pendingDoctors.length}`);
        pendingDoctors.forEach(d => console.log(` - Doctor: ${d.name} (${d.email})`));

        const allDoctors = await Doctor.find({});
        console.log(`Total Doctors: ${allDoctors.length}`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Done.');
    }
}

checkDB();
