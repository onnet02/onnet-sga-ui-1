import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TicketsComponent } from 'src/app/pages/tickets/tickets.component';
import { ConfiguracaoComponent } from 'src/app/pages/configuracao/configuracao.component';
import { PatrimoniosComponent } from 'src/app/pages/patrimonios/patrimonios.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'tickets',        component: TicketsComponent},
    { path: 'configuracao',   component: ConfiguracaoComponent},
    { path: 'patrimonio',     component: PatrimoniosComponent}
];
