import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Photos {
  albumId: number;
  id: number;
  url: string;
  thumbnailUrl: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/albums/1/photos';
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  // Método para obtener los posts
  getPosts(): Observable<Photos[]> {
    return this.http.get<Photos[]>(this.apiUrl);
  }

  // Método para crear un post
  createPost(post: Photos): Observable<Photos> {
    return this.http.post<Photos>(this.postsUrl, post);
  }

  // Método para actualizar un post por ID
  updatePost(id: number, post: Photos): Observable<Photos> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.put<Photos>(url, post);
  }

  // Método para obtener un solo post por ID
  getPostById(id: number): Observable<Photos> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Photos>(url);
  }

  // Método para eliminar un post por ID
  deletePost(id: number): Observable<void> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
