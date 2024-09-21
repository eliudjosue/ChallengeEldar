import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard} from 'src/app/core/guards/Auth.guards';

const routes: Routes = [
{
  path: 'auth',
  loadChildren: () => import('./feactures/auth/auth.module').then(m => m.AuthModule)
},
{
  path: 'productos',
  canActivate: [AuthGuard],
  loadChildren: () => import('./feactures/productos/productos.module').then(m => m.ProductosModule)
},
{
  path: '**',
  redirectTo: 'auth'
}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
