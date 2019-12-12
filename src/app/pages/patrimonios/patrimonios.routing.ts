import { GerenciadorAlocaoMobileComponent } from './gerenciador-alocao-mobile/gerenciador-alocao-mobile.component';
import { Routes } from "@angular/router";
import { PatrimoniosComponent } from "./patrimonios.component";
import { GerenciarModeloComponent } from "./gerenciar-modelo/gerenciar-modelo.component";
import { GerenciarMarcasComponent } from "./gerenciar-marcas/gerenciar-marcas.component";
import { GerenciarCelularComponent } from "./gerenciar-celular/gerenciar-celular.component";
import { HistoricoCelularComponent } from "./historico-celular/historico-celular.component";
import { GerenciarEquipamentoComponent } from "./gerenciar-equipamento/gerenciar-equipamento.component";
import { AlocarEquipamentoPageComponent } from './alocar-equipamento-page/alocar-equipamento-page.component';
import { EquipamentoHistoricoPageComponent } from './alocar-equipamento-page/equipamento-historico-page/equipamento-historico-page.component';

export const PatrimoniosRoutes: Routes = [
  { path: "patrimonio", component: PatrimoniosComponent },
  { path: "gerenciar-modelos", component: GerenciarModeloComponent },
  { path: "gerenciar-marcas", component: GerenciarMarcasComponent },
  { path: "gerenciar-celular", component: GerenciarCelularComponent },
  { path: "mobile-manager", component: GerenciadorAlocaoMobileComponent },
  { path: "historico-de-uso", component: HistoricoCelularComponent },
  { path: "gerenciar-equipamento", component: GerenciarEquipamentoComponent},
  { path: 'gerenciar-alocacao-equipamento', component: AlocarEquipamentoPageComponent},
  { path: 'historico-equipamento' , component: EquipamentoHistoricoPageComponent}
];
