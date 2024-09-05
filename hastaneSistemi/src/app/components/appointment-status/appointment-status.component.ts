import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentStatusService } from '../../services/appointment-status.service';
@Component({
  selector: 'app-appointment-status',
  templateUrl: './appointment-status.component.html',
  styleUrl: './appointment-status.component.scss'
})
export class AppointmentStatusComponent implements OnInit{
  searchForm!: FormGroup;
  appointments: any[]=[];

  constructor(private fb:FormBuilder, private appointmentStatusService: AppointmentStatusService){ }

  
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      identityNumber: ['', [Validators.required, Validators.minLength(11)]]
    });
  }
  onSearch() {
    if (this.searchForm.valid) {
      this.appointmentStatusService.getAppointments(this.searchForm.value.identityNumber).subscribe(
        response => {
          this.appointments = response;
        },
        error => {
          console.error('Randevu sorgulama sırasında hata oluştu:', error);
        }
      );
    }
  }


}
