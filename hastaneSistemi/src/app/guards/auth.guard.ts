import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const currentUser = this.authService.currentUserValue;

    // Kullanıcı bilgisi ve rolünün mevcut olduğundan emin olun
    if (!currentUser || !currentUser.role) {
      console.error('Kullanıcı bilgileri eksik veya rol tanımlanmamış');
      this.router.navigate(['/login']);
      return false;
    }

    // Rol kontrolü
    const userRole = currentUser.role.toLowerCase();
    if (userRole.includes('admin')) {
      return true;  // Admin erişimi
    } else if (userRole.includes('doctor')) {
      return true;  // Doktor erişimi
    } else {
      // Eğer rol tanınmıyorsa, login sayfasına yönlendir
      this.router.navigate(['/login']);
      return false;
    }
  }
}
