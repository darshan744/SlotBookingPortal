import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GDComponent } from './gd.component';

describe('GDComponent', () => {
  let component: GDComponent;
  let fixture: ComponentFixture<GDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
