import { Component, inject } from '@angular/core';
import { Photos, ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
  photos: Photos[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getPosts().subscribe(
      (data: Photos[]) => {
        this.photos = data;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

}
