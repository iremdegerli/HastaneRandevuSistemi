import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.scss']
})

export class AppointmentBookingComponent implements OnInit {
  patientName: string = "";
  patientSurname: string = "";
  patientIdentityNumber: string = "";
  specialtyId: string = "";
  specialties: any[] = [];
  doctorId: string = "";
  doctors: any[] = [];
  errorMessage: string = "";
  message: string="";
  appointmentDate: string = ""; 

  constructor(private http: HttpClient) { }

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
          this.doctors = data;
        });
    }
  }

  formatDateTime(date: Date): string {
    const pad = (num: number) => (num < 10 ? '0' + num : num);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  create() {
    if (!this.patientName || !this.patientSurname || !this.patientIdentityNumber || !this.doctorId || !this.specialtyId || !this.appointmentDate) {
      this.errorMessage = "Lütfen tüm alanları doldurduğunuzdan emin olun!";
      return;
    }

    // appointmentDate string olduğu için önce Date nesnesine çevirelim
    const date = new Date(this.appointmentDate);  // Eğer string formatı uygun değilse burada hata verebilir.

    if (isNaN(date.getTime())) {
      this.errorMessage = "Geçersiz tarih formatı!";
      return;
    }

    // Tarihi uygun formata çevir
    const formattedDate = this.formatDateTime(date);

    let bodyData = {
      "patientName": this.patientName,
      "patientSurname": this.patientSurname,
      "patientIdentityNumber": this.patientIdentityNumber,
      "specialtyId":  this.specialtyId ,
      "doctorId": this.doctorId ,
      "appointmentDate": formattedDate,
    };

    this.http.post("http://localhost:8080/api/appointments", bodyData, { responseType: 'text' })
      .subscribe(
        (data: any) => {
          console.log(data);
          this.message="Randevu başarıyla oluşturuldu.";
        },
        (error) => {
          console.log(bodyData);
          console.error('Hata oluştu:', error);
          this.errorMessage = "Randevu alma sırasında bir hata oluştu, lütfen tekrar deneyin.";
        }
      );
  }
}
