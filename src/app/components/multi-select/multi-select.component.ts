import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { PrimeNGConfig } from 'primeng/api';
import { FormInput } from '../../crud-maker/model/input';
import { Validators } from '@angular/forms';
import { SelectOption } from '../../crud-maker/model/select_option';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
})
export class MultiSelectComponent implements OnInit {
  @Input() data: FormInput;
  @Input() isForm = true;
  @Input() forceValidation = false;
  @Input() forceReadOnly = false;
  public items: any;
  public inputData: any;
  public haveAgroupation = false;
  public isInvalid: () => boolean;
  public isDisabled: () => boolean;

  constructor(
    public translate: TranslateService,
    public translateService: TranslateService,
    public config: PrimeNGConfig
  ) {
  }

  ngAfterViewInit() {
    this.translateChange('es')
  }

  translateChange(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

  public async ngOnInit() {
    this.isInvalid = () => {
      return (this.data?.formControl?.invalid && (this.data?.formControl?.dirty || this.data?.formControl?.touched));
    };

    this.isDisabled = () => this.isForm && (this.forceReadOnly || this.data?.readonly || this.data?.disabled);

    this.items = this.data?.getOptions(this.isForm);
    if (this.hasGroupFunction(this.data.selectOptions)) {
      this.haveAgroupation = true;
    }
  }

  private hasGroupFunction(option: any): option is SelectOption {
    var selectOption = option as SelectOption;
    return selectOption.groupFunction !== undefined && selectOption.groupFunction !== null;
  }

  hasRequiredValidator(): boolean {
    return this.data.validations?.some(validator => validator === Validators.required);
  }

  ngDoCheck() {
    const newItems = this.data.getOptions(this.isForm);

    if (JSON.stringify(newItems) != JSON.stringify(this.items) || !this.inputData) {
      this.items = newItems;
      this.inputData = _.filter(this.items, x => this.data?.value.includes(x.value));
    }

    if (this.items.length > 1 && this.data.value && this.inputData && !_.isEqual(this.data?.value?.sort(), this.inputData?.map(item => item.value)?.sort())) {
      this.inputData = _.filter(this.items, x => this.data?.value.includes(x.value));
    }
  }

  onClearDropdown() {
    this.data.value = [];
  }

  event(values) {
    this.data.value = values.map(value => value.value);
  }


  public trackById = (index: number, item: any): string => {
    return `${item.value}`;
  };

}
