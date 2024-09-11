import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { SpecialtyService } from '../../services/specialty.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  showAddSpecialty: boolean = false;
  showDeleteSpecialty: boolean = false;
  showSpecialtyList: boolean = false; // Alan listesini açmak için
  showDoctorList:boolean=false;
  showDoctorInfo:boolean=false;
  showAppointment:boolean=false;
  showHoursList:boolean=false;

  errorMessage: string = "";
  message: string = "";

  specialtyId: string = ""; // Seçili specialty'nin ID'si
  specialties: any[] = []; // Alanların listesi
  doctors: any[] = [];
  doctord: any[] = []; // Seçili alanın doktorları
  doctorId: string = "";

  name: string = ""; // Specialty ekleme için
  selectedSpecialty: number | null = null; // Seçili alanın ID'si
  selectedSpecialtyName: string = ''; // Seçili alanın adı
  selectedDoctor: any = null;
  selectedDoctorId: number | null = null;
  selectedDoctorName:string='';
  
  appointments: any[]=[];
  

  constructor(private http: HttpClient, private ds: DoctorService, private ss: SpecialtyService) { }

  ngOnInit(): void {
    this.getSpecialties(); // Sayfa yüklendiğinde alanları getir
    this.getAllDoctors();
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
  }

  DoctorInfoOn(){
    this.showDoctorInfo=!this.showDoctorInfo;
    this.showAddSpecialty = false;
    this.showDeleteSpecialty = false;
    this.showSpecialtyList = false;
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
    
    this.ds.getAllDoctors().subscribe((value:any[])=>{
      this.doctord=value;
    })
  }

  getDoctorsBySpecialty(specialtyId: number) {
    const selectedSpecialty = this.specialties.find(specialty => specialty.id === specialtyId);
    this.selectedSpecialtyName = selectedSpecialty ? selectedSpecialty.name : '';

    this.ds.getDoctorsBySpecialty(specialtyId).subscribe((data: any[]) => {
      this.doctors = data;
    });
  }

  getDoctorAppointments(doctorId: number) {
    this.ds.getAppointmentsByDoctor(doctorId).subscribe((appointments: any[]) => {
      this.appointments = appointments;
    }, (error) => {
      this.errorMessage = "Randevular getirilemedi.";
      this.clearMessages();
    });
  }
  
  onDoctorChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const doctorId = Number(target.value);
    this.getDoctorInfoById(doctorId);
    this.getDoctorAppointments(doctorId); 
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
        this.getSpecialties(); // Alan listesini güncelle
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

    // Sağlamlık kontrolü: Seçili id'nin sayısal olduğundan emin olun
    const id = Number(this.specialtyId);

    this.ds.getDoctorsBySpecialty(id).subscribe((doctors: any[]) => {
      if (doctors.length > 0) {
        this.errorMessage = "Bu alanda kayıtlı doktorlar olduğu için silme işlemi yapılamaz!";
        this.clearMessages();
        return;
      }

      this.ss.deleteSpecialty(id).subscribe(
        (data:any) => {
          this.message = "Alan başarıyla silindi.";
          this.getSpecialties(); // Alan listesini güncelle
          this.clearMessages();
        },
        (error) => {
          this.errorMessage = "Alan silinemedi.";
          this.getSpecialties(); 
          this.clearMessages();
        }
      );
    });
  }

  GetDoctor(){
    if (!this.doctorId) {
      this.errorMessage = "Lütfen silmek istediğiniz alanı seçin!";
      this.clearMessages();
      return;
    }

    // Sağlamlık kontrolü: Seçili id'nin sayısal olduğundan emin olun
  }

  clearMessages() {
    setTimeout(() => {
      this.errorMessage = "";
      this.message = "";
    }, 5000); 
  }
}
