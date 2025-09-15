import { Injectable } from '@angular/core';
import { ActiveRecordService } from '../../crud-maker/model/active_record.service';
import { Attribute } from '../../crud-maker/model/attribute';
import { Validators } from '@angular/forms';
import * as _ from 'lodash';
import { SelectOptionsData } from '../../crud-maker/model/input';

@Injectable({
    providedIn: 'root',
})
export class InputsTemplatesModel extends ActiveRecordService {
    static override permissions = {
        create: '',
        read: '',
        update: '',
        delete: ''
    };

    public override name = 'InputsTemplates';
    public override endpoint = '';
    public override primaryKey = '';

    public override attributes: Attribute[] = [
        new Attribute({
            name: '1',
            label: 'Input text',
            type: 'string',
            input: {
                type: 'text',
                container_class: 'col-span-6',
                info: 'Este es un input de texto basico',
            }
        }),

        new Attribute({
            name: '2',
            label: 'Input text con validators',
            type: 'string',
            input: {
                type: 'text',
                container_class: 'col-span-6',
                info: 'Este es un input de texto basico con validators',
                validations: [Validators.required, Validators.minLength(5), Validators.maxLength(10)]
            }
        }),

        new Attribute({
            name: '3',
            label: 'Input ID',
            type: 'id',
            input: {
                container_class: 'col-span-6',
                info: 'Este es un input id',
                validations: [Validators.required]
            }
        }),

        //password
        new Attribute({
            name: '5',
            label: 'Input password',
            type: 'string',
            input: {
                type: 'password',
                container_class: 'col-span-6',
                info: 'Este es un input password',
                validations: [Validators.required]
            }
        }),

        //select withou group
        new Attribute({
            name: '4',
            label: 'Input select',
            type: 'string',
            input: {
                type: 'select',
                container_class: 'col-span-6',
                info: 'Este es un input select',
                options: this.setSelectSource(
                    'nb_municipio',
                    'id_municipio',
                    (model: ActiveRecordService) => {
                        model.from('municipio').relations(['estado']).paginate(0)
                    },
                ),
                validations: [Validators.required]
            }
        }),

        new Attribute({
            name: '44',
            label: 'Input select disabled',
            type: 'string',
            input: {
                type: 'select',
                disabled: true,
                container_class: 'col-span-6',
                info: 'Este es un input select',
                options: this.setSelectSource(
                    'nb_municipio',
                    'id_municipio',
                    (model: ActiveRecordService) => {
                        model.from('municipio').relations(['estado']).paginate(0)
                    },
                ),
                validations: [Validators.required]
            }
        }),


        new Attribute({
            name: '444',
            label: 'Input select agrupado',
            type: 'string',
            input: {
                type: 'select',
                container_class: 'col-span-6',
                info: 'Este es un input select',
                options: this.setSelectSource(
                    'nb_municipio',
                    'id_municipio',
                    (model: ActiveRecordService) => {
                        model.from('municipio').relations(['estado']).paginate(0)
                    },
                    null,
                    this.groupByState
                ),
                validations: [Validators.required]
            }
        }),



        //multi select
        new Attribute({
            name: '6',
            label: 'Input multi select',
            type: 'string',
            input: {
                type: 'multi-select',
                container_class: 'col-span-6',
                info: 'Este es un input multi select',
                options: this.setSelectSource(
                    'nb_estado',
                    'id_estado',
                    (model: ActiveRecordService) => {
                        model.from('estado').paginate(0)
                    }
                ),
                validations: [Validators.required]
            }
        }),

        //multi select with group
        new Attribute({
            name: '7',
            label: 'Input multi select agrupado',
            type: 'string',
            input: {
                type: 'multi-select',
                container_class: 'col-span-6',
                info: 'Este es un input multi select',
                options: this.setSelectSource(
                    'nb_municipio',
                    'id_municipio',
                    (model: ActiveRecordService) => {
                        model.from('municipio').relations(['estado']).paginate(0)
                    },
                    null,
                    this.groupByState
                ),
                validations: [Validators.required]
            }
        }),

        new Attribute({
            name: '8',
            label: 'Input OTP',
            type: 'string',
            input: {
                type: 'otp',
                container_class: 'col-span-6',
                validations: [Validators.required]
            }
        }),

        new Attribute({
            name: '9',
            label: 'Input numeric decimal',
            type: 'string',
            input: {
                type: 'numeric',
                container_class: 'col-span-6',
                info: 'Este es un input numerico',
                validations: [Validators.required, Validators.min(3)],
            }
        }),

        new Attribute({
            name: '9',
            label: 'Input numeric integer',
            type: 'string',
            input: {
                type: 'numeric',
                container_class: 'col-span-6',
                info: 'Este es un input numerico',
                validations: [Validators.required, Validators.min(3)],
                integerOnly: true,
            }
        }),

        //prefix
        new Attribute({
            name: '10',
            label: 'Input numeric con prefijo',
            type: 'string',
            input: {
                type: 'numeric',
                container_class: 'col-span-6',
                info: 'Este es un input numerico con prefijo',
                validations: [Validators.required],
                prefix: '$',
            }
        }),

        //suffix
        new Attribute({
            name: '11',
            label: 'Input numeric con sufijo',
            type: 'string',
            input: {
                type: 'numeric',
                container_class: 'col-span-6',
                info: 'Este es un input numerico con sufijo',
                validations: [Validators.required],
                suffix: 'USD',
            }
        }),

        new Attribute({
            name: '13',
            label: 'Input text con keyfilter predefinidos',
            type: 'string',
            input: {
                type: 'text',
                container_class: 'col-span-6',
                info: 'Este es un input de texto basico con keyfilter predefinidos',
                keyFilter: 'alphanum'
            }
        }),

        new Attribute({
            name: '12',
            label: 'Input textarea',
            type: 'string',
            input: {
                type: 'textarea',
                info: 'Este es un input textarea',
                validations: [Validators.required],
                max: 100
            }
        }),

        //key filter con regex de no parentesis
        new Attribute({
            name: '14',
            label: 'Input text con keyfilter regex no parentesis',
            type: 'string',
            input: {
                type: 'text',
                container_class: 'col-span-6',
                info: 'Este es un input de texto basico con keyfilter regex no parentesis',
                keyFilter: /^[^()]*$/
            }
        }),

        //date
        new Attribute({
            name: '15',
            label: 'Input date',
            type: 'string',
            input: {
                type: 'calendar',
                container_class: 'col-span-6',
                info: 'Este es un input date',
                validations: [Validators.required],
                //fecha minima comienzo del mes actual
                minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                //fecha maxima hasta el 15 del mes actual
                maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
            }
        }),

        //date
        new Attribute({
            name: '15',
            label: 'Input date multiple',
            type: 'string',
            input: {
                type: 'calendar',
                container_class: 'col-span-6',
                info: 'Este es un input date multiple',
                validations: [Validators.required],
                dateSelectionMode: 'multiple'
            }
        }),

        new Attribute({
            name: '15',
            label: 'Input date rango',
            type: 'string',
            input: {
                type: 'calendar',
                container_class: 'col-span-6',
                info: 'Este es un input date rango',
                validations: [Validators.required],
                dateSelectionMode: 'range',
                numberOfMonths: 2
            }
        }),

        new Attribute({
            name: '15',
            label: 'Input date time',
            type: 'string',
            input: {
                type: 'calendar',
                container_class: 'col-span-6',
                info: 'Este es un input date time',
                validations: [Validators.required],
                calendarType: 'dateTime'
            }
        }),

        new Attribute({
            name: '15',
            label: 'Input time only',
            type: 'string',
            input: {
                type: 'calendar',
                container_class: 'col-span-6',
                info: 'Este es un input time only',
                validations: [Validators.required],
                calendarType: 'time'
            }
        }),

        new Attribute({
            name: '15',
            label: 'Input month only',
            type: 'string',
            input: {
                type: 'calendar',
                container_class: 'col-span-6',
                info: 'Este es un input month only',
                validations: [Validators.required],
                calendarType: 'month'
            }
        }),

        new Attribute({
            name: '15',
            label: 'Input year only',
            type: 'string',
            input: {
                type: 'calendar',
                container_class: 'col-span-6',
                info: 'Este es un input year only',
                validations: [Validators.required],
                calendarType: 'year'
            }
        }),

        new Attribute({
            name: '16',
            label: 'Input mask',
            type: 'string',
            input: {
                type: 'mask',
                container_class: 'col-span-6',
                info: 'Este es un input mask',
                mask: '(999)-999-9999',
                placeholder: '(999)-999-9999',
                validations: [Validators.required]
            }
        }),

    ];

    public groupByState(items: SelectOptionsData[]): SelectOptionsData[] {
        const grouped = _.groupBy(items, 'id_estado');
        return Object.keys(grouped).map(stateId => {
            const stateName = grouped[stateId][0].estado.nb_estado;
            return {
                name: stateName,
                value: stateId,
                items: grouped[stateId].map(city => ({
                    name: city.nb_municipio,
                    value: city.id_municipio
                }))
            };
        });
    }


    public override boot() {
        this.canCreate = () => true;
        this.canUpdate = () => true;
        this.canRead = () => false;
        this.canDelete = () => true;
    }
}
