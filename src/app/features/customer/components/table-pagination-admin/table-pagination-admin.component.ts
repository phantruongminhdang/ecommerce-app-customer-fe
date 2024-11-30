import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Pagination } from '../../../../shared/models/Pagination/Pagination';

@Component({
  selector: 'app-table-pagination-admin',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './table-pagination-admin.component.html',
  styleUrl: './table-pagination-admin.component.css'
})
export class TablePaginationAdminComponent {
  @Input() route: string = '';
  @Input() pagination: Pagination<any> | null = {
    totalItemsCount: 0,
    pageSize: 0,
    totalPagesCount: 0,
    pageIndex: 0,
    next: false,
    previous: false,
    items: []
  }

  pages: number[] = [];

  ngOnChanges(): void {
    if (this.pagination) {
      this.pages = this.getPages(this.pagination.pageIndex + 1, this.pagination.totalPagesCount);
    }
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 5) {
      return Array.from({ length: total }, (e, i) => i + 1)
    }

    // -1 means other page numbers in between are abreviated
    if (current > 3 && current <= total - 3) {
      return [1, -1, current - 1, current, current + 1, -1, total]
    }

    if (current > total - 3) {
      return [1, -1, total - 3, total - 2, total - 1, total]
    }

    return [1, 2, 3, 4, -1, total]
  }
}
