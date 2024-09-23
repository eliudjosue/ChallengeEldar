import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { RoleGuard } from 'src/app/core/guards/Auth.guards';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuard],
      },
      {
        path: 'productos',
        component: ProductosComponent,
      },
      { path: '**', redirectTo: 'productos' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
