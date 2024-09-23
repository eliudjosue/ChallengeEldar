import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registerForm!: FormGroup;
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
   private router: Router,
   private readonly fb: FormBuilder) { }

   ngOnInit(){
    this.registerForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }


this.Registrar(this.email, this.password)
  }

  Registrar(email: string, password: string) {
    this.authService.register(email, password).then(res => {
      if (res?.operationType == 'signIn') {
        this.router.navigate(['/productos']);
      }
    })
    .catch(error => console.log(error));

    this.authService.stateAuth
  }

  goToLogin(){
    this.router.navigate(['/auth/login']);
  }
  
}
