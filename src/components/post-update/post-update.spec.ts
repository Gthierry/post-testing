import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostUpdate } from './post-update';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('PostUpdate', () => {

  let component: PostUpdate;
  let fixture: ComponentFixture<PostUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostUpdate],
       providers:[
       { provide: ActivatedRoute , useValue: {navigate: jasmine.createSpy('navigate')} },
       { provide: ActivatedRoute, useValue: {snapshot: jasmine.createSpy('')} }
       
       
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
