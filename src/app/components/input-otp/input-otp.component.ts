import { Component, Input, OnInit, ElementRef, Renderer2, AfterViewInit, DoCheck } from '@angular/core';
import { FormInput } from '../../crud-maker/model/input';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-input-otp',
  templateUrl: './input-otp.component.html',
  styles: ``
})
export class InputOtpComponent implements OnInit, AfterViewInit, DoCheck {
  @Input() data: FormInput;
  @Input() forceReadOnly = false;
  @Input() isForm = true;
  public isInvalid: () => boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.isInvalid = () => {
      return this.data?.formControl?.invalid &&
        (this.data?.formControl?.dirty || (this.data?.formControl?.touched && (!this.data?.value || this.data?.value.includes([null, undefined, '']))));
    };
  }

  ngAfterViewInit(): void {
    this.applyInvalidClass();
  }

  ngDoCheck(): void {
    this.applyInvalidClass();
  }

  private applyInvalidClass(): void {
    const invalid = this.isInvalid();
    const inputs = this.el.nativeElement.querySelectorAll('.p-inputotp-input');

    inputs.forEach(input => {
      if (invalid) {
        this.renderer.addClass(input, 'ng-invalid');
        this.renderer.addClass(input, 'ng-dirty');
      } else {
        this.renderer.removeClass(input, 'ng-invalid');
        this.renderer.removeClass(input, 'ng-dirty');
      }
    });
  }

  hasRequiredValidator(): boolean {
    return this.data.validations?.some(validator => validator === Validators.required);
  }
}