import { Component } from '@angular/core';
import { FormBuilder, FormGroup, inject } from '@angular/forms';
import { PostService } from '../../../services/post-service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-add-update-post-form-component',
  imports: [],
  templateUrl: './add-update-post-form-component.html',
  styleUrl: './add-update-post-form-component.css',
})
export class AddUpdatePostFormComponent {
  form: FormGroup | undefined;
  fb = inject(FormBuilder);
  postService = inject(PostService);
  route = inject(ActivatedRoute);

  postId = this.route.snapshot.params['id'];
  post: Post | undefined;

  constructor() {
    if (this.postId) {
      this.postService.getPostById(this.postId).subscribe({
        next: (response: Post | undefined) => {
          this.post = response;
        },
      });
    }
    this.form = this.fb.group({
      title: [this.post?.title],
      author: [this.post?.author],
      content: [this.post?.content],
    });
  }
}
