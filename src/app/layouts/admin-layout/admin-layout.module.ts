import { MatListModule } from "@angular/material/list";
import { NgxMaskModule } from "ngx-mask";
import { SetorService } from "src/app/services/setor.service";
import { JwtInterceptor } from "./../../helpers/jwt.interceptor";
import { PatrimoniosModule } from "./../../pages/patrimonios/patrimonios.module";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClipboardModule } from "ngx-clipboard";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TicketsComponent } from "src/app/pages/tickets/tickets.component";
import { ConfiguracaoModule } from "src/app/pages/configuracao/configuracao.modele";
import { ColaboradorModule } from "src/app/pages/colaborador/colaborador.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from "@angular/material/table";
import { ErrorInterceptor } from "src/app/helpers/error.interceptor";
import { ToastrModule } from "ngx-toastr";
import { TicketService } from "src/app/services/ticket.service";
import {
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule
} from "@angular/material";
import { TicketChatPageComponent } from "src/app/pages/tickets/ticket-chat-page/ticket-chat-page.component";
import { TicketModule } from "src/app/pages/tickets/tickets.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    ConfiguracaoModule,
    PatrimoniosModule,
    ColaboradorModule,
    TicketModule,

    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    TicketService,
    SetorService
  ]
})
export class AdminLayoutModule {}
