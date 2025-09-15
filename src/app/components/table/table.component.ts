import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AuthService } from '../../crud-maker/auth/auth.service';
import { ActiveRecordService } from '../../crud-maker/model/active_record.service';
import { Attribute } from '../../crud-maker/model/attribute';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  @Input() model!: ActiveRecordService;
  @Input() errors: any[] = [];
  @Input() totals: any[] = [];
  @Input() simplePagination: boolean = false;
  @Input() classTable: string = 'px-3';
  @Input() hasHeader: boolean = true;
  @Input() hasFilter: boolean = true;
  @Input() hasPagination: boolean = true;

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
    private renderer: Renderer2,
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

    var filterAttrs = this.model.attributes.filter(attr => attr.filtrable);
    filterAttrs.forEach(attr => {
      this.checkIfFilterApplied(attr);
    });
  }

  clearAllFilters() {
    this.model.clearFilters();
    const filterIcons = document.querySelectorAll('filtericon');
    filterIcons.forEach(icon => {
      this.renderer.removeClass(icon, 'text-primary-600');
    });
  }

  closeFilterAndSearch(clear: boolean, attr: Attribute) {
    if (clear) {
      attr.input.value = '';
    }
    this.model.filter();
    const filterContainers = document.querySelectorAll('.p-column-filter-constraints');
    filterContainers.forEach(container => {
      this.renderer.setStyle(container, 'display', 'none');
    });
    this.checkIfFilterApplied(attr);
  }

  clearAllFiltersAndSearch() {
    this.clearAllFilters();
    this.model.filter();
  }

  checkIfFilterApplied(attr: Attribute) {
    const filterElement = document.getElementById(attr.name);
    if (filterElement) {
      const th = filterElement.closest('th');
      if (th) {
        const icon = th.querySelector('filtericon');
        if (icon) {
          if (!['', null, undefined].includes(attr.input.value)) {
            this.renderer.addClass(icon, 'text-primary-600');
          } else {
            this.renderer.removeClass(icon, 'text-primary-600');
          }
        }
      }
    }
  }

  trackById = (index: number, item: any): string => {
    return `${index}`;
  };

  trackByItem = (index: number, item: any): string => {
    return `${item[this.model.primaryKey]}`;
  };

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
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

  handleButtonClick(event: Event, button: any, item: any) {
    if (button.click && !button.disable(item)) {
      button.click(item, event);
    }
  }

  orderBy(column: string, order: string) {
    this.order.sort = this.order.sort == 'ASC' ? 'DESC' : 'ASC';
    this.order.sort = this.order.col != column ? 'ASC' : this.order.sort;
    this.order.col = column;
    this.model.orderBy(column, this.order.sort).all();
  }

  getOrderIcon(column: string): string {
    if (this.order.col != column) {
      return `filter`;
    }
    if (this.order.sort == 'ASC') {
      return `chevron-down`;
    }
    return `chevron-up`;
  }


}
