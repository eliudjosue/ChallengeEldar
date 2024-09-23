import { Component, OnInit } from '@angular/core';
import { GuardService } from 'src/app/shared/services/guard.service';
import { Post, ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  posts: Post[] = [];
  selectedPost: Post | null = null;
  newPost: Post = {
    userId: 1,
    title: '',
    body: ''
  };
  editPost: Post | null = null;

  paginatedPosts: Post[] = [];
  totalRecords: number = 0;
  rowsPerPage: number = 8; // Número de posts por página
  guardStatusRole: boolean = true;

  constructor(private postService: ProductService,private guardService: GuardService) {}

  ngOnInit(): void {
    this.guardService.guardStatusRole$.subscribe((status: boolean) => {
      this.guardStatusRole = status;
    });
    this.loadPosts();
  }

loadPosts(): void {
  this.postService.getPosts().subscribe((data: Post[]) => {
    this.posts = data.reverse(); 
    this.totalRecords = this.posts.length;
    this.paginate({ first: 0, rows: this.rowsPerPage }); 
  });
}



  paginate(event: any): void {
    const start = event.first;
    const end = start + event.rows;
    this.paginatedPosts = this.posts.slice(start, end);
  }

addPost(): void {
  this.postService.createPost(this.newPost).subscribe(
    (data) => {
      this.posts.unshift(data); 
      this.newPost = { userId: 1, title: '', body: '' }; 
      this.totalRecords = this.posts.length; 
      this.paginate({ first: 0, rows: this.rowsPerPage }); 
    },
    (error) => {
      console.error('Error al crear el post', error);
    }
  );
}


  updatePost(): void {
    if (this.editPost) {
      this.postService.updatePost(this.editPost).subscribe(
        (data) => {
          const index = this.posts.findIndex(p => p.id === data.id);
          if (index > -1) {
            this.posts[index] = data; 
            this.totalRecords = this.posts.length; 
            this.paginate({ first: 0, rows: this.rowsPerPage }); 
          }
          this.editPost = null; 
        },
        (error) => {
          console.error('Error al actualizar el post', error);
        }
      );
    }
  }

  getPostById(id: number): void {
    this.postService.getPost(id).subscribe(
      (data) => {
        this.selectedPost = data; 
      },
      (error) => {
        console.error('Error al obtener el post por ID', error);
      }
    );
  }

  // Eliminar un post por ID
  deletePost(id: any): void {
    this.postService.deletePost(id).subscribe(
      () => {
        this.posts = this.posts.filter(p => p.id !== id); // Eliminar el post del array
        this.totalRecords = this.posts.length; // Actualiza el total de registros
        this.paginate({ first: 0, rows: this.rowsPerPage }); // Actualiza la paginación
      },
      (error) => {
        console.error('Error al eliminar el post', error);
      }
    );
  }

  // Seleccionar un post para editar
  selectPostToEdit(post: Post): void {
    this.editPost = { ...post }; // Clonar el post seleccionado para edición
  }
}
