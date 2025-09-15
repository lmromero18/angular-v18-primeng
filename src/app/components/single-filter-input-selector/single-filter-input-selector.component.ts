import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActiveRecordService } from '../../crud-maker/model/active_record.service';

@Component({
  selector: 'app-single-filter-input-selector',
  templateUrl: './single-filter-input-selector.component.html',
  styles: ``
})
export class SingleFilterInputSelectorComponent {
  @Input() model!: ActiveRecordService;
  @Input() isForm = false;
  @Input() filter;
  @Output() filterApplied = new EventEmitter<void>();

  onKeyUp(event: KeyboardEvent) {
    this.filterApplied.emit();
  }
}
