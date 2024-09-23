import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './Components/agregar/agregar.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { ListadoComponent } from './Components/listado/listado.component';
import { RoleGuard } from 'src/app/core/guards/Auth.guards';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin',
        component: AgregarComponent,
        canActivate: [RoleGuard],
      },
      {
        path: 'productos',
        component: ProductosComponent,
      },
      { path: 'listado', component: ListadoComponent },
      { path: '**', redirectTo: 'productos' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
