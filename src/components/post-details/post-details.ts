import { Component, inject } from '@angular/core';
import { PostService } from '../../services/post-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  imports: [],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css'
})
export class PostDetails {

  private readonly postService = inject(PostService);
  private router = inject(ActivatedRoute);
  postId: string | null = null;

  getPostId() {
    this.postId = this.router.snapshot.paramMap.get('id');
  }

  constructor(){
    this.getPostId();
  }

  getPostbyId(id:string)
  {
    this.postService.getPostById(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching post by id:', error);
      }
    });
  }
}
