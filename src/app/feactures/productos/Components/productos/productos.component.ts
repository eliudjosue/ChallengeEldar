import { Component } from '@angular/core';
import { Photos, ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  photos: Photos[] = [];
  selectedPhoto: Photos | null = null;
  newPhoto: Photos = {
    albumId: 1,
    id: 0,
    url: '',
    thumbnailUrl: '',
    title: ''
  };
  editPhoto: Photos | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getPhotos();
    this.loadPhotos();
  }





  paginatedPhotos: Photos[] = [];
  totalRecords: number = 0;
  rowsPerPage: number = 8; // Número de fotos por página

  // newPhoto: Photos = { id: 0, albumId: 1, title: '', url: '', thumbnailUrl: '' };
 

  // constructor(private productService: ProductService) {}

  // ngOnInit(): void {
  //   this.loadPhotos();
  // }

  loadPhotos(): void {
    this.productService.getPosts().subscribe((data: Photos[]) => {
      this.photos = data;
      this.totalRecords = this.photos.length;
      this.paginate({ first: 0, rows: this.rowsPerPage }); // Mostrar la primera página al inicio
    });
  }

  paginate(event: any): void {
    const start = event.first;
    const end = start + event.rows;
    this.paginatedPhotos = this.photos.slice(start, end);
  }









  // Obtener todos los posts (fotos)
  getPhotos(): void {
    this.productService.getPosts().subscribe(
      (data) => {
        this.photos = data;
      },
      (error) => {
        console.error('Error al obtener las fotos', error);
      }
    );
  }

  // Crear un nuevo post (foto)
  addPhoto(): void {
    this.productService.createPost(this.newPhoto).subscribe(
      (data) => {
        this.photos.push(data); // Agrega la nueva foto al array
        this.newPhoto = { albumId: 1, id: 0, url: '', thumbnailUrl: '', title: '' }; // Resetear el formulario
      },
      (error) => {
        console.error('Error al crear la foto', error);
      }
    );
  }

  // Actualizar un post (foto) existente
  updatePhoto(id: number): void {
    if (this.editPhoto) {
      this.productService.updatePost(id, this.editPhoto).subscribe(
        (data) => {
          const index = this.photos.findIndex(p => p.id === id);
          if (index > -1) {
            this.photos[index] = data; // Actualiza la foto en el array
          }
          this.editPhoto = null; // Limpiar el formulario de edición
        },
        (error) => {
          console.error('Error al actualizar la foto', error);
        }
      );
    }
  }

  // Obtener un post (foto) por ID
  getPhotoById(id: number): void {
    this.productService.getPostById(id).subscribe(
      (data) => {
        this.selectedPhoto = data; // Muestra los detalles de la foto seleccionada
      },
      (error) => {
        console.error('Error al obtener la foto por ID', error);
      }
    );
  }

  // Eliminar un post (foto) por ID
  deletePhoto(id: number): void {
    this.productService.deletePost(id).subscribe(
      () => {
        this.photos = this.photos.filter(p => p.id !== id); // Eliminar la foto del array
      },
      (error) => {
        console.error('Error al eliminar la foto', error);
      }
    );
  }

  // Seleccionar una foto para editar
  selectPhotoToEdit(photo: Photos): void {
    this.editPhoto = { ...photo }; // Clona la foto seleccionada para edición
  }
}
