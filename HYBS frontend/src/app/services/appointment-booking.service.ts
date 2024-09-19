import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppointmentBookingService {
  private apiUrl = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient) { }

  bookAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, appointmentData);
  }
}