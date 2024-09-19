import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkingHours } from '../models/working-hours.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8080/api'; // API endpointini güncelle

  constructor(private http: HttpClient) {}

  getDoctorsBySpecialty(specialtyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/doctors/specialty/${specialtyId}`);
  }

  getDoctors():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/doctors`);
  }

  getDoctorById(doctorId:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/users/${doctorId}`)
  }

  getAppointmentsByDoctor(doctorId:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/appointments/doctors/${doctorId}`)
  }

  getDoctorWorkingHours(doctorId: number): Observable<WorkingHours[]> {
    return this.http.get<WorkingHours[]>(`${this.apiUrl}/working-hours/doctor/${doctorId}`);
  }
}

