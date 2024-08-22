import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export const applyForInternship = async (
  studentId: string, 
  internshipId: string, 
  companyId: string, 
  studentName: string, 
  studentEmail: string,
  phone: string,
  currentInstitution: string,
  degreeProgram: string,
  yearOfStudy: string,
  linkedin: string,
  portfolio: string,
  experience: string,
  resumeUrl: string,
  certificationsUrls: string[] // Array of URLs for certifications
) => {
  try {
    // Add application document
    await addDoc(collection(db, 'applications'), {
      studentId,
      internshipId,
      companyId,
      applicationDate: new Date(),
      resume: resumeUrl,
      certifications: certificationsUrls
    });

    // Add notification document
    await addDoc(collection(db, 'notifications'), {
      companyId,
      studentId,
      internshipId,
      studentName,
      studentEmail,
      phone,
      currentInstitution,
      degreeProgram,
      yearOfStudy,
      linkedin,
      portfolio,
      experience,
      resume: resumeUrl,
      certifications: certificationsUrls,
      applicationDate: new Date()
    });

    console.log('Application and notification created successfully');
  } catch (error) {
    console.error('Error applying for internship:', error);
  }
};
