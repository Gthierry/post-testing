import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostList } from './post-list';
import { PostService } from '../../services/post-service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('PostList', () => {
  let component: PostList;
  let fixture: ComponentFixture<PostList>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let routerSpy :jasmine.SpyObj<Router>;

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('PostService', ['getPosts']);
    routerSpy = jasmine.createSpyObj('Router',['navigate']);

    postServiceSpy.getPosts.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [PostList],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostList);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });
  
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on initialization', () => {
    const mockPosts = [
      { id: '1', title: 'Post 1', content: 'Content 1', author: 'Author 1' },
      { id: '2', title: 'Post 2', content: 'Content 2', author: 'Author 2' }
    ];
    
    postServiceSpy.getPosts.and.returnValue(of(mockPosts));
    component.getPosts();
    
    expect(postServiceSpy.getPosts).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
  });

  it('should navigate to post details', () => {
    component.navigateToDetails('42');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/post-detail', '42']);
  })

});