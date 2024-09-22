import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-munubar',
  templateUrl: './munubar.component.html',
  styleUrls: ['./munubar.component.css'],
})
export class MunubarComponent implements OnInit {
  items: MenuItem[] | undefined;
  loggedIn: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Productos',
        icon: 'pi pi-home',
        routerLink: '/productos/listado',
      },
      {
        label: 'agregar',
        icon: 'pi pi-star',
        routerLink: '/productos/agregar',
      },
      {
        label: 'productos',
        icon: 'pi pi-search',
        routerLink: '/productos/productos',
        // items: [
        //     {
        //         label: 'Core',
        //         icon: 'pi pi-bolt',
        //         shortcut: '⌘+S'
        //     },
        //     {
        //         label: 'Blocks',
        //         icon: 'pi pi-server',
        //         shortcut: '⌘+B'
        //     },
        //     {
        //         label: 'UI Kit',
        //         icon: 'pi pi-pencil',
        //         shortcut: '⌘+U'
        //     },
        //     {
        //         separator: true
        //     },
        //     {
        //         label: 'Templates',
        //         icon: 'pi pi-palette',
        //         items: [
        //             {
        //                 label: 'Apollo',
        //                 icon: 'pi pi-palette',
        //                 badge: '2'
        //             },
        //             {
        //                 label: 'Ultima',
        //                 icon: 'pi pi-palette',
        //                 badge: '3'
        //             }
        //         ]
        //     }
        // ]
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
    this.IsLoget() 
  }

 IsLoget = () => {
    const auth = getAuth();
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.loggedIn = true;
          resolve(true);
        } else {
          resolve(false);
          this.loggedIn = false;
        }
      });
    });
  };
  

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }
}
