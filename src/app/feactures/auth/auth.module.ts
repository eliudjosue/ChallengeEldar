import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthRouttingModule } from './auth-routting.module';

import { ForgotComponent } from './components/forgot/forgot.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [RegistroComponent, LoginComponent, ForgotComponent],
  imports: [
    CommonModule,
    AuthRouttingModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    FormsModule,
    CheckboxModule,
    ReactiveFormsModule,
    ToastModule 
  ],
})
export class AuthModule {}
