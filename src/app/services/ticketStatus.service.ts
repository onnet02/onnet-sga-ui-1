import { TicketStatus } from './../models/ticketStatus';
import { Observable } from 'rxjs';
import { Globals } from './../global-variable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TicketStatusService {

    constructor(private http: HttpClient, private global: Globals) { }

    URI: string = this.global.BASE_URL + 'ticket_status';

    index(): Observable<TicketStatus[]>{
        return this.http.get<TicketStatus[]>(this.URI);
    }

    show(ticketStatus : TicketStatus): Observable<TicketStatus>{
        return this.http.get<TicketStatus>(this.URI + `/${ticketStatus.id}`)
    }

    store(ticketStatus: TicketStatus){
        return this.http.post(this.URI, ticketStatus);
    }

    update(ticketStatus: TicketStatus){
        return this.http.put(this.URI + `/${ticketStatus.id}`, ticketStatus);
    }

    destroy(ticketStatus: TicketStatus){
        return this.http.delete(this.URI + `/${ticketStatus.id}`);
    }
    
}