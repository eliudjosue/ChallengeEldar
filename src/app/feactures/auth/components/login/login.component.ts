import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  contactForm!: FormGroup;
  username: string = '';
  password: string = '';

  usuario = {
    email: this.username,
    password: this.password,
  };

  operationType = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.contactForm = this.initForm();
  }
 
  onSubmit() {
    if (this.username && this.password) {
      this.Ingresar(this.username, this.password);
    } else {
      console.error('Username and password are required');
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(50),
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
    });
  }

  Ingresar(email: string, password: string) {
    this.authService
      .login(email, password)
      .then((res) => {
        if (res?.operationType == 'signIn') {
          this.router.navigate(['/productos']);
        }
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }

  ingresarConGoogle() {
    const { email, password } = this.usuario;
    this.authService.loginWithGoogle(email, password).then((res) => {
      this.router.navigate(['/productos']);
    });
  }

  goToForgotPassword() {
    this.router.navigate(['/auth/forgot']);
  }
  goToCreateAccount() {
    this.router.navigate(['/auth/registro']);
  }
}
