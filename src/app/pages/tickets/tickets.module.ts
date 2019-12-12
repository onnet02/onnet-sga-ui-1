import { TicketStatusService } from "src/app/services/ticketStatus.service";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TicketRoutes } from "./tickets.routes";
import { TicketsComponent } from "src/app/pages/tickets/tickets.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TicketChatPageComponent } from "./ticket-chat-page/ticket-chat-page.component";
import { TicketService } from "src/app/services/ticket.service";
import { TicketMenuPageComponent } from "./ticket-menu-page/ticket-menu-page.component";
import { MaterialModule } from "src/app/angularMaterial/angular-material.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TicketRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [],
  declarations: [TicketsComponent, TicketChatPageComponent, TicketMenuPageComponent],
  providers: [TicketService, TicketStatusService]
})
export class TicketModule {}
