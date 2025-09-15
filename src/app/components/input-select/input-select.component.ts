import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { FormInput } from '../../crud-maker/model/input';
import { Validators } from '@angular/forms';
import { SelectOption } from '../../crud-maker/model/select_option';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
})
export class InputSelectComponent implements OnInit {
  @Input() data: FormInput;
  @Input() isForm = true;
  @Input() forceReadOnly = false;
  @Input() forceValidation = false;
  public optionsData: any;
  public inputData: any;
  public isInvalid: () => boolean;
  public isDisabled: () => boolean;
  public haveAgroupation = false;

  constructor(
    public translate: TranslateService
  ) { }

  public async ngOnInit() {
    this.optionsData = this.data?.getOptions(this.isForm);

    if (this.hasGroupFunction(this.data.selectOptions)) {
      this.haveAgroupation = true;
    }

    this.isInvalid = () => {
      return this.data?.formControl?.invalid &&
        (this.data?.formControl?.dirty || (this.data?.formControl?.touched && !this.inputData?.value || this.inputData?.value.includes([null, undefined, ''])));
    };

    this.isDisabled = () => this.isForm && (this.forceReadOnly || this.data?.readonly || this.data?.disabled);

  }

  private hasGroupFunction(option: any): option is SelectOption {
    var selectOption = option as SelectOption;
    return selectOption.groupFunction !== undefined && selectOption.groupFunction !== null;
  }

  ngDoCheck() {
    const newOptionsData = this.data.getOptions(this.isForm);
    if (JSON.stringify(newOptionsData) != JSON.stringify(this.optionsData)) {
      this.optionsData = newOptionsData;
      this.inputData = _.find(this.optionsData, x => x.value == this.data?.value);
    }

    if (!this.inputData || (this.inputData && this.data.value != this.inputData?.value)) {
      this.inputData = _.find(this.optionsData, x => x.value == this.data?.value);
    }
  }

  hasRequiredValidator(): boolean {
    return this.data.validations?.some(validator => validator === Validators.required) && this.isForm;
  }

  public trackById = (index: number, item: any): string => {
    return `${index}`;
  };

  onClearDropdown() {
    this.data.value = null;
  }

}
