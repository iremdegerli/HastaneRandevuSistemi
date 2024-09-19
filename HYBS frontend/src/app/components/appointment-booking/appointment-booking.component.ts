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
  
    // Başlangıç ve bitiş saatleri arasındaki tüm saatleri availableHours'a ekle
    this.availableHours = [];
    for (let i = +startHour; i <= +endHour; i++) {
      this.availableHours.push(i + ":00");
    }
  
    // Eğer ek saatler varsa, bu saat aralıklarını availableHours'dan çıkar
    if (workingHours.additionalHours && workingHours.additionalHours.length > 0) {
      workingHours.additionalHours.forEach((additionalHour: any) => {
        const additionalStart = +additionalHour.startTime.split(':')[0];
        const additionalEnd = +additionalHour.endTime.split(':')[0];
  
        // Ek saat aralığını availableHours'dan çıkar
        this.availableHours = this.availableHours.filter(hour => {
          const hourInt = +hour.split(':')[0];
          return !(hourInt >= additionalStart && hourInt <= additionalEnd);
        });
      });
    }

    this.http.get<any[]>(`http://localhost:8080/api/appointments/doctors/${this.doctorId}`)
    .subscribe((appointments: any[]) => {

      const selectedAppointments = appointments.filter(appointment => {
        return new Date(appointment.appointmentDate).toISOString().slice(0, 10) === this.selectedDate;
      });


      selectedAppointments.forEach(appointment => {
        const appointmentHour = appointment.appointmentDate.split('T')[1].slice(0, 2) + ":00"; 
        this.availableHours = this.availableHours.filter(hour => hour !== appointmentHour);
      });
    });
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
  
    // Kimlik numarası ile randevuları kontrol et
    this.http.get<any[]>(`http://localhost:8080/api/appointments/patient/${this.patientIdentityNumber}`)
      .subscribe(
        (appointments: any[]) => {
          if (appointments.length > 0) {
            // Aynı kimlik numarasına sahip bir randevu varsa isim ve soyisim kontrol et
            const existingAppointment = appointments[0]; // İlk randevuya göre kontrol yapılabilir
  
            if (existingAppointment.patientName !== this.patientName || existingAppointment.patientSurname !== this.patientSurname) {
              // İsim ya da soyisim farklıysa hata mesajı göster
              this.errorMessage = "Girilen kimlik numarasıyla daha önce farklı bir isim ve soyisimle randevu alınmış.";
              this.clearMessages();
              return;
            }
          }
  
          // İsim ve soyisim aynıysa ya da hiç randevu alınmamışsa randevu oluştur
          const appointmentDate = new Date(`${this.selectedDate}T${this.selectedHour}:00`);
          appointmentDate.setHours(appointmentDate.getHours() + 3); // +3 saat farkı
  
          let bodyData = {
            "patientName": this.patientName,
            "patientSurname": this.patientSurname,
            "patientIdentityNumber": this.patientIdentityNumber,
            "specialtyId": this.specialtyId,
            "doctorId": this.doctorId,
            "appointmentDate": appointmentDate
          };
  
          // Randevu oluşturma isteği
          this.http.post("http://localhost:8080/api/appointments", bodyData, { responseType: 'text' })
            .subscribe(
              (data: any) => {
                this.message = "Randevu başarıyla oluşturuldu.";
                this.clearMessages();
              },
              (error) => {
                this.errorMessage = "Randevu alma sırasında bir hata oluştu, lütfen tekrar deneyin.";
                this.clearMessages();
              });
        },
        (error) => {
          console.error('Hata oluştu:', error);
          this.errorMessage = "Kimlik numarasıyla randevu kontrolü sırasında bir hata oluştu.";
          this.clearMessages();
        }
      );
  }
  
  clearMessages() {
    setTimeout(() => {
      this.errorMessage = "";
      this.message = "";
    }, 5000); 
  }
}
