import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email ve şifre alanları boş olamaz!';
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      user => {
        console.log('Giriş yapan kullanıcı bilgileri:', user);

        if (user && user.role) {
          if (user.role.toLowerCase() === 'admin') {
            console.log('Admin paneline yönlendiriliyor...');
            this.router.navigate(['/admin']);
          } else if (user.role.toLowerCase() === 'doctor') {
            console.log('Doktor paneline yönlendiriliyor...');
            this.router.navigate(['/doctor']);
          }
        }
      },
      error => {
        console.error('Giriş hatası:', error);
        if (error.status === 401) {
          this.errorMessage = 'Email adresi veya şifre hatalı!';
        } else {
          this.errorMessage = 'Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.';
        }
      }
    );
  }
}
