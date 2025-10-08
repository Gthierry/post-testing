import { Component, inject } from '@angular/core';
import { PostService } from '../../../services/post-service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../models/post.model';
import { FormsModule } from '@angular/forms';
import { PostFormComponent } from '../../Shared/form-component/post-form-component/post-form-component';
@Component({
  selector: 'app-post-update',
  imports: [PostFormComponent, FormsModule],
  templateUrl: './post-update.html',
  styleUrl: './post-update.css',
})
export class PostUpdate {
  private readonly myService = inject(PostService);
  private readonly route = inject(ActivatedRoute);

  postId: string | undefined;
  post: Post | null = null;

  constructor() {
    this.getPostbyId();
    if (this.postId) {
      this.getPostById(this.postId);
    }
  }

  getPostbyId() {
    this.postId = this.route.snapshot.params['id'];
  }

  getPostById(id: string) {
    this.myService.getPostById(id).subscribe({
      next: (response: Post) => {
        this.post = response;
        console.log('Post loaded:', this.post.title);
      },
      error: (error: any) => {
        console.error('Error loading post:', error);
      },
    });
  }

  // postIdReception(id: string) {
  //   this.postId = id;
  //   console.log(this.postId);
  //   debugger;
  // }
}
