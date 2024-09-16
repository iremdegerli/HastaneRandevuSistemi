import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { SpecialtyService } from '../../services/specialty.service';
import { HttpClient } from '@angular/common/http';
import { WorkingHoursService } from '../../services/working-hours.service';
import { WorkingHours } from '../../models/working-hours.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'doctor-admin-panel',
  templateUrl: './doctor-panel.component.html',
  styleUrls: ['./doctor-panel.component.scss']
})
export class DoctorPanelComponent implements OnInit {
  appointments: any[] = []; // Randevuların listeleneceği dizi
  workingHours: WorkingHours[] = []; // Çalışma saatlerini saklamak için bir dizi

  showAppointmentList: boolean = false; 
  showHoursList:boolean=false;
  showAddHours:boolean=false;
  showUpdateHours:boolean=false;
  showDeleteHours:boolean=false;

  errorMessage: string = "";
  message: string = "";

  newWorkingHour: WorkingHours = {
    doctor: { id: 0 },
    date: '',
    startTime: '',
    endTime: '',
    isOccupied: false,
    additionalHours: []
  };


  constructor(private http: HttpClient, private as:AuthService, private ds: DoctorService, private ws:WorkingHoursService) { }

  ngOnInit(): void {

  }


  AppointmentOn() {
    this.showAppointmentList = !this.showAppointmentList;
    this.showHoursList=false;
    this.showAddHours=false;
    this.showUpdateHours=false;
    this.showDeleteHours=false;

    if (this.showAppointmentList) {
      this.loadAppointments();
    }
  }

  HoursOn(){
    this.showHoursList=!this.showHoursList;
    this.showAppointmentList = false;
    this.showAddHours=false;
    this.showUpdateHours=false;
    this.showDeleteHours=false;

    if (this.showHoursList) {
      this.loadWorkingHours();
    }
  }
  AddHoursOn(){
    this.showAddHours=!this.showAddHours;
    this.showAppointmentList = false;
    this.showUpdateHours=false;
    this.showDeleteHours=false;
  }
  UpdateHoursOn(){
    this.showUpdateHours=!this.showUpdateHours;
    this.showAppointmentList = false;
    this.showAddHours=false;
    this.showDeleteHours=false;
  }
  DeleteHoursOn(){
    this.showDeleteHours=!this.showDeleteHours;
    this.showUpdateHours=false;
    this.showAppointmentList = false;
    this.showAddHours=false;
  }
 
  loadAppointments() {
    const currentUser = this.as.currentUserValue;
    if (currentUser && currentUser.id) {
      this.ds.getAppointmentsByDoctor(currentUser.id).subscribe(
        (data) => {
          this.appointments = data;
        },
        (error) => {
          this.errorMessage = "Randevular yüklenirken bir hata oluştu.";
          console.error('Error loading appointments:', error);
        }
      );
    } else {
      this.errorMessage = "Kullanıcı bilgileri mevcut değil.";
    }
  }

  loadWorkingHours() {
    const currentUser = this.as.currentUserValue;
    if (currentUser && currentUser.id) {
      this.ws.getWorkingHoursByDoctor(currentUser.id).subscribe(
        (data) => {
          this.workingHours = data;
        },
        (error) => {
          this.errorMessage = "Çalışma saatleri yüklenirken bir hata oluştu.";
          console.error('Error loading working hours:', error);
        }
      );
    } else {
      this.errorMessage = "Kullanıcı bilgileri mevcut değil.";
    }
  }

  onAddHours() {
    const currentUser = this.as.currentUserValue;
    if (currentUser && currentUser.id) {
      this.newWorkingHour.doctor.id = currentUser.id;
      this.ws.addWorkingHours(this.newWorkingHour).subscribe(
        (data) => {
          this.message = "Çalışma saati başarıyla eklendi.";
          this.loadWorkingHours(); // Güncellenmiş çalışma saatlerini yeniden yükle
          this.clearMessages();
        },
        (error) => {
          this.errorMessage = "Çalışma saati eklenirken bir hata oluştu.";
          console.error('Error adding working hours:', error);
        }
      );
    } else {
      this.errorMessage = "Kullanıcı bilgileri mevcut değil.";
    }
  }

  addAdditionalHour() {
    this.newWorkingHour.additionalHours.push({ startTime: '', endTime: '' });
  }

  removeAdditionalHour(index: number) {
    this.newWorkingHour.additionalHours.splice(index, 1);
  }



  
  clearMessages() {
    setTimeout(() => {
      this.errorMessage = "";
      this.message = "";
    }, 5000); 
  }
}
