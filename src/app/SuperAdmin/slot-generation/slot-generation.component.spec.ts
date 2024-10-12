import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotGenerationComponent } from './slot-generation.component';

describe('SlotGenerationComponent', () => {
  let component: SlotGenerationComponent;
  let fixture: ComponentFixture<SlotGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotGenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
