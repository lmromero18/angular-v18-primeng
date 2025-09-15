import { Component, Input, OnInit } from '@angular/core';
import { FormInput } from '../../crud-maker/model/input';
import { Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { FechaService } from '../../services/fecha.service';

@Component({
  selector: 'app-input-calendar',
  templateUrl: './input-calendar.component.html',
  styles: ``
})
export class InputCalendarComponent implements OnInit {
  @Input() data: FormInput;
  @Input() isForm = true;
  @Input() forceReadOnly = false;
  @Input() forceValidation = false;
  public inputValue: any;
  public isInvalid: () => boolean;

  constructor(
    public fechaService: FechaService
  ) { }


  ngOnInit(): void {
    this.isInvalid = () => {
      return this.data?.formControl?.invalid &&
        (this.data?.formControl?.dirty || (this.data?.formControl?.touched && !this.data?.value || this.data?.value.includes([null, undefined, ''])));
    };
  }

  hasRequiredValidator(): boolean {
    return this.data.validations?.some(validator => validator === Validators.required);
  }

  public trackById = (index: number, item: any): string => {
    return `${index}`;
  };

  getDateFormat(): string {
    switch (this.data.calendarType) {
      case 'month':
        return 'mm/yy';
      case 'year':
        return 'yy';
      default:
        return 'dd/mm/yy';
    }
  }

  onChange(event: any): void {
    const formatoEntrada = 'ddd MMM DD YYYY HH:mm:ss';
    let formatoSalida: string;

    switch (this.data.calendarType) {
      case 'month':
        formatoSalida = 'YYYY-MM';
        break;
      case 'year':
        formatoSalida = 'YYYY';
        break;
      case 'time':
        formatoSalida = 'HH:mm:ss';
        break;
      case 'dateTime':
        formatoSalida = 'YYYY-MM-DD HH:mm:ss';
        break;
      default:
        formatoSalida = 'YYYY-MM-DD';
        break;
    }

    if (event === null) {
      this.data.value = null;
    }
    else {
      if (Array.isArray(event)) {
        this.data.value = event
          .filter(fecha => fecha !== null) // Filtrar valores null
          .map(fecha => this.fechaService.obtenerFechaConFormatoFormateadaEnString(fecha, formatoEntrada, formatoSalida))
          .join(',');
      } else {
        this.data.value = this.fechaService.obtenerFechaConFormatoFormateadaEnString(event, formatoEntrada, formatoSalida)
      }
    }
  }
}