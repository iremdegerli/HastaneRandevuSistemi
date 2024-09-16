import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrl: './panel-header.component.scss'
})
export class PanelHeaderComponent implements OnInit{
  currentUser:any;

  constructor(private authService:AuthService){
  }

  ngOnInit(): void {
    this.currentUser=this.authService.currentUserValue;
  }

  logout(){
    this.authService.logout();
  }
}
