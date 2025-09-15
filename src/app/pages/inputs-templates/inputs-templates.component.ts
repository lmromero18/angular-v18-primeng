import { Component, Injector } from '@angular/core';
import { ControllerComponent } from '../../crud-maker/controller.component';
import { ActiveRecordService } from '../../crud-maker/model/active_record.service';
import { InputsTemplatesModel as Model } from './inputs-templates.service';
@Component({
  selector: 'app-inputs-templates',
  templateUrl: './inputs-templates.component.html',
  styles: ``
})
export class InputsTemplatesComponent extends ControllerComponent {
  public override modelClass: typeof ActiveRecordService = Model;


  constructor(
    injector: Injector,
  ) {
    super(injector);
  }
}
