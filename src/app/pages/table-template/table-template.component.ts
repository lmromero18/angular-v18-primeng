import { Component, Injector, OnInit } from '@angular/core';
import { ControllerComponent } from '../../crud-maker/controller.component';
import { ActiveRecordService } from '../../crud-maker/model/active_record.service';
import { BoletaModel as Model } from './boleta.service';

@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styles: ``
})
export class TableTemplateComponent extends ControllerComponent implements OnInit {
  public override modelClass: typeof ActiveRecordService = Model;



  constructor(
    public override injector: Injector,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.model
      .paginate(20)
      .relations(['municipio.parroquias', 'estado', 'funcionario'])
      .orderBy('id_solicitud', 'DESC')
      .all();
  }

}