import { Component, OnInit } from '@angular/core';
import {
  Photos,
  ProductService,
} from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  photos: Photos[] = [];
  paginatedPhotos: Photos[] = [];
  first: number = 0;
  rows: number = 6;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getPosts().subscribe(
      (data: Photos[]) => {
        this.photos = data;
        this.updatePaginatedPhotos();
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  updatePaginatedPhotos(): void {
    this.paginatedPhotos = this.photos.slice(
      this.first,
      this.first + this.rows
    );
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedPhotos();
  }
}
