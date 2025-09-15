import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../crud-maker/auth/auth.service';
import { ControllerComponent } from '../../crud-maker/controller.component';
import { ActiveRecordService } from '../../crud-maker/model/active_record.service';
import { FormInput } from '../../crud-maker/model/input';
import { InicioModel as Model } from './ingresar.service';
import { IMG } from '../../constants/resources';
// import { RestablecerContrasenaComponent } from '../restablecer-contrasena/restablecer-contrasena.component';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
})

export class IngresarComponent extends ControllerComponent {
  public override modelClass: typeof ActiveRecordService = Model;
  public inputTypeAccount!: FormInput;
  public IMG = IMG;

  constructor(
    injector: Injector,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    super(injector);
  }


  override ngOnInit(): void {
  }

  public onSubmit(): void {
    this.model.save(
      (res: any) => {
        if (res.access_token) {
          this.authService.guardarPayload(res);
          this.router.navigate(['/Dashboard']).then(() => {
            this.messageService.add({ severity: 'success', summary: 'Bienvenido', detail: 'Ingreso exitoso', closable: false });
          });
        }
        else if (res.success && res.message) {
          this.messageService.add({ severity: 'warning', summary: 'Alerta', detail: res.message, closable: false });
        }
      }
    );

  }
  // public restablecer() {
  //   const ref = this.dialogService.open(RestablecerContrasenaComponent, {
  //     header: 'Restablecer contraseña',
  //     width: '70%'
  //   });
  // }
}

