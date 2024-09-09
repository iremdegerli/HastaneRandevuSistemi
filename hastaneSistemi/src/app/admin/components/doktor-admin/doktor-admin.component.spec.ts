import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorAdminComponent } from './doktor-admin.component';

describe('DoktorAdminComponent', () => {
  let component: DoktorAdminComponent;
  let fixture: ComponentFixture<DoktorAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoktorAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoktorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
