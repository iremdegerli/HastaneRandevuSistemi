import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('aboveMenu', { static: false }) aboveMenu: MatMenuTrigger | undefined;
  @ViewChild('belowMenu', { static: false }) belowMenu: MatMenuTrigger | undefined;

  ngAfterViewInit() {
    // Bu aşamada menülerin başlatılması veya ek işlemler yapılabilir
  }

  openMenu(menu: MatMenuTrigger) {
    if (menu) {
      menu.openMenu();
    }
  }

  closeMenu(menu: MatMenuTrigger) {
    if (menu) {
      menu.closeMenu();
    }
  }
}
