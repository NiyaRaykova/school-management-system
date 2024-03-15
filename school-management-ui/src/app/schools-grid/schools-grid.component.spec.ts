import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsGridComponent } from './schools-grid.component';

describe('SchoolsGridComponent', () => {
  let component: SchoolsGridComponent;
  let fixture: ComponentFixture<SchoolsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchoolsGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
