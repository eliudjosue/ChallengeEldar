import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotComponent } from './components/forgot/forgot.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'forgot', component: ForgotComponent},
      {path: 'login', component: LoginComponent},
      {path: 'registro', component: RegistroComponent},
      {path: '**', redirectTo: 'login'},
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class AuthRouttingModule { }
