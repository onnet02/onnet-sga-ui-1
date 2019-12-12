import { ColaboradorCelular } from 'src/app/models/ColaboradorCelular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Component, OnInit } from '@angular/core';
import { ColabCelularService } from 'src/app/services/colaboradorCelular.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-historico-celular',
  templateUrl: './historico-celular.component.html',
  styleUrls: ['./historico-celular.component.scss']
})
export class HistoricoCelularComponent implements OnInit {

  colabCelulares: ColaboradorCelular[];

  constructor(
    private toast: ToastrManager,
    private colabCelularService: ColabCelularService,

  ) { }

  ngOnInit() {

    this.colabCelularService.indexAllReturnedPhones().subscribe(
      resp => {this.colabCelulares = resp},
      err => {}
    )

  }

  filterTable(filterValue : string){
    let filter = filterValue.toLowerCase();

    $("#historicTable #contentTr").filter(function () {
      $(this).toggle(
        $(this).text().toLowerCase().indexOf(filter) > -1
      );
    });
  }

}
