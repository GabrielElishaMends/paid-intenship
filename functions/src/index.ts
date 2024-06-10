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

// The email sending function
export const sendEmailNotification = functions.firestore
  .document('applications/{applicationId}')
  .onCreate(async (snapshot, context) => {
    const applicationData = snapshot.data();

    const mailOptions = {
      from: functions.config().email.username,
      to: functions.config().email.company, // Use the environment variable
      subject: 'New Internship Application Received',
      text: `You have received a new internship application from ${applicationData.fullName}.
      Email: ${applicationData.email}
      Phone: ${applicationData.phone}
      Institution: ${applicationData.institution}
      Degree Program: ${applicationData.degreeProgram}
      Year of Study: ${applicationData.yearOfStudy}
      LinkedIn: ${applicationData.linkedin}
      Portfolio: ${applicationData.portfolio}
      Experience: ${applicationData.experience}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
