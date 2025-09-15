import { createReducer, on } from '@ngrx/store';
import { MenuItem } from 'primeng/api';

export const initialState: MenuItem[] = [
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        tooltip: 'Dashboard',
        routerLink: '/Dashboard'
    },
    {
        label: 'Boletas',
        icon: 'pi pi-shield',
        tooltip: 'Boletas',
        routerLink: '/Boletas'
    },
    {
        label: 'Inputs Template',
        icon: 'pi pi-th-large',
        tooltip: 'Inputs Template',
        routerLink: '/InputsTemplate'
    },
    {
        label: 'Table Template',
        icon: 'pi pi-table',
        tooltip: 'Table Template',
        routerLink: '/TableTemplate'
    },
];

export const MenuReducer = createReducer(initialState);

// Menu with material iconss
// import { createReducer, on } from '@ngrx/store';
// import { MenuItem } from 'primeng/api';

// export const initialState: MenuItem[] = [
//     {
//         label: 'Dashboard',
//         icon: 'space_dashboard',
//         tooltip: 'Dashboard',
//         routerLink: '/Dashboard'
//     },
//     {
//         label: 'Boletas',
//         icon: 'shield',
//         tooltip: 'Boletas',
//         routerLink: '/Boletas'
//     }
// ];

// export const MenuReducer = createReducer(initialState);
