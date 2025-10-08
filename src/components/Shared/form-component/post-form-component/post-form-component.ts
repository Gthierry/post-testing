import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PostUpdate } from '../../../Pages/post-update/post-update';
import { eventListeners } from '@popperjs/core';
import { Post } from '../../../../models/post.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'post-form-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './post-form-component.html',
  styleUrl: './post-form-component.css',
})
export class PostFormComponent implements OnInit {
  fb = inject(FormBuilder);
  form: FormGroup;

  constructor() {
    console.log('mon post reçu constructeur : ' + this.postRecu?.id);
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      title: [{ value: '', disabled: true }, Validators.required],
      author: [{ value: '', disabled: true }, Validators.required],
      content: [{ value: '', disabled: true }, Validators.required],
    });
  }

  @Input() postRecu!: Post | null;

  @Output() postEnvoie = new EventEmitter<Post>();

  private loadData() {
    if (this.postRecu) {
      this.form.setValue({
        id: this.postRecu.id,
        title: this.postRecu.title,
        author: this.postRecu.author,
        content: this.postRecu.content,
      });
      console.log('yep yep données chargées');
    } else {
      console.log('raté !');
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['postRecu'] && this.postRecu) {
      this.loadData();
    }
  }

  ngOnInit() {
    this.loadData();
    console.log('ngOninit title : ' + this.postRecu?.title);
  }

  send() {
    if (this.postRecu) {
      this.postEnvoie.emit(this.postRecu);
    }
  }
}
