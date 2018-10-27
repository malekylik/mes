import { Cursor } from 'mongodb';

import { Database } from './Database'; 
import { Patient } from '../interfaces/patient';
import { COLLECTIONS } from '../consts/database';

export class PatientsApi {
    static async getPatients(): Promise<Cursor<Patient>> {
        return (await Database.getDB())
                .collection(COLLECTIONS.Patients)
                .find();
    }
} 
