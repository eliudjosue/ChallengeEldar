import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { AdminComponent } from './Components/admin/admin.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { ProductosRoutingModule } from './productos-routing.module';


@NgModule({
  declarations: [ProductosComponent, AdminComponent],
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
