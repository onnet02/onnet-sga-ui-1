import { Routes } from "@angular/router";
import { ConfiguracaoComponent } from "./configuracao.component";
import { GerenciarCargoComponent } from "./gerenciar-cargo/gerenciar-cargo.component";
import { GerenciarEmpresaComponent } from "./gerenciar-empresa/gerenciar-empresa.component";
import { GerenciarSetorComponent } from "./gerenciar-setor/gerenciar-setor.component";
import { GerenciarMobileEmailComponent } from "./gerenciar-mobile-email/gerenciar-mobile-email.component";
import { GerenciarChipComponent } from "./gerenciar-chip/gerenciar-chip.component";
import { GerenciarSituacaoComponent } from "./gerenciar-situacao/gerenciar-situacao.component";
import { GerenciarTicketStatusComponent } from "./gerenciar-ticket-status/gerenciar-ticket-status.component";

export const ConfiguracaoRoutes: Routes = [
  { path: "configuracao", component: ConfiguracaoComponent },
  { path: "gerenciar-cargo", component: GerenciarCargoComponent },
  { path: "gerenciar-empresa", component: GerenciarEmpresaComponent },
  { path: "gerenciar-setor", component: GerenciarSetorComponent },
  { path: "gerenciar-mobile-email", component: GerenciarMobileEmailComponent },
  { path: "gerenciar-chip", component: GerenciarChipComponent },
  { path: "gerenciar-situacao", component: GerenciarSituacaoComponent },
  { path: "gerenciar-situacao", component: GerenciarSituacaoComponent },
  { path: "gerenciar-ticket-status", component: GerenciarTicketStatusComponent }

];
