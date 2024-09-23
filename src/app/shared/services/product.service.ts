import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Photos {
  albumId: number;
  id: number;
  url: string;
  thumbnailUrl: string;
  title: string;
}

export interface Post {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private apiUrl = 'https://jsonplaceholder.typicode.com/albums/1/photos';
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  // Listar todos los posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  // Obtener un solo post por ID
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo post
  createPost(post: Post): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Post>(this.apiUrl, post, { headers });
  }

  // Actualizar un post existente
  updatePost(post: Post): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Post>(`${this.apiUrl}/${post.id}`, post, { headers });
  }

  // Eliminar un post
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
