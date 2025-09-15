import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActiveRecordService } from '../../crud-maker/model/active_record.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  @Input() model!: ActiveRecordService;
  @Output() filtersApplied = new EventEmitter<void>();

  public isForm = false;
  trackById = (index: number): string => `${index}`;

  onFilterApplied() {
    this.filtersApplied.emit();
  }
}