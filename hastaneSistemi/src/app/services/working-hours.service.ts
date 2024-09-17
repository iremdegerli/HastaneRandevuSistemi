// src/app/services/working-hours.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkingHours } from '../models/working-hours.model';

@Injectable({
  providedIn: 'root'
})
export class WorkingHoursService {
  private apiUrl = 'http://localhost:8080/api/working-hours'; // Base URL

  constructor(private http: HttpClient) {}

  getWorkingHoursByDoctor(doctorId: number): Observable<WorkingHours[]> {
    return this.http.get<WorkingHours[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }
  addWorkingHours(workingHours: WorkingHours): Observable<WorkingHours> {
    return this.http.post<WorkingHours>(this.apiUrl, workingHours);
  }

  deleteWorkingHours(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateWorkingHours(id: number, workingHour: WorkingHours) {
    return this.http.put(`${this.apiUrl}/${id}`, workingHour);
  }
  
  
}
