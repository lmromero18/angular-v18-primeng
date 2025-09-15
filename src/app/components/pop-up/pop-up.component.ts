import { Component, Input, ViewChild } from '@angular/core';
import { Confirmation } from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styles: ``
})
export class PopUpComponent {
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  acceptPopUp() {
    this.confirmPopup.accept();
  }

  rejectPopUp() {
    this.confirmPopup.reject();
  }
}
