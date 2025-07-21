import { Component, Input,  } from '@angular/core';
import { TableColumn, TableConfig } from '../../../core/modals/table-modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  Math = Math;
  @Input() config!: TableConfig;

  // Pagination state
  page = 1;
  pageSize = 10;
  get pagedData() {
    if (!this.config.pagination) return this.config.data;
    const start = (this.page - 1) * this.pageSize;
    return this.config.data.slice(start, start + this.pageSize);
  }

  // Sorting state
  sortKey: string | null = null;
  sortAsc = true;
  sort(col: TableColumn) {
    if (!col.sortable) return;
    if (this.sortKey === col.key) this.sortAsc = !this.sortAsc;
    else {
      this.sortKey = col.key;
      this.sortAsc = true;
    }
    this.config.data.sort((a, b) => {
      const av = a[col.key], bv = b[col.key];
      return (av > bv ? 1 : av < bv ? -1 : 0) * (this.sortAsc ? 1 : -1);
    });
  }

  // Selection
  selectedRows: any[] = [];
  toggleRow(row: any) {
    if (this.config.selection === 'single') {
      this.selectedRows = [row];
    } else if (this.config.selection === 'multiple') {
      const idx = this.selectedRows.indexOf(row);
      if (idx > -1) this.selectedRows.splice(idx, 1);
      else this.selectedRows.push(row);
    }
  }
  isRowSelected(row: any) {
    return this.selectedRows.includes(row);
  }

  // Expandable rows
  expandedRows: Set<any> = new Set();
  toggleExpand(row: any) {
    if (this.expandedRows.has(row)) this.expandedRows.delete(row);
    else this.expandedRows.add(row);
  }
  isExpanded(row: any) {
    return this.expandedRows.has(row);
  }

  // Custom cell
  cellValue(row: any, col: TableColumn) {
    if (col.customRender) return col.customRender(row, col);
    return row[col.key];
  }

}
