import { TicketsComponent } from 'src/app/pages/tickets/tickets.component';
import { Routes } from "@angular/router";
import { TicketChatPageComponent } from './ticket-chat-page/ticket-chat-page.component';
import { TicketMenuPageComponent } from './ticket-menu-page/ticket-menu-page.component';


export const TicketRoutes: Routes = [
    { path: "tickets", component: TicketsComponent},
    { path: "ticketChat", component: TicketChatPageComponent},
    { path: "ticketMenu", component: TicketMenuPageComponent}
]