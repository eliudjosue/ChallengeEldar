import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { GuardService } from '../../services/guard.service';
import { map, Observable } from 'rxjs';
import { getAuth } from '@firebase/auth';
import { EmailsService } from '../../services/emails.service';

@Component({
  selector: 'app-munubar',
  templateUrl: './munubar.component.html',
  styleUrls: ['./munubar.component.css'],
})
export class MunubarComponent implements OnInit {
  items: MenuItem[] | undefined;
  loggedIn: boolean = false;
  isAuth: boolean = false;
  guardStatus?: boolean = true;
  tienePermiso: boolean = false;
  permisos: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private guardService: GuardService,
    public emailsService: EmailsService
  ) {
    this.guardService.guardStatus$.subscribe((status: boolean) => {
      this.guardStatus = status;
    });
  }

  ngOnInit() {

    this.items = [
      {
        label: 'Products',
        icon: 'pi pi-home',
        routerLink: '/productos/listado',
      },
      {
        label: 'Admin',
        icon: 'pi pi-user',
        routerLink: '/productos/admin',
      },
      {
        separator: true,
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logOut(), 
      },

    ];
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }

}
