import { Injectable } from '@angular/core';
import { ActiveRecordService } from '../../crud-maker/model/active_record.service';
import { Attribute } from '../../crud-maker/model/attribute';
import { Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class InicioModel extends ActiveRecordService {
    static override permissions = {
        create: '',
        read: '',
        update: '',
        delete: ''
    };

    public override name = 'Inicio';
    public override endpoint = 'login';
    public override primaryKey = 'username';

    public override attributes: Attribute[] = [

        new Attribute({
            name: 'ini_id_persona',
            label: 'Tipo',
            type: 'string',
            input: {
                type: 'hidden',
                container_class: 'col-span-6',
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
            },
        }),

        new Attribute({
            name: 'va_id_persona',
            label: 'Usuario',
            type: 'string',
            input: {
                type: 'hidden',
                max: 255,
                container_class: 'col-span-6',
            }
        }),

        //input id type
        new Attribute({
            name: 'va_full_id',
            label: 'Identificación',
            type: 'id',
            input: {
                container_class: 'col-span-6',
                validations: [Validators.required]
            }
        }),


        // new Attribute({
        //     name: 'va_id_persona',
        //     label: 'Usuario',
        //     type: 'string',
        //     input: {
        //         type: 'id',
        //         container_class: 'col-span-6',
        //         validations: [Validators.required]
        //     }
        // }),


        new Attribute({
            name: 'password',
            label: 'Contraseña',
            type: 'string',
            input: {
                type: 'password',
                container_class: 'col-span-6',
                setter: (value: string) => btoa(value),
                validations: [Validators.required]
            }
        }),
    ];

    public override save(after?: CallableFunction, err?: CallableFunction): void {
        this.getAttribute('ini_id_persona').value = this.getAttribute('va_full_id').input.value.charAt(0);
        this.getAttribute('va_id_persona').value = this.getAttribute('va_full_id').input.value.slice(1);
        super.save(after, err);
    }


    public override boot() {
        this.canCreate = () => true;
        this.canUpdate = () => true;
        this.canRead = () => false;
        this.canDelete = () => true;
    }
}
