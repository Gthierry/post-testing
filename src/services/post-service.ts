import { inject, Injectable } from '@angular/core';
import { AddPost } from '../models/add-post.model';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private url = 'http://localhost:3000/posts';
  private readonly httpcClient = inject(HttpClient);
  
  //--------------getPosts()----------------
  getPosts() 
  {
    return this.httpcClient.get<Post[]>(this.url);

  }
//--------------getPostById()----------------
  getPostById(id: string) 
  {
    return this.httpcClient.get<Post>(`${this.url}/${id}`);
  }

  //--------------addPost()----------------
  addPost(post: AddPost) 
  {
    const newPost: Post ={
      ...post,
      id: Math.floor(Math.random() * 1000).toString(),
      }
      return this.httpcClient.post<Post>(this.url, post);
  }

//--------------updatePost()----------------
  updatePost(id: string, post: AddPost) 
  {
    return this.httpcClient.put<Post>(`${this.url}/${id}`, post);
  }

  //--------------deletePost()----------------
  deletePost(id: string) {
    return this.httpcClient.delete(`${this.url}/${id}`);
  }
}