import { MatTableDataSource } from "@angular/material/table";
import { CargoService } from "./../../../services/cargo.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Cargo } from "./../../../models/cargo";
import { Component, OnInit, ViewChild } from "@angular/core";
import * as $ from "jquery";
import { MatPaginator, MatSort } from "@angular/material";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-gerenciar-cargo",
  templateUrl: "./gerenciar-cargo.component.html",
  styleUrls: ["./gerenciar-cargo.component.scss"]
})
export class GerenciarCargoComponent implements OnInit {
  cargos: Cargo[];
  cargo: Cargo = new Cargo();
  cargoForm: FormGroup;

  displayedColumns: string[] = ["nome", "descricao", "editar", "deletar"];
  dataSource = new MatTableDataSource<Cargo>(this.cargos);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tituloModal: string = "Cadastrar novo cargo";
  isOpened: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private cargoService: CargoService,
    private toastr: ToastrManager
  ) {
    this.cargoForm = formBuilder.group({
      id: [""],
      nome: ["", Validators.required],
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
    this.cargoService.index().subscribe(
      suc => {
        this.dataSource.data = suc;
      },
      err => {}
    );
  }

  loadInput(form: Cargo) {
    this.cargoForm.patchValue({
      id: form.id,
      nome: form.nome,
      descricao: form.descricao
    });
  }

  save() {
    var result,
      cargoValue = this.cargoForm.value;

    console.log(cargoValue);

    if (cargoValue.id) {
      result = this.cargoService.update(cargoValue).subscribe(
        suc => {
          this.toastr.successToastr(
            "Cargo editado com sucesso !",
            " Sucesso ! "
          );
          this.initTable();
          this.clearForm();
        },
        err => {
          this.toastr.errorToastr("Ocorreu um erro", "Erro !");
        }
      );
    } else {
      result = this.cargoService.store(cargoValue).subscribe(
        suc => {
          this.toastr.successToastr("Cargo crido com sucesso !", " Sucesso ! ");

          this.initTable();
          this.clearForm();
        },
        err => {
          this.toastr.errorToastr("Ocorreu um erro", "Erro");
        }
      );
    }
  }

  trash(element: Cargo) {
    let response = confirm("Deseja mesmo excluir este registro ?");
    if (response) {
      this.cargoService.destroy(element).subscribe(
        suc => {
          this.toastr.warningToastr('Registro deletado com sucesso !' ,'Alerta');
          this.initTable();
          
        },
        err => {
          this.toastr.errorToastr('O registro possui vinculo com outros registro', 'Erro')
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
