import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

// Initialize Firebase Admin SDK
admin.initializeApp();

// Configure the email transporter using nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.username,
    pass: functions.config().email.password,
  },
});

// Cloud Function to trigger on Firestore document creation
exports.sendApplicationEmail = functions.firestore
  .document('applications/{applicationId}')
  .onCreate(async (snapshot, context) => {
    const applicationData = snapshot.data();

    if (!applicationData) {
      console.error('No application data found');
      return;
    }

    const mailOptionsToCompany = {
      from: functions.config().email.username,
      to: functions.config().email.company,
      subject: 'New Internship Application Received',
      text: `Dear Company,

You have received a new internship application from ${applicationData.fullName}.

Here are the details of the application:

- Full Name: ${applicationData.fullName}
- Phone: ${applicationData.phone}
- Email: ${applicationData.email}
- Current Institution: ${applicationData.currentInstitution}
- Degree Program: ${applicationData.degreeProgram}
- Year of Study: ${applicationData.yearOfStudy}
- LinkedIn: ${applicationData.linkedin}
- Portfolio: ${applicationData.portfolio}
- Experience: ${applicationData.experience}

Please review the application and get back to the applicant shortly.

Best regards,
Your Company Name`,
    };

    const mailOptionsToStudent = {
      from: functions.config().email.username,
      to: applicationData.email,
      subject: 'Internship Application Received',
      text: `Dear ${applicationData.fullName},

Thank you for applying for an internship with us. Here are the details of your application:

- Full Name: ${applicationData.fullName}
- Phone: ${applicationData.phone}
- Email: ${applicationData.email}
- Current Institution: ${applicationData.currentInstitution}
- Degree Program: ${applicationData.degreeProgram}
- Year of Study: ${applicationData.yearOfStudy}
- LinkedIn: ${applicationData.linkedin}
- Portfolio: ${applicationData.portfolio}
- Experience: ${applicationData.experience}

We will review your application and get back to you shortly.

Best regards,
Your Company Name`,
    };

    try {
      await transporter.sendMail(mailOptionsToCompany);
      console.log('Email sent to company successfully');

      await transporter.sendMail(mailOptionsToStudent);
      console.log('Email sent to student successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
