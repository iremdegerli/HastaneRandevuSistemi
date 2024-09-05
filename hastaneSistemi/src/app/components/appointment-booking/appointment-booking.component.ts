import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentBookingService } from '../../services/appointment-booking.service';
import { SpecialtyService } from '../../services/specialty.service';
import { DoctorService } from '../../services/doctor.service';
@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrl: './appointment-booking.component.scss'
})


export class AppointmentBookingComponent implements OnInit {

  appointmentForm!: FormGroup;
  specialties: any[] = [];
  doctors: any[] = [];

  constructor(private fb: FormBuilder, private appointmentBookingService: AppointmentBookingService,  private doctorService: DoctorService, private specialtyService:SpecialtyService) { }

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      identityNumber: ['', [Validators.required, Validators.minLength(11)]],
      specialty: ['', Validators.required],
      doctor: ['', Validators.required],
      appointmentDate: ['', Validators.required], 
    });
  
// Specialties'leri çek
this.specialtyService.getSpecialties().subscribe(
  data => this.specialties = data,
  error => console.error('Error fetching specialties', error)
);

// Specialty seçildiğinde doktorları çek
this.appointmentForm.get('specialty')?.valueChanges.subscribe(specialtyId => {
  this.doctorService.getDoctorsBySpecialty(specialtyId).subscribe(
    data => this.doctors = data,
    error => console.error('Error fetching doctors', error)
  );
});
}


onSubmit() {
  if (this.appointmentForm.valid) {
    const formData = this.appointmentForm.value;

    // Appointment nesnesini gönder
    formData.isActive = new Date(formData.appointmentDate) > new Date();

    this.appointmentBookingService.bookAppointment(formData).subscribe(
      response => {
        console.log('Randevu başarıyla alındı:', response);
      },
      error => {
        console.error('Randevu alırken hata oluştu:', error);
      }
    );
  }
}
}
