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

  newWorkingHour: WorkingHours = {
    id: 0,
    doctor: { id: 0 },
    date: '',
    startTime: '',
    endTime: '',
    isOccupied: false,
    additionalHours: []
  };


  constructor(private http: HttpClient, private as:AuthService, private ds: DoctorService, private ws:WorkingHoursService) { }

  ngOnInit(): void {
    this.loadAppointments();
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
        },
        (error) => {
          this.errorMessage = "Randevular yüklenirken bir hata oluştu.";
          this.clearMessages();

          console.error('Error loading appointments:', error);
        }
      );
    } else {
      this.errorMessage = "Kullanıcı bilgileri mevcut değil.";
      this.clearMessages();

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
          this.clearMessages();

        }
      );
    } else {
      this.errorMessage = "Kullanıcı bilgileri mevcut değil.";
      this.clearMessages();

    }
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
          this.message="Çalışma saati başarıyla silindi."
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
    // Gerekli alanları kontrol edin
    if (!this.selectedUpdateHourId || !this.updatedStartTime || !this.updatedEndTime) {
      this.errorMessage = 'Lütfen tüm alanları doldurun.';
      this.clearMessages();

      return;
    }
  
    // Seçilen saatlerin bilgilerini almak için API'den getirilmesi gerekebilir
    const selectedHour = this.workingHours.find(hour => hour.id === this.selectedUpdateHourId);
  
    // Eğer seçili saat bulunamazsa hata mesajı göster
    if (!selectedHour) {
      this.errorMessage = 'Seçilen çalışma saati bulunamadı.';
      this.clearMessages();

      return;
    }
  
    // Güncelleme için payload oluşturun
    const updatePayload = {
      id: this.selectedUpdateHourId, // Güncellenen saatin ID'si
      doctor: { id: this.as.currentUserValue.id }, // Güncelleyen doktorun ID'si
      date: selectedHour.date, // Güncellenmeyecek tarih
      startTime: this.updatedStartTime, // Yeni başlangıç saati
      endTime: this.updatedEndTime, // Yeni bitiş saati
      isOccupied: selectedHour.isOccupied, // Mevcut isOccupied değeri
      additionalHours: [] // Ek saatler temizlenecek
    };
  
    // Güncelleme isteğini gönder
    this.ws.updateWorkingHours(this.selectedUpdateHourId, updatePayload).subscribe(
      () => {
        this.message = 'Çalışma saati başarıyla güncellendi.';
        this.clearMessages();
        this.loadWorkingHours(); // Güncel çalışma saatlerini yeniden yükleyin
      },
      (error) => {
        console.error('Error updating working hours:', error);
        this.errorMessage = 'Çalışma saati güncellenirken bir hata oluştu.';
        this.clearMessages();
      }
    );
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
