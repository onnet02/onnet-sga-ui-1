import { Router } from '@angular/router';
import { Ticket } from "./../../../models/ticket";
import { TicketService } from "./../../../services/ticket.service";
import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { Navigation } from "selenium-webdriver";

@Component({
  selector: "app-ticket-menu-page",
  templateUrl: "./ticket-menu-page.component.html",
  styleUrls: ["./ticket-menu-page.component.scss"]
})
export class TicketMenuPageComponent implements OnInit {
  iconClass: string = "fas fa-plus";
  tickets: Ticket[];

  constructor(
    private ticketService: TicketService,
    private _nav: Router
    
    ) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.ticketService.indexTicketByUser().subscribe(resp => {
      this.tickets = resp;
    });
  }

  expandIcon() {
    if (this.iconClass == "fas fa-plus") {
      this.iconClass = "fas fa-minus";
    } else {
      this.iconClass = "fas fa-plus";
    }
  }

  goToChatPage(ticket: Ticket){
      this._nav.navigate(['/ticketChat' ,  {selectedTicket: ticket}]);
  }
}
