import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar-component';
import { ActivatedRoute, Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
       providers:[
       { provide: Router, useValue: {navigate: jasmine.createSpy('navigate')} },
       { provide: ActivatedRoute, useValue: {snapshot: jasmine.createSpy('')} }
       
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
