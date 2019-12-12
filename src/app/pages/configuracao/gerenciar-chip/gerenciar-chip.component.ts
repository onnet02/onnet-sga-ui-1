import { Situacao } from "./../../../models/Situacao";
import { Validators } from "@angular/forms";
import { ToastrManager } from "ng6-toastr-notifications";
import { ChipService } from "./../../../services/gerenciarChip.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Chip } from "./../../../models/chip";
import { Component, OnInit, ViewChild } from "@angular/core";
import { SituacaoService } from "src/app/services/situacao.service";

@Component({
  selector: "app-gerenciar-chip",
  templateUrl: "./gerenciar-chip.component.html",
  styleUrls: ["./gerenciar-chip.component.scss"]
})
export class GerenciarChipComponent implements OnInit {
  chips: Chip[];
  chip: Chip = new Chip();
  chipForm: FormGroup;

  situacoes: Situacao[];

  displayedColumns: string[] = [
    "numero_tel",
    "operadora",
    "em_uso",
    "saldo",
    "situacao",
    "editar",
    "deletar"
  ];
  dataSource = new MatTableDataSource<Chip>(this.chips);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    formBuilder: FormBuilder,
    private chipService: ChipService,
    private toastr: ToastrManager,
    private situacaoService: SituacaoService
  ) {
    this.chipForm = formBuilder.group({
      id: [""],
      operadora: ["", Validators.required],
      numero_tel: ["", Validators.required],
      em_uso: [""],
      saldo: ["", Validators.required],
      situation_id: [""]
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
    this.chipService.index().subscribe(
      suc => {
        this.dataSource.data = suc;
      },
      err => {}
    );

    this.situacaoService.index().subscribe(
      suc => {
        this.situacoes = suc;
      },
      err => {}
    );
  }

  loadInput(form: Chip) {
    this.chipForm.patchValue({
      id: form.id,
      operadora: form.operadora,
      numero_tel: form.numero_tel,
      em_uso: form.em_uso,
      saldo: form.saldo,
      situation_id: {
        id: form.situation_id.id
      }
    });
  }

  save() {
    var result,
      chipFormValue = this.chipForm.value;
      chipFormValue.em_uso = false;

    if (chipFormValue.id) {
      result = this.chipService.update(chipFormValue).subscribe(
        suc => {
          this.toastr.successToastr("Chip editado com sucesso !", "Sucesso !");
          this.initTable();
          this.clearForm();
        },
        err => {
          this.toastr.errorToastr("Ocorreu um erro !", "Erro !");
        }
      );
    } else {
      result = this.chipService.store(chipFormValue).subscribe(
        suc => {
          this.toastr.successToastr("Chip cadastrado com sucesso", "Sucesso !");
          this.initTable();
          this.clearForm();
        },
        err => {
          this.toastr.errorToastr("Ocorreu um erro ! ", "Erro !");
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

  trash(chip: Chip) {
    var response = confirm("Deseja realmente excluir este chip ?");
    if (response) {
      this.chipService.destroy(chip).subscribe(
        suc => {
          this.toastr.warningToastr(
            "Registro excluido com sucesso !",
            "Sucesso !"
          );
          this.initTable();
        },
        err => {
          this.toastr.errorToastr(
            "Ocorreu um erro ao tentar excluir o registro",
            "Erro"
          );
        }
      );
    } else {
      return;
    }
  }
}
