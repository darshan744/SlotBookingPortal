import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentSearchComponent } from './admin-student-search.component';

describe('AdminStudentSearchComponent', () => {
  let component: AdminStudentSearchComponent;
  let fixture: ComponentFixture<AdminStudentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStudentSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStudentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
