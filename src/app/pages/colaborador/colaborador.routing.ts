import { Routes } from "@angular/router";
import { ColaboradorComponent } from "./colaborador.component";
import { GerenciarEmailComponent } from "./gerenciar-email/gerenciar-email.component";

export const ColaboradorRoutes: Routes = [
    {path : 'colaborador' , component: ColaboradorComponent},
    {path : 'gerenciar-email' , component: GerenciarEmailComponent}
]