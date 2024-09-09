import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliklinikAdminComponent } from './poliklinik-admin.component';

describe('PoliklinikAdminComponent', () => {
  let component: PoliklinikAdminComponent;
  let fixture: ComponentFixture<PoliklinikAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoliklinikAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoliklinikAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
