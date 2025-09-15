import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';
import { map, Observable } from 'rxjs';
import { IMG } from '../../constants/resources';
import { AuthService } from '../../crud-maker/auth/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public menu$!: Observable<any>;
  public IMG = IMG;
  @Input() collapsed: Boolean = true;
  @Output() menuItemSelected = new EventEmitter<string>();

  constructor(
    public authService: AuthService,
    public router: Router,
    private store: Store<{ menu: MenuItem[] }>,
  ) {
    this.menu$ = this.store.select('menu');
  }

  isActive(item: MenuItem): boolean {
    // Comprueba si la ruta actual comienza con la ruta del menú
    if (this.router.url.startsWith(item.routerLink)) {
      return true;
    }

    if (item.items) {
      for (let subItem of item.items) {
        // Comprueba si la ruta actual es exactamente igual a la ruta del submenú
        if (this.router.isActive(subItem.routerLink, true)) {
          return true;
        }
      }
    }

    return false;
  }

  ngOnInit(): void {

    const roles = this.authService.getRols();
    if (roles) {
      this.menu$ = this.menu$.pipe(
        map((menuItems: MenuItem[]) => menuItems.map(item => {
          let itemCopy = { ...item };
          if (itemCopy.items) {
            itemCopy.items = itemCopy.items.filter((child: any) => this.authService.isPermissionAssigned(child?.permissions?.ver_listado));
          }
          itemCopy['absoluteFather'] = true;
          if (itemCopy.items && itemCopy.items.length == 0) {
            return null;
          }
          return itemCopy;
        }))
      ).pipe(map(items => items.filter(item => item != null)));
    }
  }

  onClickMenuItem(item: MenuItem): void {
    this.menuItemSelected.emit(item.label);
    localStorage.setItem('menuItemSelected', item.label);
  }

}


