import { Component, OnInit } from '@angular/core';
import { Post, ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  posts: Post[] = []; // Cambiar de Photos[] a Post[]
  paginatedPosts: Post[] = []; // Igual para los paginados
  first: number = 0;
  rows: number = 6;

  constructor(private postService: ProductService) {} // Usar PostService

  ngOnInit() {
    // Usar el método getPosts() del nuevo servicio
    this.postService.getPosts().subscribe(
      (data: Post[]) => {
        this.posts = data;
        this.updatePaginatedPosts(); // Actualizar posts paginados
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  // Actualizar método de paginación
  updatePaginatedPosts(): void {
    this.paginatedPosts = this.posts.slice(this.first, this.first + this.rows);
  }

  // Método para manejar el cambio de página
  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedPosts();
  }
}
