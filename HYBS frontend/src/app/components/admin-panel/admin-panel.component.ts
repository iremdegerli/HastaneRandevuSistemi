import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { SpecialtyService } from '../../services/specialty.service';
import { HttpClient } from '@angular/common/http';
import { WorkingHoursService } from '../../services/working-hours.service';
import { WorkingHours } from '../../models/working-hours.model';
import { error } from 'node:console';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  showAddSpecialty: boolean = false;
  showDeleteSpecialty: boolean = false;
  showSpecialtyList: boolean = false; 
  showDoctorList:boolean=false;
  showDoctorInfo:boolean=false;
  showAppointment:boolean=false;
  showHoursList:boolean=false;

  errorMessage: string = "";
  message: string = "";

  specialtyId: string = ""; 
  specialties: any[] = []; 
  doctors: any[] = [];
  doctord: any[] = [];
  doctorId: string = "";
  workingHours: WorkingHours[] = []; 


  name: string = ""; //specialty.name
  selectedSpecialty: number | null = null;
  selectedSpecialtyName: string = ''; 
  selectedDoctor: any;
  selectedDoctorId: number | null = null;
  selectedDoctorName:string='';
  
  appointments: any[]=[];
  hours: number[] = [];


  constructor(private http: HttpClient, private ds: DoctorService, private ss: SpecialtyService, private ws: WorkingHoursService) { }

  ngOnInit(): void {
    this.getSpecialties();
    this.loadDoctors();
    this.hours = this.hoursRange(8, 18);
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
  
    // Randevu saatlerini kontrol et
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


  SpecialtyOn() {
    this.showSpecialtyList = !this.showSpecialtyList;
    this.showDeleteSpecialty=false;
    this.showAddSpecialty=false;
    this.showDoctorList=false;
  }

  AddOn() {
    this.showAddSpecialty = !this.showAddSpecialty;
    this.showDeleteSpecialty = false;
    this.showSpecialtyList = false;
    this.showDoctorList=false;
  }

  DeleteOn() {
    this.showDeleteSpecialty = !this.showDeleteSpecialty;
    this.showAddSpecialty = false;
    this.showSpecialtyList = false;
    this.showDoctorList=false;
  }

  DoctorsOn(){
    this.showDoctorList=!this.showDoctorList;
    this.showAddSpecialty = false;
    this.showDeleteSpecialty = false;
    this.showSpecialtyList = false;
    this.showDoctorInfo=false;
    this.showAppointment=false;
    this.showHoursList=false;

    this.getAllDoctors();

  }

  DoctorInfoOn(){
    this.showDoctorInfo=!this.showDoctorInfo;
    this.showAddSpecialty = false;
    this.showDeleteSpecialty = false;
    this.showSpecialtyList = false;
    this.showAppointment=false;
    this.showHoursList=false;
  }

  AppointmentOn(){
    this.showAppointment=!this.showAppointment;
    this.showAddSpecialty = false;
    this.showDeleteSpecialty = false;
    this.showSpecialtyList = false;
    this.showHoursList=false;
  }

  HoursOn(){
    this.showHoursList=!this.showHoursList;
    this.showAddSpecialty = false;
    this.showDeleteSpecialty = false;
    this.showSpecialtyList = false;
    this.showAppointment=false;

  }
  
  getSpecialties() {
    this.ss.getSpecialties().subscribe((data: any[]) => {
      this.specialties = data;
    });
  }

  getAllDoctors(){
    this.ds.getDoctors().subscribe((value:any[])=>{
      console.log(value);
      this.doctord=value;
    },
    error=>{
      console.error('error fetchin',error);
    }
  );
  }

  getDoctorsBySpecialty(specialtyId: number) {
    const selectedSpecialty = this.specialties.find(specialty => specialty.id === specialtyId);
    this.selectedSpecialtyName = selectedSpecialty ? selectedSpecialty.name : '';

    this.ds.getDoctorsBySpecialty(specialtyId).subscribe((data: any[]) => {
      this.doctors = data;
    });
  }

  getDoctorAppointments(doctorId: number) {
    this.selectedDoctor = this.doctord.find(doctor => doctor.id === doctorId) || null;
  
    this.ds.getAppointmentsByDoctor(doctorId).subscribe((appointments: any[]) => {
      this.appointments = appointments;
    }, (error) => {
      this.errorMessage = "Randevular getirilemedi.";
      this.clearMessages();
    });
  }
  

  getDoctorInfoById(doctorId: number) {
    this.selectedDoctor = this.doctord.find(doctor => doctor.id === doctorId) || null;
  
    if (this.selectedDoctor) {
      this.selectedDoctorName = `${this.selectedDoctor.name} ${this.selectedDoctor.surname}`;
    } else {
      this.selectedDoctorName = '';
    }
  }
  

  AddSpecialty() {
    if (!this.name) {
      this.errorMessage = "Lütfen eklemek istediğiniz alanın ismini girin!";
      this.clearMessages();
      return;
    }

    let bodyData = { "name": this.name };
    this.http.post("http://localhost:8080/api/specialties", bodyData, { responseType: 'text' })
      .subscribe((data: any) => {
        this.message = "Alan başarıyla eklendi.";
        this.getSpecialties(); 
        this.clearMessages();
      },
        (error) => {
          this.errorMessage = "Alan eklenemedi.";
          this.clearMessages();
        }
      );
  }

  DeleteSpecialty() {
    if (!this.specialtyId) {
      this.errorMessage = "Lütfen silmek istediğiniz alanı seçin!";
      this.clearMessages();
      return;
    }
    
    const id = Number(this.specialtyId); //sağlamlık kontrolü?

    this.ds.getDoctorsBySpecialty(id).subscribe(
      (doctors: any[]) => {
        console.log("Doktorlar: ", doctors); // Doktorları konsola yazdır
        if (doctors.length > 0) {
          this.errorMessage = "Bu alanda kayıtlı doktorlar olduğu için silme işlemi yapılamaz!";
          this.clearMessages();
          return;
        }
    
        this.ss.deleteSpecialty(id).subscribe(
          (data: any) => {
            this.message = "Alan başarıyla silindi.";
            this.getSpecialties();
            this.clearMessages();
          },
          (error) => {
            this.errorMessage = "Alan silinemedi.";
            this.getSpecialties();
            this.clearMessages();
          }
        );
      },
      (error) => {
        console.error("Doktor bilgisi alınırken hata: ", error); 
        this.errorMessage = "Doktor bilgisi alınamadı.";
        this.clearMessages();
      }
    );
    
  }

  GetDoctor(){
    if (!this.doctorId) {
      this.errorMessage = "Lütfen silmek istediğiniz alanı seçin!";
      this.clearMessages();
      return;
    }
  }

  loadDoctors(): void {
    this.http.get('/api/doctors',{ responseType: 'text' }).subscribe((data: any) => {
      this.doctord = data;
    },
    (error) => {
      console.error('HTTP Error', error);
    });
  }

  onDoctorChange(event: Event): void {
    const target = event.target as HTMLSelectElement; 
    const doctorId = Number(target.value); 
    this.getWorkingHoursByDoctor(doctorId);
    this.getDoctorAppointments(doctorId); 
    this.ds.getDoctorById(doctorId).subscribe((doctor) => {
      this.selectedDoctor = doctor;
      this.showAppointment = false;
      this.showHoursList = false;
    });
  }

  getWorkingHoursByDoctor(doctorId: number) {
    this.ws.getWorkingHoursByDoctor(doctorId).subscribe(
      (data) => {
      this.workingHours = this.sortWorkingHoursByDate(data);
      },
      (error) => {
        this.errorMessage = "Çalışma saatleri yüklenirken bir hata oluştu.";
        console.error('Error loading working hours:', error);
        this.clearMessages();
      }
    );
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
  
  clearMessages() {
    setTimeout(() => {
      this.errorMessage = "";
      this.message = "";
    }, 5000); 
  }
}
