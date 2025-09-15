import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { FormInput } from '../../crud-maker/model/input';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styles: [],
})
export class InputPasswordComponent implements OnInit {
  @Input() data: FormInput;
  @Input() isForm = true;
  @Input() forceReadOnly = false;
  @Input() forceValidation = false;
  @Input() feedback;
  public isInvalid: () => boolean;

  constructor(
    public translateService: TranslateService,
    public config: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.isInvalid = () => {
      return this.data?.formControl?.invalid &&
        (this.data?.formControl?.dirty || (this.data?.formControl?.touched && !this.data?.value || this.data?.value.includes([null, undefined, ''])));
    };
  }

  public trackById = (index: number, item: any): string => {
    return `${index}`;
  };

  ngAfterViewInit() {
    this.translateChange('es')
  }

  hasRequiredValidator(): boolean {
    return this.data.validations?.some(validator => validator === Validators.required);
  }

  translateChange(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

}
