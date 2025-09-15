import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {


  public items: MenuItem[] = this.route?.snapshot?.url?.filter(item => isNaN(Number(item.path))).map(item => {
    return {
      label: item.path,
      command: () => {
        this.router.navigate([item.path]);
      }
    };
  });

  public home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  constructor(
    public router: Router,
    public route: ActivatedRoute
  ) { }

}