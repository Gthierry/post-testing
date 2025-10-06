import { TestBed } from '@angular/core/testing';

import { PostService } from './post-service';
import { HttpTestingController,HttpClientTestingModule } from '@angular/common/http/testing';
import { Post } from '../models/post.model';


describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PostService]
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts', () => {
    const mockPosts : Post[] = [
      { id: '1', title: 'Post 1', content: 'Content 1', author: 'Author 1' },
      { id: '2', title: 'Post 2', content: 'Content 2', author: 'Author 2' }
    ];
    
    service.getPosts().subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
      expect(posts.length).toBe(2);
    });
    const req = httpMock.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
   
  });

  it('should return error', () => {
    service.getPosts().subscribe({
      next: () => { fail('expected an error, not posts'); },
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should fetch post by id', () => {
    const mockPost : Post = { id: '1', title: 'Post 1', content: 'Content 1', author: 'Author 1' };
    
    service.getPostById('1').subscribe((post) => {
      expect(post).toEqual(mockPost);
      expect(post.id).toBe('1');
    });
    const req = httpMock.expectOne('http://localhost:3000/posts/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  })
  it('Should return error on getPostId()', () => {
    service.getPostById('1').subscribe({
      next: () => { fail('expected an error, not post'); },
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });
    const req = httpMock.expectOne('http://localhost:3000/posts/1');
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 404, statusText: 'Not Found' });
  })

});
