import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { FormInput } from '../../crud-maker/model/input';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-input-id',
  templateUrl: './input-id.component.html',
  styles: [
    `.p-multiselect, .p-dropdown {
      border-radius: 0.5rem 0 0 0.5rem !important;
    }`
  ]
})
export class InputIdComponent implements OnInit {
  @Input() data: FormInput;
  @Input() isForm = true;
  @Input() forceReadOnly = false;
  @Input() forceValidation = false;
  public nuIdentificacion: string = '';
  public keyFilter: any;
  public tiIdentificacion = { name: 'V', value: 'V' };
  public optionsData = [
    {
      name: 'V',
      value: 'V',
    },
    {
      name: 'E',
      value: 'E',
    },
    {
      name: 'P',
      value: 'P',
    },
    {
      name: 'J',
      value: 'J',
    },
    {
      name: 'C',
      value: 'C',
    },
    {
      name: 'G',
      value: 'G',
    },
  ];
  public max: number = 8;
  public inputData: any;
  public keys = Object.keys;
  constructor(
    private elementRef: ElementRef,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.data.value && (this.optionsData = this.data.value[0]) && (this.nuIdentificacion = this.data.value.slice(1));
  }

  public trackById = (index: number, item: any): string => {
    return `${index}`;
  };

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

  hasRequiredValidator(): boolean {
    return this.data.validations?.some(validator => validator === Validators.required);
  }

  ngDoCheck() {
    const newOptionsData = this.optionsData;
    if (JSON.stringify(newOptionsData) != JSON.stringify(this.optionsData)) {
      this.optionsData = newOptionsData;
      this.inputData = _.find(this.optionsData, x => x.value == this.data?.value);
    }

    if (!this.inputData) {
      this.inputData = _.find(this.optionsData, x => x.value == this.data?.value);
    }

    if (!this.data.value && this.nuIdentificacion != '') {
      this.tiIdentificacion = { name: 'V', value: 'V' };;
      this.nuIdentificacion = '';
    }
  }


  onChange() {
    const selectedTypeId = this.tiIdentificacion.value;
    switch (selectedTypeId) {
      case 'V':
      case 'G':
      case 'C':
      case 'E':
        this.max = 8;
        this.keyFilter = 'int';
        break;
      case 'J':
        this.max = 9;
        this.keyFilter = 'int';
        break;
      default:
        this.max = 20;
        this.keyFilter = null;
    }
    this.data.value = this.tiIdentificacion.value + this.nuIdentificacion;
  }

}