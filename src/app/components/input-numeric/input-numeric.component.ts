import { Component, Input, OnInit } from '@angular/core';
import { FormInput } from '../../crud-maker/model/input';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-input-numeric',
  templateUrl: './input-numeric.component.html',
  styles: ``
})
export class InputNumericComponent implements OnInit {
  @Input() data: FormInput;
  @Input() isForm = true;
  @Input() forceReadOnly = false;
  @Input() forceValidation = false;
  public isInvalid: () => boolean;


  ngOnInit(): void {
    this.isInvalid = () => {
      return this.data?.formControl?.invalid &&
        (this.data?.formControl?.dirty || (this.data?.formControl?.touched && !this.data?.value || this.data?.value?.toString().includes([null, undefined, ''])));
    };
  }

  hasRequiredValidator(): boolean {
    return this.data.validations?.some(validator => validator === Validators.required);
  }

  public trackById = (index: number, item: any): string => {
    return `${index}`;
  };
}
