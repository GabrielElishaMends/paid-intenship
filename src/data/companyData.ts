// src/services/companyData.ts
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface CompanyInfo {
  id: string;
  companyName: string;
  location: string;
  email: string;
  phone: string;
  description: string;
  salary: string;
  internshipType: string;     
  duration: string;           
  applicationDeadline: string;
  ownerId: string; // Field to track ownership
}

export const fetchCompanies = async (): Promise<CompanyInfo[]> => {
  const companiesCollection = collection(db, 'companies');
  const companySnapshot = await getDocs(companiesCollection);
  const companyList = companySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      companyName: data.companyName,
      location: data.location,
      email: data.email,
      phone: data.phone,
      description: data.description,
      salary: data.salary,
      internshipType: data.internshipType,        
      duration: data.duration,                   
      applicationDeadline: data.applicationDeadline,
      ownerId: data.ownerId 
    } as CompanyInfo;
  });
  return companyList;
};

export const addCompany = async (company: CompanyInfo) => {
  const companiesCollection = collection(db, 'companies');
  await addDoc(companiesCollection, {
    companyName: company.companyName,
    location: company.location,
    email: company.email,
    phone: company.phone,
    description: company.description,
    salary: company.salary,
    internshipType: company.internshipType,        
    duration: company.duration,                   
    applicationDeadline: company.applicationDeadline,
    ownerId: company.ownerId 
  });
};
