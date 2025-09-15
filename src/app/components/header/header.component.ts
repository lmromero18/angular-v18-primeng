import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../crud-maker/auth/auth.service';
import { ActiveRecordService } from '../../crud-maker/model/active_record.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {
  @Input() model!: ActiveRecordService;
  @Input() hasHeader: boolean = true;
  @Input() toggler: Boolean;
  @Output() togglerEvent = new EventEmitter<Boolean>();
  @Input() menuItemSelected: string;
  public currentUser: any;
  public serviceName: string;
  public isLoading = false;

  constructor(
    public authService: AuthService,
    public confirmationService: ConfirmationService,
    public router: Router,
    public messageService: MessageService
  ) { }

  toggleSidebar(): void {
    this.toggler === false
      ? this.togglerEvent.emit((this.toggler = true))
      : this.togglerEvent.emit((this.toggler = false));
  }

  logout(): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de realizar el cierre de sesión?',
      header: 'Cerrar sesión',
      key: 'dialog',
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.isLoading = true;
        this.authService.logout().subscribe(() => {
          this.isLoading = false;
          this.router.navigate(['/Ingresar']).then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sesión cerrada',
              detail: 'La sesión ha sido cerrada correctamente'
            });
          });
        }, () => {
          this.isLoading = false;
        });
      },
    });
  }

  ngOnInit(): void {
    this.menuItemSelected = localStorage.getItem('menuItemSelected');
    this.currentUser = this.authService.getUser();
  }

}
