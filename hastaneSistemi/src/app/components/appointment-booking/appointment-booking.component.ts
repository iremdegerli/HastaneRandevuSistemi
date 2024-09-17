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
  message: string = "";
  appointmentDate: string = ""; 
  workingHours: any[] = [];
  availableDates: any[] = [];
  availableHours: string[] = [];
  selectedDate: string = "";
  selectedHour: string = "";
  minDate: string = "";
  maxDate: string = "";

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

  onDoctorChange() {
    if (this.doctorId) {
      this.http.get(`http://localhost:8080/api/working-hours/doctor/${this.doctorId}`)
        .subscribe((data: any) => {
          this.workingHours = data;
          this.setAvailableDates();
        });
    }
  }

  setAvailableDates() {
    const today = new Date();
    this.availableDates = this.workingHours.map(wh => new Date(wh.date))
      .filter(date => date >= today)
      .sort((a, b) => a.getTime() - b.getTime());
    
    if (this.availableDates.length > 0) {
      this.minDate = this.formatDate(this.availableDates[0]);
      this.maxDate = this.formatDate(this.availableDates[this.availableDates.length - 1]);
    }
  }

  onDateChange() {
    const selectedWorkingHours = this.workingHours.find(wh => new Date(wh.date).toISOString().slice(0, 10) === this.selectedDate);
    if (selectedWorkingHours) {
      this.setAvailableHours(selectedWorkingHours);
    }
  }

  setAvailableHours(workingHours: any) {
    const startHour = workingHours.startTime.split(':')[0];
    const endHour = workingHours.endTime.split(':')[0];
    this.availableHours = [];
    for (let i = +startHour; i <= +endHour; i++) {
      this.availableHours.push(i + ":00");
    }
  }

  formatDate(date: Date): string {
    const pad = (num: number) => (num < 10 ? '0' + num : num);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  create() {
    if (!this.patientName || !this.patientSurname || !this.patientIdentityNumber || !this.doctorId || !this.specialtyId || !this.selectedDate || !this.selectedHour) {
      this.errorMessage = "Lütfen tüm alanları doldurduğunuzdan emin olun!";
      this.clearMessages();
      return;
    }

    const appointmentDate = new Date(`${this.selectedDate}T${this.selectedHour}:00`);
    console.log("Form verisi:", {
      patientName: this.patientName,
      patientSurname: this.patientSurname,
      patientIdentityNumber: this.patientIdentityNumber,
      doctorId: this.doctorId,
      specialtyId: this.specialtyId,
      appointmentDate: this.appointmentDate
    });

    let bodyData = {
      "patientName": this.patientName,
      "patientSurname": this.patientSurname,
      "patientIdentityNumber": this.patientIdentityNumber,
      "specialtyId":  this.specialtyId,
      "doctorId": this.doctorId,
      "appointmentDate": appointmentDate.toISOString()
    };


    this.http.post("http://localhost:8080/api/appointments", bodyData, { responseType: 'text' })
    .subscribe(
      (data: any) => {
        console.log("Randevu oluşturma başlatıldı.");

        console.log(data);
        this.message = "Randevu başarıyla oluşturuldu.";
        this.clearMessages();
      },
      (error) => {
        console.error('Hata oluştu:', error);
        this.errorMessage = "Randevu alma sırasında bir hata oluştu, lütfen tekrar deneyin.";
        this.clearMessages();
      });
  }

  clearMessages() {
    setTimeout(() => {
      this.errorMessage = "";
      this.message = "";
    }, 5000); 
  }
}
