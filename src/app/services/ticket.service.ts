import { Ticket } from "./../models/ticket";
import { Observable } from "rxjs";
import { Globals } from "./../global-variable";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class TicketService {
  constructor(private http: HttpClient, private global: Globals) {}

  URI = this.global.BASE_URL + "ticket";

  index(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.URI);
  }

  indexTicketByUser(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.URI + `/find/allTicket`);
  }

  show(ticket: Ticket): Observable<Ticket> {
    return this.http.get<Ticket>(this.URI + `/${ticket.id}`);
  }

  store(ticket: Ticket) {
    return this.http.post(this.URI, ticket);
  }

  update(ticket: Ticket) {
    return this.http.put(this.URI + `/${ticket.id}`, ticket);
  }

  destroy(ticket: Ticket) {
    return this.http.delete(this.URI + `/${ticket.id}`);
  }
  
}
