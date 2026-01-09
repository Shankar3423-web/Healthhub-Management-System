🏥 HealthHub Management System

🔗 Live Application: https://healthhub-management-system.vercel.app

🔗 Backend API: https://healthhub-management-system.onrender.com

📌 Overview

HealthHub Management System is a full-stack hospital management web application designed to digitize and streamline hospital workflows. The platform supports multiple user roles — Patient, Doctor, Staff, and Admin — each with role-specific access, dashboards, and permissions.

The system focuses on real-world healthcare problems such as appointment scheduling, profile verification, medical records handling, prescriptions, billing, and administrative approvals using Role-Based Access Control (RBAC).

✨ Key Features
🔐 Role-Based Authentication

Secure signup and login system

JWT-based authentication

Role-specific redirection and access control

🧑‍⚕️ Multi-Role Support

Patient

Doctor

Staff

Admin

🧠 Quick Assistant (HealthHub Assistant)

Floating AI-style assistant available on the landing page

Provides instant guidance for:

Booking appointments

Viewing prescriptions

Contacting support

Data security FAQs

Improves onboarding and user experience

📅 Appointment Management

Department → Doctor → Date & Time slot flow

Prevents double booking

Appointment status tracking

📁 Medical Records & Documents

Upload and manage medical reports

Share documents with doctors securely

Maintain patient medical history

💊 Prescriptions & Billing

Doctors can generate digital prescriptions

Patients can view prescriptions instantly

Billing and payment tracking

✅ Admin Approval Workflow

Doctors/Staff/Admin accounts require approval

Admin has full control over user verification

Prevents unauthorized access to sensitive data

🖥️ Application Flow
1️⃣ Landing Page

First entry point of the application

Introduces HealthHub and its core capabilities

Provides Login and Signup options

Includes Quick Assistant for instant help

2️⃣ Signup (Role-Based)

User selects role during signup

Account created with default status:

Patient → Active

Doctor / Staff / Admin → Pending approval

3️⃣ Login & Redirection

Secure login using JWT

Users redirected to profile completion pages

4️⃣ Profile Completion

Patient: Health and personal details

Doctor/Staff/Admin: Professional and credential details

Non-patients must wait for admin approval

5️⃣ Dashboards

Each role gets a dedicated dashboard:

Patient Dashboard: Appointments, documents, prescriptions, billing

Doctor Dashboard: Appointments, patient history, prescriptions

Staff Dashboard: Task management and scheduling support

Admin Dashboard: User management, approvals, analytics

Detailed workflows and screenshots are available in the project documentation 

HealthHub Management System

🧱 Tech Stack
Frontend

React.js

React Router

Axios

CSS (modern responsive UI)

Backend

Node.js

Express.js

JWT Authentication

REST APIs

Database

MongoDB Atlas

Deployment

Frontend: Vercel

Backend: Render

🔒 Security Features

Password hashing

JWT-based authentication

Role-Based Access Control (RBAC)

Secure API communication

📂 Repository Structure
Healthhub-Management-System/
│
├── healthhub-frontend/   # React frontend
├── healthhub-backend/    # Node + Express backend
├── PROJECT_DOCUMENTATION.md
└── README.md

🚀 Getting Started Locally
1️⃣ Clone Repository
git clone https://github.com/Shankar3423-web/Healthhub-Management-System.git
cd Healthhub-Management-System

2️⃣ Start Backend
cd healthhub-backend
npm install
npm start

3️⃣ Start Frontend
cd healthhub-frontend
npm install
npm start


Frontend runs on:

http://localhost:3000

📄 Documentation

A detailed project documentation with workflow explanations and screenshots is available here:

https://1drv.ms/w/c/804837ee065cec3e/IQBYOTghRQdjQ7j1uS-gBt4TAR2wMAJufpcUqW1U2ReJAOA?e=T5MniN --> HealthHub Management System

🎯 Conclusion

The HealthHub Management System modernizes hospital management by integrating secure authentication, role-based dashboards, appointment scheduling, document handling, and administrative approvals into a single scalable platform. With cloud deployment and a user-friendly design, the system is production-ready and suitable for real-world healthcare environments.

👨‍💻 Author

Shankar
🔗 GitHub: https://github.com/Shankar3423-web

🔗 LinkedIn: www.linkedin.com/in/neredimelli-shankar-964527371
