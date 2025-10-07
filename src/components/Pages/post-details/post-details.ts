import { Component, inject } from '@angular/core';
import { PostService } from '../../../services/post-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post-details',
  imports: [],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css',
})
export class PostDetails {
  private readonly postService = inject(PostService);
  private readonly router = inject(ActivatedRoute);
  private readonly route = inject(Router);

  postId: string | null = null;
  post: Post | null = null;

  getPostId() {
    this.postId = this.router.snapshot.params['id'];
  }

  constructor() {
    this.getPostId();
    if (this.postId) {
      this.getPostbyId(this.postId);
    }
  }

  getPostbyId(id: string) {
    this.postService.getPostById(id).subscribe({
      next: (response) => {
        this.post = response;
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching post by id:', error);
      },
    });
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe({
      next: (response) => {
        console.log('Post deleted successfully');
        this.post = null; // Clear the post details after deletion
      },
      error: (error) => {
        console.error('Error deleting post:', error);
      },
    });

    this.route.navigate(['/post-detail', id]);
  }
}
