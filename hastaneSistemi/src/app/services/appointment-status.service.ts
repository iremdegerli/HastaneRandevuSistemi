import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentStatusService {
  private apiUrl='http://localhost:8080/api/appointments/search'
  
  constructor(private http: HttpClient) { }

  getAppointments(identityNumber:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/search?identityNumber=${identityNumber}`);
  }
}

