import { Modelo } from './../../../models/Modelo';
import { Validators } from "@angular/forms";
import { EquipamentoService } from "./../../../services/equipamento.service";
import { FormBuilder } from "@angular/forms";
import { ToastrManager } from "ng6-toastr-notifications";
import { MatSort } from "@angular/material";
import { MatPaginator } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";
import { Equipamentos } from "./../../../models/equipamentos";
import { FormGroup } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ModeloService } from "src/app/services/modelo.service";
import * as $ from 'jquery';

@Component({
  selector: "app-gerenciar-equipamento",
  templateUrl: "./gerenciar-equipamento.component.html",
  styleUrls: ["./gerenciar-equipamento.component.scss"]
})
export class GerenciarEquipamentoComponent implements OnInit {
  equipamentos: Equipamentos[];
  equipamento: Equipamentos = new Equipamentos();
  equipamentoForm: FormGroup;
  modelos: Modelo[];

  displayedColumns: string[] = [
    "nome",
    "modelo",
    "data_aquisicao",
    "alocado",
    "configurado"
  ];

  
  constructor(
    formBuilder: FormBuilder,
    private toast: ToastrManager,
    private equipamentoService: EquipamentoService,
    private modeloService: ModeloService
  ) {
    this.equipamentoForm = formBuilder.group({
      id: [""],
      nome: ["", Validators.required],
      modelo_id: ["", Validators.required],
      data_aquisicao: ["", Validators.required],
      alocado: ["", Validators.required],
      configuracao: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.chargeDatas();
  }

  applyFilter(filterValue: string){
    let filter = filterValue.toLowerCase();

    $("#tableEquipament #tableEquipamentTr").filter(function() {
      $(this).toggle(
        $(this).text().toLowerCase().indexOf(filter) > -1
      )
    })
  }



  chargeDatas() {
    this.equipamentoService.index().subscribe(
      resp => {
        this.equipamentos = resp;
      },
      err => {}
    );

    this.modeloService.indexOnlyEquipaments().subscribe(
      resp => {
        this.modelos = resp;
      },
      err => {}
    )    
  }

  chargeForm(form: Equipamentos) {
    this.equipamentoForm.patchValue({
      id: form.id,
      nome: form.nome,
      modelo_id: form.modelo_id,
      data_aquisicao: form.data_aquisicao,
      alocado: form.alocado,
      configuracao: form.configuracao
    });
  }

  save() {
    var result,
      formValue = this.equipamentoForm.value;

      console.log(formValue)

    if (formValue.id) {
      result = this.equipamentoService.update(formValue).subscribe(
        resp => {
          this.toast.successToastr(
            "Equipamentos editado com sucesso !",
            "Sucesso !"
          );
          this.chargeDatas();
          this.clearForm();
        },
        err => {
          this.toast.errorToastr("Ocorreu um erro", "Erro");
        }
      );
    } else {
      result = this.equipamentoService.store(formValue).subscribe(
        resp => {
          this.toast.successToastr(
            "Equipamentos cadastrado com sucesso !",
            "Sucesso !"
          );
          this.chargeDatas();
          this.clearForm();
        },
        err => {
          this.toast.errorToastr("Ocorreu um erro !", "Erro");
        }
      );
    }
  }

  trash(element: Equipamentos) {
    let response = confirm("Deseja mesmo excluir este registro ?");

    if (response) {
      this.equipamentoService.destroy(element).subscribe(
        resp => {
          this.toast.warningToastr(
            "Registro deletado com sucesso !",
            "Sucesso !"
          );
          this.chargeDatas();
        },
        err => {
          this.toast.errorToastr(
            "O registro possui vinculo com outros registros",
            "Erro"
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
