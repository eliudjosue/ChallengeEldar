import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  username: string = '';
  password: string = '';
  
  usuario = {
    email: this.username,
   password: this.password
 }

  operationType = ''
  constructor(
    private authService: AuthService,
    private router: Router) { }
  onSubmit() {
    if (this.username && this.password) {
      this.Ingresar(this.username, this.password) 
    } else {
      console.error('Username and password are required');
    }
  }

  Ingresar(email: string , password: string ) {
    this.authService.login(email, password).then(res => {
      if (res?.operationType == 'signIn') {
        this.router.navigate(['/productos']);
      }
    }).catch(err => {
      console.log("error: ",err)
    })

  }

  ingresarConGoogle() {
    const { email, password } = this.usuario;
    this.authService.loginWithGoogle(email, password).then(res => {
      this.router.navigate(['/productos']);
    })
  }

  goToForgotPassword() {
    this.router.navigate(['/auth/forgot']);
  }
  goToCreateAccount() {
    this.router.navigate(['/auth/registro']);
  }
}
