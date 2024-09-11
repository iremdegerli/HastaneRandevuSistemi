import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private apiUrl = 'http://localhost:8080/api/specialties'; 

  constructor(private http: HttpClient) {}

  getSpecialties(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteSpecialty(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}