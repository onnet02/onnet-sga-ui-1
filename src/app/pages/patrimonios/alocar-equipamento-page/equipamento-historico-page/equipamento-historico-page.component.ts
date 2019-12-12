import { ColabEquipamentoService } from "./../../../../services/colaboradorEquipamento.service";
import { Component, OnInit } from "@angular/core";
import { EquipamentoColaborador } from "src/app/models/equipamentoColaborador";
import * as $ from 'jquery';

@Component({
  selector: "app-equipamento-historico-page",
  templateUrl: "./equipamento-historico-page.component.html",
  styleUrls: ["./equipamento-historico-page.component.scss"]
})
export class EquipamentoHistoricoPageComponent implements OnInit {
  equipamentHistoric: EquipamentoColaborador[];

  constructor(private colabEquipamentService: ColabEquipamentoService) {}

  ngOnInit() {
    this.chargeTable();
  }

  chargeTable(){
    this.colabEquipamentService.index().subscribe(
      resp => {
        this.equipamentHistoric = resp;
      });
  }

  filterEquipamentTable(filterValue : string){
    let filter = filterValue.toLowerCase();

    $("#historicTable #contentTr").filter(function () {
      $(this).toggle(
        $(this)
        .text()
        .toLowerCase()
        .indexOf(filter) > -1
      );
    });
  }


}
