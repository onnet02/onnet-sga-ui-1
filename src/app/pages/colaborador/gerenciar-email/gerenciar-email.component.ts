import { ToastrManager } from "ng6-toastr-notifications";
import { EmailService } from "src/app/services/email.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSort } from "@angular/material";
import { MatPaginator } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";
import { FormGroup } from "@angular/forms";
import { Email } from "./../../../models/email";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-gerenciar-email",
  templateUrl: "./gerenciar-email.component.html",
  styleUrls: ["./gerenciar-email.component.scss"]
})
export class GerenciarEmailComponent implements OnInit {
  emails: Email[];
  email: Email = new Email();
  emailForm: FormGroup;

  displeyedColumns: string[] = ["email", "em_uso", "editar"];
  dataSource = new MatTableDataSource<Email>(this.emails);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    formBuilder: FormBuilder,
    private emailService: EmailService,
    private toast: ToastrManager
  ) {
    this.emailForm = formBuilder.group({
      id: [""],
      endereco: ["", [Validators.required , Validators.email]],
      em_uso: []
    });
  }

  ngOnInit() {
    this.chargeDatas();
  }

  applyFilter(fitlerValue : string){
    this.dataSource.filter = fitlerValue.trim().toUpperCase();
  }

  ngAfterViewInit() {
    this.dataSource.connect();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async chargeDatas() {
    await this.emailService.index().subscribe(
      resp => {
        this.dataSource.data = resp;
      },
      err => {}
    );
  }

  chargeForm(form: Email) {
    this.emailForm.patchValue({
      id: form.id,
      endereco: form.endereco,
      em_uso: form.em_uso
    });
  }

  save() {
    var result,
      emailFormValue = this.emailForm.value;

      emailFormValue.em_uso = false;

    if (emailFormValue.id) {
      result = this.emailService.update(emailFormValue).subscribe(
        resp => {
          this.toast.successToastr("Email editado com sucesso !", "Sucesso !");
          this.chargeDatas();
          this.clearForm();
        },
        err => {
          this.toast.errorToastr("Ocorreu um erro !", "Error");
        }
      );
    } else {
      result = this.emailService.store(emailFormValue).subscribe(
        suc => {
          this.toast.successToastr(
            "Email cadastrado com sucesso !",
            "Sucesos !"
          );
          this.chargeDatas();
          this.clearForm();
        },
        err => {
          this.toast.errorToastr("Ocorreu um erro !", "Erro ");
        }
      );
    }
  }

  trash(email: Email) {
    var response = confirm("Deseja realmente excluir este email ? ");
    if (response) {
      this.emailService.destroy(email).subscribe(
        suc => {
          this.toast.warningToastr(
            "Registro excluido com sucesso !",
            "Alerta !"
          );
          this.chargeDatas();
        },
        err => {
          this.toast.errorToastr(
            "Ocorreu um erro ao tentar excluir registro",
            "Alerta"
          );
        }
      );
    }
  }

  clearForm() {
    var forms = document.getElementsByTagName("form");

    for (var i = 0; i < forms.length; i++) {
      forms[i].reset();
    }
  }
}
