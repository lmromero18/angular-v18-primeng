import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActiveRecordService } from '../../crud-maker/model/active_record.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [MessageService],
})
export class FormComponent implements OnInit {
  @Input() model!: ActiveRecordService;
  @Input() readonly = false;
  @Input() redirect: CallableFunction;
  @Input() goBack: CallableFunction;
  @Input() containerClass: string = 'w-full sm:w-full md:w-full mx-auto';
  @Input() formClass: string = 'bg-gray-100 flex flex-col m-0 space-y-4 p-3 rounded shadow-sm';
  @Input() multimedia: boolean = false;
  @Input() formTitle: string;
  @Input() formSubTitle: string;
  @Input() saveButtonText: string;
  @Input() hasSaveButton: false;
  @Input() hasCancelButton: false;

  public hasRequired: boolean;

  constructor(
    // public alertService: AlertService,
    public http: HttpClient,
    public route: ActivatedRoute,
    // public toastService: ToastService
  ) { }

  ngOnInit(): void {

    this.hasRequired = this.model
      .getFormInputs(this.readonly)
      .some((el: any) => el.required);

    if (!this.goBack) {
      // this.goBack = () =>
      // this.alertService
      //   .openModalConfirmation('¿Está seguro de cancelar?', ' ')
      //   .then(
      //     (result) => {
      //       if (result.isConfirmed) {
      //         this.toastService.setMessage({ severity: 'info', summary: 'Confirmado', detail: 'Has cancelado la operación' });
      //         this.location.back();
      //       }
      //     },
      //     () => { }
      //   );
    }
  }

  trackById = (index: number, item: any) => {
    return `${index}`;
  };

  trackByType = (index: number, item: any) => {
    return `${item.attr?.getType(true)}`;
  };



  public save(redirect: any): void {

    // Sobreescribir
    if (this.multimedia) {

      // this.alertService
      //   .openModalConfirmation('¿Está seguro de guardar?', ' ')
      //   .then(
      //     (result) => {
      //       if (result.isConfirmed) {
      //         this.model.saveFormData((res: any) => {
      //           this.toastService.setMessage({
      //             severity: 'success',
      //             summary: 'Exito!',
      //             detail: `Guardado exitosamente el Registro ${res[this.model.primaryKey]}`
      //           });
      //           this.location.back();
      //         });
      //       }
      //     },
      //     () => { }
      //   );
    } else {
      // this.alertService
      //   .openModalConfirmation('¿Está seguro de guardar?', ' ')
      //   .then(
      //     (result) => {
      //       if (result.isConfirmed) {
      //         this.model.save((res: any) => {
      //           this.location.back();
      //           if (res.success && res.message) {
      //             this.toastService.setMessage({
      //               severity: 'success',
      //               summary: 'Exito!',
      //               detail: `${res.success}\n${res.message}`
      //             });
      //           }
      //           else
      //             this.toastService.setMessage({
      //               severity: 'success',
      //               summary: 'Exito!',
      //               detail: `Guardado exitosamente el registro ${res[this.model.primaryKey] ? res[this.model.primaryKey] : ''
      //                 }`
      //             });
      //         });
      //       }
      //     },
      //     () => { }
      //   );
    }
  }
}
