import { MarcaService } from './../../../services/marca.service';
import { Marca } from './../../../models/Marca';
import { ModeloService } from "./../../../services/modelo.service";
import { ToastrManager } from "ng6-toastr-notifications";
import { CelularService } from "./../../../services/celular.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSort } from "@angular/material";
import { MatPaginator } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";
import { Situacao } from "./../../../models/Situacao";
import { Modelo } from "./../../../models/Modelo";
import { Colaborador } from "src/app/models/colaborador";
import { FormGroup } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Celular } from "src/app/models/celular";
import { SituacaoService } from "src/app/services/situacao.service";

@Component({
  selector: "app-gerenciar-celular",
  templateUrl: "./gerenciar-celular.component.html",
  styleUrls: ["./gerenciar-celular.component.scss"]
})
export class GerenciarCelularComponent implements OnInit {
  celulares: Celular[];
  celular: Celular = new Celular();
  celularForm: FormGroup;
  

  modelos: Modelo[];
  situacoes: Situacao[];
  marcas: Marca[];

  displayedColumns: string[] = [
    "imei",
    "imei2",
    "serial",
    "modelo",
    "sub_modelo",
    "cor",
    "alocado",
    "estragado",
    "editar"
  ];
  dataSource = new MatTableDataSource<Celular>(this.celulares);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    formBuilder: FormBuilder,
    private celularService: CelularService,
    private situacaoService: SituacaoService,
    private toast: ToastrManager,
    private modeloService: ModeloService,
    private marcaService: MarcaService
  ) {
    this.celularForm = formBuilder.group({
      id: [""],
      imei: ["", Validators.required],
      imei02: ["", Validators.required],
      serial: ["", Validators.required],
      sub_modelo: ["", Validators.required],
      versao_so: ["", Validators.required],
      cor: ["", Validators.required],
      alocado: [""],
      observacao: [""],
      estragado: [""],
      data_aquisicao: ["", Validators.required],
      motivo_danificado: [""],
      situation_id: [""],
      modelo_id: [""],
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  chargeDatas() {
    this.celularService.index().subscribe(
      resp => {
        this.dataSource.data = resp;
      },
      err => {}
    );

    this.situacaoService.index().subscribe(
      resp => {
        this.situacoes = resp;
      },
      err => {}
    );

    this.marcaService.index().subscribe(
      resp => {
        this.marcas = resp;
      },
      err => {}
    )
  }

  filtrarModelo(element){
    this.modeloService.indexByMarca(element).subscribe(
      resp => { this.modelos = resp},
      err => { this.toast.infoToastr('Não há nenhum modelo para essa marca')}
    )
  }

  chargeForm(form: Celular) {
    this.celularForm.patchValue({
      id: form.id,
      imei: form.imei,
      imei2: form.imei02,
      serial: form.serial,
      sub_modelo: form.sub_modelo,
      versao_so: form.versao_so,
      cor: form.cor,
      alocado: form.alocado,
      observacao: form.observacao,
      estragado: form.estragado,
      data_aquisicao: form.data_aquisicao,
      motivo_danificado: form.motivo_danificado,
      situacao_id: form.situation_id,
      modelo_id: form.modelo_id.id
    });
  }

  save() {
    var result,
      celularFormValue = this.celularForm.value;
      

    if (celularFormValue.id) {
      result = this.celularService.update(celularFormValue).subscribe(
        suc => {
          this.toast.successToastr("Celular editado com sucesso !", "Sucesso ");
          this.chargeDatas();
          this.clearForm();
        },
        err => {
          this.toast.errorToastr("Ocorreu um erro ", "Erro");
        }
      );
    } else {
      result = this.celularService.store(celularFormValue).subscribe(
        suc => {
          this.toast.successToastr(
            "Celular Cadastrado com sucesso !",
            "Sucesso !"
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

  trash(element: Celular) {
    let response = confirm("Deseja mesmo excluir este registro ?");
    if (response) {
      this.celularService.destroy(element).subscribe(
        suc => {
          this.toast.warningToastr(
            "Registro deletado com sucesso !",
            "Sucesso "
          );
          this.chargeDatas();
        },
        err => {
          this.toast.errorToastr(
            "O registro possui vinculo com outros",
            "Erro "
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
