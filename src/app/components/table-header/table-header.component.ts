import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AuthService } from '../../crud-maker/auth/auth.service';
import { ActiveRecordService } from '../../crud-maker/model/active_record.service';
import { Attribute } from '../../crud-maker/model/attribute';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styles: ``
})
export class TableHeaderComponent implements OnInit {
  @Input() model!: ActiveRecordService;


  @ViewChild('filters') filters: OverlayPanel;

  public order: any = {
    col: '',
    sort: '',
  };

  public columns: any[] = [];
  public searchTerm: string = '';
  public filteredColumns: any[] = [];
  public downloadMenuItems: MenuItem[];
  public showSingleFilters: boolean = false;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.downloadMenuItems = this.model.actions?.['download']?.allowedTypes().map(type => ({
      label: type,
      command: () => this.model.download(type)
    }))
    this.columns = this.filteredColumns = this.model.listables();
  }

  applyFilters(closeOnApply: boolean = true) {
    this.model.filter();
    if (closeOnApply) {
      this.filters.hide();
    }
  }

  clearAllFilters() {
    this.model.clearFilters();
  }

  clearAllFiltersAndSearch() {
    this.clearAllFilters();
    this.model.filter();
  }

  filterColumns() {
    const normalizedSearchTerm = this.normalizeString(this.searchTerm);
    this.filteredColumns = this.columns.filter(column =>
      this.normalizeString(column.label).includes(normalizedSearchTerm)
    );
  }

  hideColumns(colName: string, event: any) {
    this.model.getAttribute(colName).listable = !event.checked;
    this.filteredColumns = this.filteredColumns.map(column => {
      if (column.name == colName) {
        column.checked = event.checked;
      }
      return column;
    });
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  orderBy(column: string, order: string) {
    this.order.sort = this.order.sort == 'ASC' ? 'DESC' : 'ASC';
    this.order.sort = this.order.col != column ? 'ASC' : this.order.sort;
    this.order.col = column;
    this.model.orderBy(column, this.order.sort).all();
  }

}
