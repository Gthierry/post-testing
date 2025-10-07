import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetails } from './post-details';
import {  ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post-service';
import { of, throwError } from 'rxjs';

describe('PostDetails', () => {
  let component: PostDetails;
  let fixture: ComponentFixture<PostDetails>;
  let routeSpy: jasmine.SpyObj<Router>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let mockActivatedRouteSpy: Partial<ActivatedRoute>; 

  beforeEach(async () => {
    routeSpy = jasmine.createSpyObj('Router', ['navigate']);
    postServiceSpy = jasmine.createSpyObj('PostService', ['getPostById', 'deletePost']);

    
    mockActivatedRouteSpy = {
      snapshot: {
        params: { id: '1' }
      }
    } as unknown as Partial<ActivatedRoute>;
    
    postServiceSpy.getPostById.and.returnValue(of(
      { id: '1', title: 'Post 1', content: 'Content 1', author: 'Author 1' }
      
    ));

    postServiceSpy.deletePost.and.returnValue(of());
    
    await TestBed.configureTestingModule({
      imports: [PostDetails],
      providers: [
        { provide: Router, useValue: routeSpy },
        { provide: PostService, useValue: postServiceSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRouteSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostDetails);
    component = fixture.componentInstance;
    

    //fixture.detectChanges();
  });
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return post on load', () => {
    const mockPost = { id: '1', title: 'Post 1', content: 'Content 1', author: 'Author 1' };
    
    // Trigger component initialization
    fixture.detectChanges();
    
    expect(postServiceSpy.getPostById).toHaveBeenCalledWith('1');
    expect(component.post).toEqual(mockPost);
  });

  it('should log error when getPostById fails', () => {
    spyOn(console, 'error');
    postServiceSpy.getPostById.and.returnValue(throwError(() => new Error('Error fetching post by id:')));
   
    component.getPostbyId('1');

    // expect(postServiceSpy.getPostById).toHaveBeenCalledWith('1');

    expect(console.error).toHaveBeenCalledWith('Error fetching post by id:', jasmine.any(Error));
  });

});