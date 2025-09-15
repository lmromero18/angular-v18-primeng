import { TitleCasePipe, formatDate, formatNumber } from '@angular/common';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ActiveRecordService } from '../../crud-maker/model/active_record.service';
import { Attribute } from '../../crud-maker/model/attribute';

@Injectable({
  providedIn: 'root',
})
export class BoletaModel extends ActiveRecordService {
  static override permissions = {
    create: '',
    read: 'P002',
    update: 'P089',
    delete: 'P088',
    ver_listado: 'P001',
    registrar_pago: 'P003',
    ver_todas_solicitudes: 'P092',
    editar_municipio: 'P100',
    editar_parroquia: 'P101',
  };

  public override name = 'Boletas';
  public override endpoint = 'solicitud';
  public override primaryKey = 'id_solicitud';
  public callback: CallableFunction;
  public router: Router;
  public titlecasePipe = new TitleCasePipe();

  public override attributes: Attribute[] = [
    // Id solicitud
    new Attribute({
      name: 'id_solicitud',
      label: 'Nro de boleta',
      type: 'string',
      filtrable: true,
      listable: true,
      creatable: false,
      updatable: false,
      input: {
        type: 'text',
        keyFilter: 'int',
      },
    }),

    new Attribute({
      name: 'fe_solicitud_filtro',
      label: 'Fecha creación',
      type: 'string',
      getter: (item: any) =>
        item.fe_solicitud_filtro &&
        formatDate(item.fe_solicitud_filtro, 'dd-MM-YYYY', 'es'),
      filtrable: true,
      input: {
        type: 'calendar',
        disabled: true,
        container_class: 'col-md-6',
      },
    }),

    new Attribute({
      name: 'fe_maxima_pago',
      label: 'Fecha máxima de pago',
      type: 'string',
      getter: (item: any) =>
        item.fe_maxima_pago &&
        formatDate(item.fe_maxima_pago, 'dd-MM-YYYY', 'es'),
      filtrable: true,
      input: {
        type: 'calendar',
        disabled: true,
        container_class: 'col-md-6',
      },
    }),

    new Attribute({
      name: 'tag',
      label: 'Estatus boleta / pago',
      type: 'string',
      listable: false,
      filtrable: false,
      input: {
        type: 'tag',
      },
    }),

    new Attribute({
      name: 'st_solicitud',
      label: 'Estatus de la boleta',
      type: 'string',
      filtrable: true,
      getter: (item: any) => {
        if (item.st_solicitud == 'COMPLETA')
          return `<span class="bg-green text-white px-3 w-75 d-flex justify-content-center rounded align-items-center ">${this.titlecasePipe.transform(item.st_solicitud).replace('_', ' ')}</span>`
        else if (item.st_solicitud == 'INCOMPLETA' || item.st_solicitud == 'CANCELADA')
          return `<span class="bg-danger text-white px- w-75 d-flex justify-content-center rounded align-items-center ">${this.titlecasePipe.transform(item.st_solicitud).replace('_', ' ')}</span>`
        else if (item.st_solicitud == 'POR_PAGAR')
          return `<span class="bg-warning text-white px- w-75 d-flex justify-content-center rounded align-items-center ">${this.titlecasePipe.transform(item.st_solicitud).replace('_', ' ')}</span>`
        return ""
      },
      listable: true,
      input: {
        type: 'select',
        disabled: true,
        container_class: 'col-md-6',
        options: [
          {
            name: 'Completa',
            value: 'COMPLETA',
          },
          {
            name: 'Incompleta',
            value: 'INCOMPLETA',
          },
          {
            name: 'Por pagar',
            value: 'POR_PAGAR',
          },
          {
            name: 'Cancelada',
            value: 'CANCELADA',
          },

        ],

      },

    }),

    // Estatus banco
    new Attribute({
      name: 'st_banco',
      label: 'Estatus del pago',
      type: 'string',
      filtrable: true,
      getter: (item: any) => {
        if (item.st_banco == 'PAGADO' || item.st_banco == 'TRABAJO_SOCIAL')
          return `<span class="bg-green text-white px-3 w-75 d-flex justify-content-center rounded align-items-center ">${this.titlecasePipe.transform(item.st_banco).replace('_', ' ')}</span>`
        else if (item.st_banco == 'NO_PAGADO' || item.st_banco == 'NO_APLICA')
          return `<span class="bg-danger text-white px- w-75 d-flex justify-content-center rounded align-items-center ">${this.titlecasePipe.transform(item.st_banco).replace('_', ' ')}</span>`
        else if (item.st_banco == 'POR_VERIFICAR')
          return `<span class="bg-warning text-white px- w-75 d-flex justify-content-center rounded align-items-center ">${this.titlecasePipe.transform(item.st_banco).replace('_', ' ')}</span>`
        else if (item.st_banco == 'POR_VERIFICAR' || item.st_banco == 'EN_ESPERA_TRABAJO_SOCIAL')
          return `<span class="bg-warning text-white px- w-75 d-flex justify-content-center rounded align-items-center ">Trabajo Social</span>`
        return ""
      },
      listable: true,
      input: {
        type: 'select',
        disabled: true,
        container_class: 'col-md-6',
        options: [
          {
            name: 'Pagado',
            value: 'PAGADO',
          },
          {
            name: 'No pagado',
            value: 'NO_PAGADO',
          },
          {
            name: 'Trabajo social',
            value: 'TRABAJO_SOCIAL',
          },
          {
            name: 'En espera de trabajo social',
            value: 'EN_ESPERA_TRABAJO_SOCIAL',
          },
          {
            name: 'Por verificar',
            value: 'POR_VERIFICAR',
          },

        ],
      },
    }),

    new Attribute({
      name: 'mo_monto',
      label: 'Monto de la boleta',
      type: 'string',
      listable: true,
      getter: (item: any) => 'Bs. ' + formatNumber(item.mo_monto, 'es', '1.2-2'),
      input: {
        type: 'hidden',
      },
    }),

    new Attribute({
      name: 'tag1',
      label: 'Ubicación',
      type: 'string',
      listable: false,
      filtrable: false,
      input: {
        type: 'tag',
      },
    }),

    new Attribute({
      name: 'id_estado_solicitud',
      label: 'Estado',
      type: 'string',
      filtrable: false,
      getter: (item: any) => item?.estado?.nb_estado,
      // value: '13',
      listable: true,
      input: {
        type: 'select',
        disabled: true,
        container_class: 'col-md-4',
        options: this.setSelectSource(
          'nb_estado',
          'id_estado',
          (model: ActiveRecordService) => {
            model.from('estado').paginate(0)
          }
        ),
        validations: [Validators.required],
      },
    }),

    new Attribute({
      name: 'id_municipio_solicitud',
      label: 'Municipio',
      type: 'string',
      filtrable: false,
      listable: true,
      getter: (item: any) => item?.municipio?.nb_municipio,
      input: {
        type: 'select',
        disabled: true,
        container_class: 'col-md-4',
        // validations: [Validators.required],
        options: this.setSelectSource(
          'nb_municipio',
          'id_municipio',
          (model: ActiveRecordService) => {
            model.from('municipio').paginate(0)
          },
          (item: any) => {
            return item.id_estado == this.getAttribute('id_estado_solicitud')?.input?.value
          }
        ),
        change: (data: any) => {

        }
      },
    }),

    new Attribute({
      name: 'id_parroquia_solicitud',
      label: 'Parroquia',
      type: 'string',
      filtrable: false,
      listable: true,
      getter: (item: any) => _.find(item?.municipio?.parroquias, x => x.id_parroquia == item.id_parroquia_solicitud)?.nb_parroquia,
      input: {
        type: 'select',
        disabled: true,
        container_class: 'col-md-4',
        options: this.setSelectSource(
          'nb_parroquia',
          'id_parroquia',
          (model: ActiveRecordService) => {
            model.from('parroquia').paginate(0)
          },
          //REVISAR
          (item: any) => {

            return item['id_municipio'] == this.getAttribute('id_municipio_solicitud').input.value && item['id_estado'] == this.getAttribute('id_estado_solicitud')?.input?.value
          }
        ),
      },
    }),

    // //Eje
    // new Attribute({
    //   name: 'co_eje',
    //   label: 'Eje',
    //   type: 'string',
    //   filtrable: false,
    //   listable: true,
    //   input: {
    //     type: 'text',
    //     container_class: 'col-md-6',
    //   },
    // }),

    // //Cuadrante
    // new Attribute({
    //   name: 'co_cuadrante',
    //   label: 'Cuadrante',
    //   type: 'string',
    //   filtrable: false,
    //   listable: true,
    //   input: {
    //     type: 'text',
    //     container_class: 'col-md-6',
    //   },
    // }),

    //direccion
    new Attribute({
      name: 'tx_direccion_ubicacion',
      label: 'Dirección',
      type: 'string',
      filtrable: false,
      listable: false,
      input: {
        type: 'textarea',
        disabled: true,
        container_class: 'col-md-12',
      },
    }),

    new Attribute({
      name: 'tag2',
      label: 'Datos del ciudadano',
      type: 'string',
      listable: false,
      filtrable: false,
      input: {
        type: 'tag',
      },
    }),

    new Attribute({
      name: 'ti_identificacion_rzn_social',
      label: 'Tipo de identificación del ciudadano',
      type: 'string',
      filtrable: false,
      input: {
        type: 'select',
        disabled: true,
        container_class: 'col-md-4',
        options: [
          {
            name: 'Seleccione...',
            value: '',
          },
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
        ],
        change: (item: any) => {
          this.getAttribute('va_identificacion_rzn_social').input.value = '';
          switch (item) {
            case 'V':
            case 'E':
              this.getAttribute('va_identificacion_rzn_social').input.keyFilter = 'int'
              this.getAttribute('va_identificacion_rzn_social').input.max = 8;
              this.getAttribute('va_identificacion_rzn_social').input.validations.push(Validators.maxLength(8));
              break;
            case 'P':
              this.getAttribute('va_identificacion_rzn_social').input.keyFilter = null;
              this.getAttribute('va_identificacion_rzn_social').input.max = 20;
              this.getAttribute('va_identificacion_rzn_social').input.validations.push(Validators.maxLength(20));
              break;
            default:
              this.getAttribute('va_identificacion_rzn_social').input.keyFilter = 'int'
              this.getAttribute('va_identificacion_rzn_social').input.max = 9;
              this.getAttribute('va_identificacion_rzn_social').input.validations.push(Validators.maxLength(9));
              break;
          }
        },
      },
    }),

    new Attribute({
      name: 'va_identificacion_rzn_social',
      label: 'Identificación del ciudadano',
      type: 'string',
      filtrable: false,
      input: {
        type: 'text',
        container_class: 'col-md-4',
        disabled: true,
        max: 8,
        getter: (item: any) => item?.toUpperCase(),
        validations: []
      },
    }),

    //nb_razon_social
    new Attribute({
      name: 'nb_razon_social',
      label: 'Nombre/Razón social',
      type: 'string',
      filtrable: false,
      listable: true,
      input: {
        type: 'text',
        container_class: 'col-md-4',
        disabled: true
      },
    }),

    //tx_sexo_rzn_social
    new Attribute({
      name: 'tx_sexo_rzn_social',
      label: 'Sexo',
      type: 'string',
      filtrable: false,
      listable: false,
      input: {
        type: 'select',
        disabled: true,
        options: [
          {
            name: 'Seleccione...',
            value: '',
          },
          {
            name: 'Masculino',
            value: 'M',
          },
          {
            name: 'Femenino',
            value: 'F',
          }
        ],
        container_class: 'col-md-4',
      },
    }),

    //fe_nacimiento_rzn_social
    new Attribute({
      name: 'fe_nacimiento_rzn_social',
      label: 'Fecha de nacimiento',
      type: 'string',
      filtrable: false,
      listable: false,
      input: {
        type: 'calendar',
        container_class: 'col-md-4',
        disabled: true,
      },
    }),

    //edad
    new Attribute({
      name: 'edad',
      label: 'Edad',
      type: 'string',
      filtrable: false,
      listable: false,
      input: {
        type: 'text',
        disabled: true,
        keyFilter: 'int',
        container_class: 'col-md-4'
      },
    }),

    // Correo
    new Attribute({
      name: 'tx_correo_rzn_social',
      label: 'Correo',
      type: 'string',
      filtrable: false,
      listable: false,
      input: {
        type: 'text',
        container_class: 'col-md-4',
        max: 150,
      },
    }),

    //tx_oficio_rzn_social
    new Attribute({
      name: 'tx_oficio_rzn_social',
      label: 'Oficio',
      type: 'string',
      filtrable: false,
      listable: false,
      input: {
        type: 'text',
        container_class: 'col-md-4',
        max: 150,
        disabled: true,
        validations: [Validators.maxLength(150)],
      },
    }),

    //tx_telefono_rzn_social
    new Attribute({
      name: 'tx_telefono_rzn_social',
      label: 'Teléfono',
      type: 'string',
      filtrable: false,
      listable: false,
      input: {
        type: 'text',
        container_class: 'col-md-4',
        max: 11,
        validations: [Validators.maxLength(11)],
      },
    }),

    new Attribute({
      name: 'tag3',
      label: 'Datos del funcionario',
      type: 'string',
      listable: false,
      filtrable: false,
      input: {
        type: 'tag',
      },
    }),

    new Attribute({
      name: 'id_creado',
      label: 'Nombre del funcionario',
      type: 'string',
      filtrable: true,
      listable: true,
      getter: (item: any) => {
        const nb_persona_msp = item?.funcionario?.nb_persona_msp || '';
        const nb_persona_msp1 = item?.funcionario?.nb_persona_msp1 || '';
        return (nb_persona_msp + ' ' + nb_persona_msp1).trim();
      },
      input: {
        type: 'select',
        container_class: 'col-md-6',
        disabled: true,
        validations: [Validators.required],
        options: this.setSelectSource(
          (item: any) => `${item.nb_persona_msp} ${item.nb_persona_msp1}`, 'id_usuario',
          (model: ActiveRecordService) => {
            model
              .from('persona_msp')
              .orderBy('nb_persona_msp')
              .paginate(0);
          }
        ),
      },
    }),


    // //nb_persona_msp
    // new Attribute({
    //   name: 'nb_persona_msp',
    //   label: 'Nombre del funcionario',
    //   type: 'string',
    //   filtrable: true,
    //   listable: true,
    //   getter: (item: any) => item?.funcionario?.nb_persona_msp,
    //   input: {
    //     type: 'text',
    //     disabled: true,
    //     container_class: 'col-md-6'
    //   },
    // }),


    new Attribute({
      name: 'tx_identificacion_creado',
      label: 'Identificación del funcionario',
      type: 'string',
      filtrable: true,
      creatable: false,
      updatable: false,
      getter: (item: any) => item?.tx_identificacion_creado[0] + '-' + item?.tx_identificacion_creado?.slice(1),
      input: {
        type: 'id'
      }
    }),

    //ti_id_persona_msp
    new Attribute({
      name: 'ti_id_persona_msp',
      label: 'Tipo de identificación del funcionario',
      type: 'string',
      filtrable: false,
      listable: false,
      getter: (item: any) => item?.funcionario?.ti_id_persona_msp,
      input: {
        type: 'select',
        disabled: true,
        container_class: 'col-md-6',
        options: [
          {
            name: 'Seleccione...',
            value: '',
          },
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
        ],
        change: (item: any) => {
          this.getAttribute('nu_id_persona_msp').input.value = '';
          switch (item) {
            case 'V':
            case 'E':
              this.getAttribute('nu_id_persona_msp').input.keyFilter = 'int'
              this.getAttribute('nu_id_persona_msp').input.max = 8;
              this.getAttribute('nu_id_persona_msp').input.validations.push(Validators.maxLength(8));
              break;
            case 'P':
              this.getAttribute('nu_id_persona_msp').input.keyFilter = null;
              this.getAttribute('nu_id_persona_msp').input.max = 20;
              this.getAttribute('nu_id_persona_msp').input.validations.push(Validators.maxLength(20));
              break;
            default:
              this.getAttribute('nu_id_persona_msp').input.keyFilter = 'int'
              this.getAttribute('nu_id_persona_msp').input.max = 9;
              this.getAttribute('nu_id_persona_msp').input.validations.push(Validators.maxLength(9));
              break;
          }
        },
      },
    }),

    //nu_id_persona_msp
    new Attribute({
      name: 'nu_id_persona_msp',
      label: 'Identificación del funcionario',
      type: 'string',
      filtrable: false,
      listable: false,
      getter: (item: any) => item?.funcionario?.nu_id_persona_msp,
      input: {
        type: 'text',
        disabled: true,
        container_class: 'col-md-6',
        validations: []
      },
    }),

    //nu_telefono
    new Attribute({
      name: 'nu_telefono',
      label: 'Teléfono del funcionario',
      type: 'string',
      filtrable: false,
      listable: true,
      getter: (item: any) => item?.funcionario?.nu_telefono,
      input: {
        type: 'text',
        disabled: true,
        container_class: 'col-md-6'
      },
    }),

    new Attribute({
      name: 'nu_telefono',
      label: 'Teléfono del funcionario',
      type: 'string',
      filtrable: false,
      listable: true,
      getter: (item: any) => item?.funcionario?.nu_telefono,
      input: {
        type: 'text',
        disabled: true,
        container_class: 'col-md-6'
      },
    }),

    new Attribute({
      name: 'nu_telefono',
      label: 'Teléfono del funcionario',
      type: 'string',
      filtrable: false,
      listable: true,
      getter: (item: any) => item?.funcionario?.nu_telefono,
      input: {
        type: 'text',
        disabled: true,
        container_class: 'col-md-6'
      },
    }),

    new Attribute({
      name: 'nu_telefono',
      label: 'Teléfono del funcionario',
      type: 'string',
      filtrable: false,
      listable: true,
      getter: (item: any) => item?.funcionario?.nu_telefono,
      input: {
        type: 'text',
        disabled: true,
        container_class: 'col-md-6'
      },
    }),

    new Attribute({
      name: 'nu_telefono',
      label: 'Teléfono del funcionario',
      type: 'string',
      filtrable: false,
      listable: true,
      getter: (item: any) => item?.funcionario?.nu_telefono,
      input: {
        type: 'text',
        disabled: true,
        container_class: 'col-md-6'
      },
    }),

    new Attribute({
      name: 'nu_telefono',
      label: 'Teléfono del funcionario',
      type: 'string',
      filtrable: false,
      listable: true,
      getter: (item: any) => item?.funcionario?.nu_telefono,
      input: {
        type: 'text',
        disabled: true,
        container_class: 'col-md-6'
      },
    }),

    //tx_correo
    new Attribute({
      name: 'tx_correo',
      label: 'Correo del funcionario',
      type: 'string',
      filtrable: false,
      listable: true,
      getter: (item: any) => item?.funcionario?.tx_correo,
      input: {
        type: 'text',
        disabled: true,
        container_class: 'col-md-6'
      },
    }),

    new Attribute({
      name: 'tag4',
      label: 'Razón de eliminación de la boleta',
      type: 'string',
      listable: false,
      filtrable: false,
      input: {
        type: 'hidden',
      },
    }),

    new Attribute({
      name: 'tx_razon_cancelado',
      label: 'Motivo de eliminación',
      type: 'string',
      filtrable: false,
      listable: false,
      input: {
        type: 'hidden',
        container_class: 'col-md-12',
      },
    }),

    new Attribute({
      name: 'tag5',
      label: 'Observaciones',
      type: 'string',
      listable: false,
      filtrable: false,
      input: {
        type: 'tag',
      },
    }),

    new Attribute({
      name: 'tx_observacion_solicitud',
      label: 'Observaciones de la boleta',
      type: 'string',
      filtrable: false,
      listable: false,
      input: {
        type: 'textarea',
        container_class: 'col-md-12',
      },
    }),

  ];

  public override boot() {
    this.canCreate = () => true;
    this.canUpdate = () => true;
    this.canRead = () => true;
    this.canDelete = () => true;
    this.canDownload = () => false;
  }
}
