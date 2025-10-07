import { Component, inject } from '@angular/core';
import { PostService } from '../../../services/post-service';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post-list',
  imports: [],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList {
  posts: Post[] = [];

  private postService = inject(PostService);
  private readonly router = inject(Router);

  constructor() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe({
      next: (response) => {
        this.posts = response;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      },
    });
  }

  navigateToDetails(postId: string) {
    this.router.navigate(['/post-detail', postId]);
  }
  navigateToUpdate(postId: string) {
    this.router.navigate(['/post-update', postId]);
  }
}
