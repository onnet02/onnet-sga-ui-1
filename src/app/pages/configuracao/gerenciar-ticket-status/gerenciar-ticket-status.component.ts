import { Validators } from "@angular/forms";
import { MatPaginator, MatSort } from "@angular/material";
import { MatTableDataSource } from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";
import { TicketStatus } from "./../../../models/ticketStatus";
import { Component, OnInit, ViewChild } from "@angular/core";
import { TicketStatusService } from "src/app/services/ticketStatus.service";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-gerenciar-ticket-status",
  templateUrl: "./gerenciar-ticket-status.component.html",
  styleUrls: ["./gerenciar-ticket-status.component.scss"]
})
export class GerenciarTicketStatusComponent implements OnInit {
  ticketsStatus: TicketStatus[];
  ticketStatus: TicketStatus = new TicketStatus();
  ticketStatusForm: FormGroup;
  public color1 : string = "#fff";

  displayedColumns: string[] = ["descricao", "cor", "editar", "deletar"];
  dataSource = new MatTableDataSource<TicketStatus>(this.ticketsStatus);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    formBuilder: FormBuilder,
    private ticketStatusService: TicketStatusService,
    private toast: ToastrManager
  ) {
    this.ticketStatusForm = formBuilder.group({
      id: [""],
      descricao: ["", Validators.required],
      cor: [""]
    });
  }

  ngOnInit() {
    this.initTable();
  }

  ngAfterViewInit() {
    this.dataSource.connect();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  initTable() {
    this.ticketStatusService.index().subscribe(
      suc => {
        this.dataSource.data = suc;
      },
      err => {}
    );
  }

  loadInput(form: TicketStatus) {
    this.ticketStatusForm.patchValue({
      id: form.id,
      descricao: form.descricao,
      cor: form.cor
    });
  }

  save() {
    var result,
      formValue = this.ticketStatusForm.value;
      if(formValue.cor == ""){
        formValue.cor = "#fff";
      } else {
        formValue.cor = this.color1;
      }

    if (formValue.id) {
      result = this.ticketStatusService.update(formValue).subscribe(
        suc => {
          this.toast.successToastr(
            "Status de ticket editado com sucesso !",
            "Sucesso !"
          );
          this.initTable();
          this.clearForm();
        },
        err => {
          this.toast.errorToastr("Ocorreu um erro !", "Erro !");
        }
      );
    } else {
      result = this.ticketStatusService.store(formValue).subscribe(
        suc => {
          this.toast.successToastr(
            "Status de ticket cadastrado com sucesso !",
            "Editado"
          );
          this.initTable();
          this.clearForm();
        },
        err => {
          this.toast.errorToastr("Ocorreu um erro !", "Erro ");
        }
      );
    }
  }

  trash(ticketStatus: TicketStatus) {
    var response = confirm("Deseja realmente excluir esta empresa ?");
    if (response) {
      this.ticketStatusService.destroy(ticketStatus).subscribe(
        suc => {
          this.toast.warningToastr("Registro excluido com sucesso ! "  , "Alerta");
          this.initTable();
        },
        err => {
          this.toast.errorToastr("Ocorreu um erro ao tentar excluir registro" , 'Erro');
        }
      );
    } else {
      return;
    }
  }

  clearForm() {
    var forms = document.getElementsByTagName("form");

    for (var i = 0; i < forms.length; i++) {
      forms[i].reset();
    }
  }
}
