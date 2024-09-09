import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  
  email: string="";
  password: string="";
  errorMessage: string="";
  
  constructor(private http: HttpClient){ }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login(){

    if (!this.email || !this.password) {
      this.errorMessage = "Email ve şifre alanları boş olamaz!";
      return;
    }

    console.log(this.email);
    console.log(this.password);

    let bodyData= {
      "email": this.email,
      "password":this.password
    };

    this.http.post("http://localhost:8080/api/auth/login",bodyData,{responseType: 'text'}).subscribe((data:any)=>
      {console.log(data);
        console.log(data);
        alert("Kullanıcı girişi başarılı!");
      },
      (error) => {
          if (error.status === 401) {
            this.errorMessage = "Email adresi veya şifre hatalı!";
          } else if (error.status === 404) {
            this.errorMessage = "Email adresi kayıtlı değil!";
          } else {
            this.errorMessage = "Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.";
          }
        }
      );

  }
}
