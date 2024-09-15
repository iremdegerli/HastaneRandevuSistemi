// src/app/services/working-hours.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkingHours } from '../models/working-hours.model';

@Injectable({
  providedIn: 'root'
})
export class WorkingHoursService {
  private baseUrl = 'http://localhost:8080/api/working-hours'; // Base URL

  constructor(private http: HttpClient) {}

  getWorkingHoursByDoctor(doctorId: number): Observable<WorkingHours[]> {
    return this.http.get<WorkingHours[]>(`${this.baseUrl}/doctor/${doctorId}`);
  }
}
