import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styles: ``
})

export class PaginatorComponent implements OnInit {
  @Input() model: any = { pagination: null };
  public total: number = 0;
  public current_page;
  public per_page = 20;
  public currentPageReport;
  public pagination: any;

  /**
   * Método constructor de la clase
   */
  constructor(private elementRef: ElementRef) { }

  /**
   * Método que se ejecuta al momento de carga inicial de la clase.
   * Realiza la inicialización de las propiedades del paginador
   */
  ngOnInit() {
    this.pagination = this.model?.pagination;
    if (this.pagination) {
      this.current_page = this.current_page || this.pagination.current_page;
      this.per_page = this.per_page || this.pagination.per_page;
      this.total = this.total || this.pagination.total;
      this.currentPageReport = `${this.pagination?.to ? this.pagination.to : '0'} / ${this.pagination.total}`;
    }
  }

  ngDoCheck() {
    const newPagination = this.model?.pagination;

    if (newPagination != this.pagination) {
      this.ngOnInit();
    }
  }

  onPageChange(event) {
    // event.first es el índice del primer elemento en esta página
    // event.page es el índice de la página actual (0 para la primera página, 1 para la segunda, etc.)
    // event.rows es el número de filas por página
    // event.pageCount es el número total de páginas      
    this.model.paginate(event.rows).all((res: any) => {
      this.currentPageReport = `${event.first + event.rows - 1} / ${this.total}`;
      const newPage = event.page + 1;
      this.model.setPage(newPage).showLoading(true).all();
    });
  }

  trackById = (index: number, item: any) => {
    return item;
  };
}
