import { MatSort, MatPaginator } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";
import { Setor } from "./../../models/setor";
import { SetorService } from "src/app/services/setor.service";
import { ToastrManager } from "ng6-toastr-notifications";
import { TicketService } from "./../../services/ticket.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Ticket } from "./../../models/ticket";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: "app-tickets",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.scss"]
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[];
  setores: Setor[];
  ticket: Ticket = new Ticket();
  ticketForm: FormGroup;

  myTickets: Ticket[];

  displayedColumns: string[] = [
    "id",
    "assunto",
    "descricao",
    "ticket_status",
    "setor",
    "atendente",
    "acao"
  ];

  dataSource = new MatTableDataSource<Ticket>(this.tickets);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private ticketService: TicketService,
    private toast: ToastrManager,
    formBuilder: FormBuilder,
    private setorService: SetorService,
    private _nav : Router
  ) {
    this.ticketForm = formBuilder.group({
      id: [""],
      resolvido: [""],
      descricao: ["", Validators.required],
      ticket_status_id: [""],
      user_id: [""],
      setor_id: [""],
      assunto: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.chargeDatas();
  }

  ngAfterViewInit() {
    this.dataSource.connect();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async createNewTicket() {
    var result,
      ticketFormValue = this.ticketForm.value;

    ticketFormValue.ticket_status_id = 1;

    result = this.ticketService.store(ticketFormValue).subscribe(
      suc => {
        this.toast.successToastr("Ticket aberto com sucesso ", "Sucesso !");
        this.chargeDatas();
      },
      err => {
        this.toast.errorToastr("Erro ao abrir ticket", "Erro");
      }
    );
  }

  async chargeDatas() {
    await this.setorService.index().subscribe(
      suc => {
        this.setores = suc;
      },
      err => {}
    );
    await this.ticketService.indexTicketByUser().subscribe(resp => {
      this.myTickets = resp;
    });
  }

  async clearForm() {
    var forms = document.getElementsByTagName("form");

    for (let i = 0; forms.length; i++) {
      forms[i].reset();
    }
  }

  ngOnDestroy(){
    
  }

  
}
