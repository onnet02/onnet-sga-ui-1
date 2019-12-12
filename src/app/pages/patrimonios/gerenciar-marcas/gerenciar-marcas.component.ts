import { MarcaService } from "./../../../services/marca.service";
import { MatSort } from "@angular/material";
import { MatPaginator } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Marca } from "./../../../models/Marca";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-gerenciar-marcas",
  templateUrl: "./gerenciar-marcas.component.html",
  styleUrls: ["./gerenciar-marcas.component.scss"]
})
export class GerenciarMarcasComponent implements OnInit {
  marcas: Marca[];
  marca: Marca = new Marca();
  marcaForm: FormGroup;

  displayedColumns: string[] = ["nome", "editar"];
  dataSource = new MatTableDataSource<Marca>(this.marcas);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private toast: ToastrManager
  ) {
    this.marcaForm = formBuilder.group({
      id: [""],
      nome: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.chargeData();
  }

  ngAfterViewInit() {
    this.dataSource.connect();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  chargeData() {
    this.marcaService.index().subscribe(
      suc => {
        this.dataSource.data = suc;
      },
      err => {}
    );
  }

  chargeForm(form: Marca) {
    this.marcaForm.patchValue({
      id: form.id,
      nome: form.nome
    });
  }

  save() {
    var result,
      marcaFormValue = this.marcaForm.value;

    if (marcaFormValue.id) {
      result = this.marcaService.update(marcaFormValue).subscribe(
        suc => {
          this.toast.successToastr("Marca editada com sucesso !", "Sucesso");
          this.chargeData();
          this.clearForm();
        },
        err => {
          this.toast.errorToastr("Ocorreu um erro", "Erro ");
        }
      );
    } else {
      result = this.marcaService.store(marcaFormValue).subscribe(
        suc => {
          this.toast.successToastr("Marca criada com sucesso !", "Sucesso ");
          this.chargeData();
          this.clearForm();
        },
        err => {
          this.toast.errorToastr("Ocorreu um erro !", "Erro");
        }
      );
    }
  }

  trash(element: Marca) {
    let response = confirm("Deseja mesmo excluir este registro ?");
    if (response) {
      this.marcaService.destroy(element).subscribe(
        suc => {
          this.toast.warningToastr(
            "Registro deletado com sucesso !",
            "Sucesso "
          );
          this.chargeData();
        },
        err => {
          this.toast.errorToastr("Ocorreu um erro", "Erro");
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
