import patientData from '../../data/patients.json';

import { PatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData as Array<PatientEntry>;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

export default {
  getEntries
};