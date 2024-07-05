import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChevalDetailComponent } from './cheval-detail.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChevalDetailComponent', () => {
  let component: ChevalDetailComponent;
  let fixture: ComponentFixture<ChevalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChevalDetailComponent ],
      imports: [ChevalDetailComponent,RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChevalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
