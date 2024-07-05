import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChevalViewComponent } from './cheval-view.component';

describe('ChevalViewComponent', () => {
  let component: ChevalViewComponent;
  let fixture: ComponentFixture<ChevalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChevalViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChevalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
