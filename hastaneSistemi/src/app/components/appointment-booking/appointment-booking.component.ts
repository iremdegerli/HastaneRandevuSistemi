import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { debug } from 'console';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrl: './appointment-booking.component.scss'
})

export class AppointmentBookingComponent implements OnInit {
  patientName : string = "";
  patientSurname : string = "";
  patientIdentityNumber : string = "";
  specialtyId :string="";
  specialties: any[] = [];
  doctorId: string = "";
  doctors: any[]=[];
  errorMessage: string="";
  appointmentDate: string="json";
 
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/api/specialties")
      .subscribe((data: any) => {
        this.specialties = data;
    });
  }

  onSpecialtyChange() {
    if (this.specialtyId) {
      
      this.http.get(`http://localhost:8080/api/doctors/specialty/${this.specialtyId}`)
        .subscribe((data: any) => {
          this.doctors = data;  // Doktorları güncelle
        });
    }
  }
  create(){
    let bodyData= {
      "patientName": this.patientName,
      "patientSurname":this.patientSurname,
      "patientIdentityNumber":this.patientIdentityNumber,
      "specialty": {id: this.specialtyId},
      "doctor": { id: this.doctorId },
      "appointmentDate":this.appointmentDate
    };

    if (!this.patientName || !this.patientSurname || !this.patientIdentityNumber|| !this.doctorId|| !this.specialtyId || !this.appointmentDate) {
      this.errorMessage = "Lütfen tüm alanları doldurduğunuzdan emin olun!";
      return;
    }

    this.http.post("http://localhost:8080/api/appointments",bodyData,{responseType: 'text'}).subscribe((data:any)=>
      {console.log(data);
        console.log(data);
        alert("Randevu kaydı başarılı!");
      },
      (error) => {
        console.error('Hata oluştu:', error);
        alert("Randevu alma sırasında bir hata oluştu, lütfen tekrar deneyin.");
      }
      );
    

  }
}