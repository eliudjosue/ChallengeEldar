import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  name: string = '';
  email: string = '';
  confirmPassword: string = '';

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

  // Este método se ejecutará cuando el formulario se envíe
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    // Lógica para registrar al usuario (ej. llamada a un servicio backend)
    console.log('Nombre:', this.name);
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);

this.Registrar(this.email, this.password)
  }

  Registrar(email: string, password: string) {
    this.authService.register(email, password).then(res => {
      console.log("Se registro :", res)
      if (res?.operationType == 'signIn') {
        this.router.navigate(['/productos']);
      }
    })
    .catch(error => console.log(error));

    this.authService.stateAuth
  }
  
}
