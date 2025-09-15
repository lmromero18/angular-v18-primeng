import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FechaService } from './fecha.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**
 * Clase representativa del servicio para validaciones de formularios, como contenedora de los
 * métodos relacionados a la gestión de validaciones en los formularios de la aplicación
 */
@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  contrasenaValidators: any[];

  private obsParam$: Subject<void> = new Subject<void>();

  /**
   * Método constructor de la clase
   */
  constructor(
    private formBuilder: FormBuilder,
    private fechaService: FechaService,
  ) { }

  /**
   * Método que permite la comparación de valores entre dos campos de un formulario en
   * específico, a partir de los mismos obtenidos por parámetros
   */
  public greaterthan(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['greaterthan']) {
        return;
      }

      if (parseFloat(control.value) < parseFloat(matchingControl.value)) {
        control.setErrors({ greaterthan: true });
      } else if (control.hasError('greaterthan')) {
        delete control.errors['greaterthan'];
        control.updateValueAndValidity();
      }
    };
  }

  /**
   * Método que permite la comparación de valores entre dos campos de un formulario en
   * específico, a partir de los mismos obtenidos por parámetros
   */
  public smallerthan(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['smallerthan']) {
        return;
      }

      if (parseFloat(control.value) > parseFloat(matchingControl.value)) {
        control.setErrors({ smallerthan: true });
      } else if (control.hasError('smallerthan')) {
        delete control.errors['smallerthan'];
        control.updateValueAndValidity();
      }
    };
  }

  /**
   * Método que permite la comparación de valores entre dos campos de un formulario en
   * específico, a partir de los mismos obtenidos por parámetros
   */
  private MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustmatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustmatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


}
