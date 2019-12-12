import { MatSort } from "@angular/material";
import { ViewChild } from "@angular/core";
import { ToastrManager } from "ng6-toastr-notifications";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MobileEmail } from "./../../../models/mobileEmail";
import { Component, OnInit } from "@angular/core";
import { MobileEmailService } from "src/app/services/mobileEmail.service";
import { MatTableDataSource, MatPaginator } from "@angular/material";

@Component({
  selector: "app-gerenciar-mobile-email",
  templateUrl: "./gerenciar-mobile-email.component.html",
  styleUrls: ["./gerenciar-mobile-email.component.scss"]
})
export class GerenciarMobileEmailComponent implements OnInit {
  mobileEmails: MobileEmail[];
  mobileEmail: MobileEmail = new MobileEmail();

  mobileEmailForm: FormGroup;

  displayedColumns: string[] = ["mobile_email", "senha", "editar", "deletar"];
  dataSource = new MatTableDataSource<MobileEmail>(this.mobileEmails);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private mobileEmailService: MobileEmailService,
    private toast: ToastrManager
  ) {
    this.mobileEmailForm = formBuilder.group({
      id: [""],
      mobil_email: ["" , Validators.required],
      senha: ["", Validators.required]
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
    this.mobileEmailService.index().subscribe(
      suc => {
        this.dataSource.data = suc;
      },
      err => {}
    );
  }

  loadInput(form: MobileEmail) {
    this.mobileEmailForm.patchValue({
      id: form.id,
      mobil_email: form.mobil_email,
      senha: form.senha
    });
  }

  save() {
    var result,
      mobileEmailValue = this.mobileEmailForm.value;

      mobileEmailValue.disponivel = true;

    if (mobileEmailValue.id) {
      result = this.mobileEmailService.update(mobileEmailValue).subscribe(
        suc => {
          this.toast.successToastr(
            "Email mobile editado com sucesso !",
            "Sucesso !"
          );
          this.initTable();
          this.clearForm();
        },
        err => {
          this.toast.errorToastr("Ocorreu um erro ao cadastrar", "Erro");
        }
      );
    } else {
      result = this.mobileEmailService.store(mobileEmailValue).subscribe(
        suc => {
          this.toast.successToastr(
            "Email mobile cadastrado com sucesso !",
            "Sucesso !"
          );
          this.initTable();
          this.clearForm();
        },
        err => {
          this.toast.errorToastr("Ocorreu um erro no cadastro", "Erro !");
        }
      );
    }
  }

  trash(element: MobileEmail) {
    let response = confirm("Deseja mesmo excluir este registro ? ");
    if (response) {
      this.mobileEmailService.destroy(element).subscribe(
        suc => {
          this.toast.warningToastr(
            "Registro deletado com sucesso !",
            "Alerta !"
          );
          this.initTable();
        },
        err => {
          this.toast.errorToastr("O registro possui vinculo", "Erro !");
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
