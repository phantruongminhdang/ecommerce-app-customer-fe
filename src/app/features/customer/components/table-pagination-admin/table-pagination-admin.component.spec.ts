import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePaginationAdminComponent } from './table-pagination-admin.component';

describe('TablePaginationAdminComponent', () => {
  let component: TablePaginationAdminComponent;
  let fixture: ComponentFixture<TablePaginationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePaginationAdminComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TablePaginationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
