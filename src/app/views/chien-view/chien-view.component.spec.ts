import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChienViewComponent } from './chien-view.component';

describe('ChienViewComponent', () => {
  let component: ChienViewComponent;
  let fixture: ComponentFixture<ChienViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChienViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChienViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
