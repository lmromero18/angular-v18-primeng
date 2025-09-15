import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styles: ``
})
export class ToastComponent {

  constructor(
    public messageService: MessageService
  ) { }

  getIcon(severity: string): string {
    switch (severity) {
      case 'success':
        return 'check_circle';
      case 'info':
        return 'info';
      case 'warn':
        return 'warning';
      case 'error':
        return 'cancel';
      default:
        return 'info';
    }
  }
}
