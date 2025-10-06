import { Component, inject } from '@angular/core';
import { PostService } from '../../services/post-service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-update',
  imports: [],
  templateUrl: './post-update.html',
  styleUrl: './post-update.css'
})
export class PostUpdate {

  private readonly myService =inject(PostService)
  private readonly route = inject(ActivatedRoute)

  idPost :string |undefined
  post:Post |undefined

  getPostbyId()
    {
      this.idPost = this.route.snapshot.paramMap.get('id')?.toString()
    }
  
getPostFromService(id:string)
{
    this.myService.getPostById(id).subscribe({
    next: (response) => {
      this.post = response
    }
  }) 
}  
constructor(){
  this.getPostbyId()
  if(this.idPost)
  {
    this.getPostFromService(this.idPost)
  }
}

}
