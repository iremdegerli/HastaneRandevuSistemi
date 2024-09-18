import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { SpecialtyService } from '../../services/specialty.service';
import { HttpClient } from '@angular/common/http';
import { WorkingHoursService } from '../../services/working-hours.service';
import { WorkingHours } from '../../models/working-hours.model';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'doctor-admin-panel',
  templateUrl: './doctor-panel.component.html',
  styleUrls: ['./doctor-panel.component.scss']
})
export class DoctorPanelComponent implements OnInit {
  currentUser:any;

  appointments: any[] = []; // Randevuların listeleneceği dizi
  workingHours: WorkingHours[] = []; // Çalışma saatlerini saklamak için bir dizi
  workingHoursList: any[] = []; // List of working hours
  selectedHourId: number | null = null; // Selected working hour ID

  showAppointmentList: boolean = false; 
  showHoursList:boolean=false;
  showAddHours:boolean=false;
  showUpdateHours:boolean=false;
  showDeleteHours:boolean=false;
  selectedUpdateHourId: number | null = null; 
  updatedStartTime: string = '';
  updatedEndTime: string = ''; 

  errorMessage: string = "";
  message: string = "";

  updateForm: FormGroup;
  hours: number[] = []; // Saat aralığı dizisi

  newWorkingHour: WorkingHours = {
    id: 0,
    doctor: { id: 0 },
    date: '',
    startTime: '',
    endTime: '',
    isOccupied: false,
    additionalHours: []
  };

  constructor(private http: HttpClient, private as:AuthService, private ds: DoctorService, private ws:WorkingHoursService, private fb:FormBuilder) {
    this.updateForm = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }
   

  ngOnInit(): void {
    this.loadAppointments();
    this.hours = this.hoursRange(8, 18);
    
    this.currentUser=this.as.currentUserValue;

  }

  hoursRange(start: number, end: number): number[] {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }


  getHourClass(hour: number, workingHour: WorkingHours, appointments: any[]): string {
    const startHour = +workingHour.startTime.split(':')[0]; 
    const endHour = +workingHour.endTime.split(':')[0]; 
    const isWorking = hour >= startHour && hour <= endHour;
  
    const isAdditionalWorking = workingHour.additionalHours.some(addHour => {
      const addStartHour = +addHour.startTime.split(':')[0];
      const addEndHour = +addHour.endTime.split(':')[0];
      return hour >= addStartHour && hour < addEndHour;
    });
  
    const isAppointment = appointments.some(appointment => {
      const appointmentDate = new Date(appointment.appointmentDate);
      const appointmentHour = appointmentDate.getHours();
      return appointmentDate.toDateString() === new Date(workingHour.date).toDateString() &&
             appointmentHour === hour;
    });
  
    if (isAppointment) {
      return 'appointment-hour'; 
    } else if (isAdditionalWorking) {
      return 'non-working-hour'; 
    } else if (isWorking) {
      return 'working-hour'; 
    } else {
      return 'non-working-hour';
    }
  }
  

  AppointmentOn() {
    this.showAppointmentList = !this.showAppointmentList;
    this.showHoursList=false;
    this.showAddHours=false;
    this.showUpdateHours=false;
    this.showDeleteHours=false;
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

    this.workingHoursload();
  }
  DeleteHoursOn(){
    this.showDeleteHours=!this.showDeleteHours;
    this.showUpdateHours=false;
    this.showAppointmentList = false;
    this.showAddHours=false;

    this.workingHoursload();

  }
 
  loadAppointments() {
    const currentUser = this.as.currentUserValue;
    if (currentUser && currentUser.id) {
      this.ds.getAppointmentsByDoctor(currentUser.id).subscribe(
        (data) => {
          this.appointments = data;
          this.loadWorkingHours(); 
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
          this.workingHours = this.sortWorkingHoursByDate(data);
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
  sortWorkingHoursByDate(workingHours: WorkingHours[]): WorkingHours[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
  
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 6); 
  
    return workingHours
      .filter(wh => {
        const whDate = new Date(wh.date);
        whDate.setHours(0, 0, 0, 0); 
        return whDate >= today && whDate <= maxDate;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); 
  }
  
  workingHoursload() {
    const doctorId = this.as.currentUserValue.id; 
    this.ws.getWorkingHoursByDoctor(doctorId).subscribe(
      (response: any) => {
        this.workingHoursList = response;
      },
      (error) => {
        console.error('Error loading working hours:', error);
      }
    );
  }

  deleteWorkingHours() {
    if (this.selectedHourId !== null) {
      this.ws.deleteWorkingHours(this.selectedHourId).subscribe(
        () => {
          this.message="Çalışma saati başarıyla silindi.";
          this.loadWorkingHours();
          this.clearMessages();

        },
        (error) => {
          console.error('Error deleting working hours:', error);
          
        }
      );
    }
  }

  updateWorkingHours() {
    const currentUser = this.as.currentUserValue;
    if (currentUser && currentUser.id && this.selectedUpdateHourId) {
      this.newWorkingHour.doctor.id = currentUser.id;
      this.ws.updateWorkingHours(this.selectedUpdateHourId, this.newWorkingHour).subscribe(
        (response) => {
          this.message = "Çalışma saati başarıyla güncellendi.";
          this.clearMessages();
          this.loadWorkingHours();
        },
        (error) => {
          this.errorMessage = "Çalışma saati güncellenirken bir hata oluştu.";
          this.clearMessages();
          console.error('Error updating working hours:', error);
        }
      );
    } else {
      this.errorMessage = "Güncelleme için gerekli bilgiler eksik.";
      this.clearMessages();
    }
  }
  onHourSelectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedHourId = Number(target.value);
  
    // Seçilen saat ID'sini güncelle
    this.selectedHourId = selectedHourId;
  
    // Seçilen saat bilgisini bulma işlemi
    const selectedHour = this.workingHours.find(hour => hour.id === selectedHourId);
  
    if (selectedHour) {
      // Güncelleme formunu doldur
      this.newWorkingHour.date = selectedHour.date;
      this.newWorkingHour.startTime = selectedHour.startTime;
      this.newWorkingHour.endTime = selectedHour.endTime;
    } else {
      console.error('Seçilen çalışma saati bulunamadı.');
    }
  }
  
  
  onAddHours() {
    const currentUser = this.as.currentUserValue;
    if (currentUser && currentUser.id) {
      this.newWorkingHour.doctor.id = currentUser.id;
      this.ws.addWorkingHours(this.newWorkingHour).subscribe(
        (data) => {
          this.message = "Çalışma saati başarıyla eklendi.";
          this.loadWorkingHours();
          this.clearMessages();
        },
        (error) => {
          this.errorMessage = "Çalışma saati eklenirken bir hata oluştu.";
          this.clearMessages();
          console.error('Error adding working hours:', error);
        }
      );
    } else {
      this.errorMessage = "Kullanıcı bilgileri mevcut değil.";
      this.clearMessages();
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
