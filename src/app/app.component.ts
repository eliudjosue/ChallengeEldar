import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'challenge-app-web-ssr';
  userLogget = this.authService.getUserLogged()
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  logOut() {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }
}
