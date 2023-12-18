import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http:HttpClient) { }

  createPost (post:any){
    return this.http.post('http://localhost:3800/post/create', post).pipe(
      catchError((error) => {
        console.error('Error creating post:', error);
        throw error;
      })
    );
  }
}
