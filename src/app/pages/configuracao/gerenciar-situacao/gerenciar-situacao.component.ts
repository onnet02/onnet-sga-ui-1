import { ToastrManager } from "ng6-toastr-notifications";
import { MatSort } from "@angular/material";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Situacao } from "./../../../models/Situacao";
import { Component, OnInit, ViewChild } from "@angular/core";
import { SituacaoService } from "src/app/services/situacao.service";

@Component({
  selector: "app-gerenciar-situacao",
  templateUrl: "./gerenciar-situacao.component.html",
  styleUrls: ["./gerenciar-situacao.component.scss"]
})
export class GerenciarSituacaoComponent implements OnInit {
  situacoes: Situacao[];
  situacao: Situacao = new Situacao();
  situacaoForm: FormGroup;

  displayedColumns: string[] = ["descricao", "editar", "deletar"];
  dataSource = new MatTableDataSource<Situacao>(this.situacoes);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    formBuilder: FormBuilder,
    private toastr: ToastrManager,
    private situacaoService: SituacaoService
  ) {
    this.situacaoForm = formBuilder.group({
      id: [""],
      descricao: ["", Validators.required]
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
    this.situacaoService.index().subscribe(
      suc => {
        this.dataSource.data = suc;
      },
      err => {}
    );
  }

  loadInput(form: Situacao) {
    this.situacaoForm.patchValue({
      id: form.id,
      descricao: form.descricao
    });
  }

  save() {
    var result,
      situacaoValue = this.situacaoForm.value;

    if (situacaoValue.id) {
      result = this.situacaoService.update(situacaoValue).subscribe(
        suc => {
          this.toastr.successToastr('Situacao editada com sucesso !' , 'Sucesso !');
          this.initTable();
          this.clearForm();
        }, 
        err => {
          this.toastr.errorToastr('Ocorreu um erro !' , 'Erro !');
        });
    } else {
      result = this.situacaoService.store(situacaoValue).subscribe(
        suc => {
          this.toastr.successToastr('Situacao cadastrada com sucesso !' , 'Sucesso !');
          this.initTable();
          this.clearForm();
        },
        err => {
          this.toastr.errorToastr('Ocorreu um erro !' , 'Erro !');
        }
      )
    }
  }

  clearForm() {
    var forms = document.getElementsByTagName("form");

    for (var i = 0; i < forms.length; i++) {
      forms[i].reset();
    }
  }

  trash(empresa) {
    var response = confirm("Deseja realmente excluir esta empresa ?");
    if (response) {
      this.situacaoService.destroy(empresa).subscribe(
        suc => {
          this.toastr.warningToastr(
            "Registro excluido com sucesso ! ",
            "Alerta"
          );
          this.initTable();
        },
        err => {
          this.toastr.errorToastr(
            "Ocorreu um erro ao tentar excluir registro",
            "Erro"
          );
        }
      );
    } else {
      return;
    }
  }
}
