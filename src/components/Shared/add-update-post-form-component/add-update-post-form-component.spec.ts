import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdatePostFormComponent } from './add-update-post-form-component';

describe('AddUpdatePostFormComponent', () => {
  let component: AddUpdatePostFormComponent;
  let fixture: ComponentFixture<AddUpdatePostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdatePostFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdatePostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
