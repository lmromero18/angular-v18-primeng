import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public isCollapsed: boolean = false;
  public toggler: boolean = true;
  public menuItemSelected: string;

  ngOnInit() {
    this.isCollapsed = window.innerWidth < 768;
  }

  public toggleSider(event: boolean) {
    if (this.isCollapsed == event) {
      this.isCollapsed = !event;
    }
    else {
      this.isCollapsed = event;
    }
  }

  getToggleSidebar($event: boolean) {
    this.toggler = $event;
  }

}
