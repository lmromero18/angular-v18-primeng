import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './crud-maker/guard/auth.guard';
import { LayoutComponent } from './module/components';
import { DashboardComponent } from './module/pages';
import { IngresarComponent } from './pages/ingresar/ingresar.component';
import { InputsTemplatesComponent } from './pages/inputs-templates/inputs-templates.component';
import { TableTemplateComponent } from './pages/table-template/table-template.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/Ingresar' },
  {
    path: 'Ingresar',
    component: IngresarComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'Dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'InputsTemplate',
        component: InputsTemplatesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'TableTemplate',
        component: TableTemplateComponent,
        canActivate: [AuthGuard]
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
