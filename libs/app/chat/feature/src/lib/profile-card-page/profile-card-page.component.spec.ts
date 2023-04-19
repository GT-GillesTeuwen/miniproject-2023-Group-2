import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardPageComponent } from './profile-card-page.component';

describe('ProfileCardPageComponent', () => {
  let component: ProfileCardPageComponent;
  let fixture: ComponentFixture<ProfileCardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileCardPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
