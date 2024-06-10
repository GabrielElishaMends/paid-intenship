// src/services/companyService.ts

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface CompanyInfo {
  id: string;
  companyName: string;
  location: string;
  email: string;
  phone: string;
  description: string;
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
    };
  });
  return companyList;
};
