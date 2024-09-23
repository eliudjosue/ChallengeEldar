import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ListadoComponent } from './Components/listado/listado.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { AgregarComponent } from './Components/agregar/agregar.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [ListadoComponent, ProductosComponent, AgregarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductosRoutingModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    PaginatorModule,
  ],
})
export class ProductosModule {}
