import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentStatusService } from '../../services/appointment-status.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-appointment-status',
  templateUrl: './appointment-status.component.html',
  styleUrl: './appointment-status.component.scss'
})
export class AppointmentStatusComponent implements OnInit{
  patientIdentityNumber:string="";
  errorMessage: string="";
  appointments: any[] = [];
  specialtyId: string = "";
  specialties: any[] = [];
  doctorId: string="";
  doctors: any[]=[];

  constructor(private http: HttpClient){ }

  
  ngOnInit(): void {
    this.http.get("http://localhost:8080/api/specialties")
    .subscribe((data: any) => {
      this.specialties = data;
    });
  }

  search(){
    if (!this.patientIdentityNumber) {
      this.errorMessage = "Kimlik numarası boş olamaz!";
      this.clearMessages();
      return;
    }

    console.log(this.patientIdentityNumber);

    let bodyData= {
      "patientIdentityNumber":this.patientIdentityNumber
    };

    this.http.post<any[]>("http://localhost:8080/api/appointments/patient/" + this.patientIdentityNumber, bodyData)
      .subscribe((data: any[]) => {
        if (data && data.length > 0) {
          this.appointments = data;  // Randevuları sakla
          this.errorMessage = "";  // Hata mesajını temizle
        } else {
          this.appointments = [];
          this.errorMessage = "Randevu bulunamadı.";  // Eğer randevu yoksa hata mesajı göster
          this.clearMessages();
        }
      },
      (error) => {
        this.errorMessage = "Randevu Bulunamadı.";
        this.clearMessages();
        this.appointments = [];
      });

  }
  clearMessages() {
    setTimeout(() => {
      this.errorMessage = "";
    }, 5000); 
  }
}
