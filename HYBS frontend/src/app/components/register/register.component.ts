import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Router servisini import edin


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  name: string="";
  surname: string="";
  identityNumber: string="";
  email: string="";
  password: string="";
  selectedRole: string = "admin";  // Başlangıç değeri admin olabilir.
  specialtyId: string = "";
  specialties: any[] = [];
  errorMessage: string="";

  constructor(private http: HttpClient, private router: Router){ }


    ngOnInit(): void {
      // Specialties'i backend'den çekiyoruz
    this.http.get("http://localhost:8080/api/specialties")
      .subscribe((data: any) => {
        this.specialties = data;
      });
  }

    save(){
      let bodyData= {
        "name": this.name,
        "surname":this.surname,
        "identityNumber":this.identityNumber,
        "email": this.email,
        "password":this.password,
        "role":this.selectedRole,
        "specialty": this.selectedRole==='doctor'? { id: this.specialtyId } : null 
        
      };
      
      if (!this.name || !this.surname || !this.identityNumber || !this.email || !this.password || !this.selectedRole) {
        this.errorMessage = "Lütfen tüm alanları doldurduğunuzdan emin olun!";
        return;
      }
      this.http.post("http://localhost:8080/api/auth/register",bodyData,{responseType: 'text'}).subscribe((data:any)=>
      {console.log(data);
        console.log(data);
        alert("Kullanıcı kaydı başarılı!");
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Hata oluştu:', error);
        alert("Kayıt sırasında bir hata oluştu, lütfen tekrar deneyin.");
      }
      );
    }
}
