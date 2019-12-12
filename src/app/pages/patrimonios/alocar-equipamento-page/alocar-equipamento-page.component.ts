import { HttpClient } from '@angular/common/http';
import { Equipamentos } from "./../../../models/equipamentos";
import { EquipamentoService } from "./../../../services/equipamento.service";
import { Validators } from "@angular/forms";
import { EquipamentoColaborador } from "./../../../models/equipamentoColaborador";
import { FormBuilder } from "@angular/forms";
import { ToastrManager } from "ng6-toastr-notifications";
import { EmpresaService } from "./../../../services/empresa.service";
import { ColaboradorService } from "src/app/services/colaborador.service";
import { FormGroup } from "@angular/forms";
import { Colaborador } from "./../../../models/colaborador";
import { Empresa } from "./../../../models/empresa";
import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { ColabEquipamentoService } from "src/app/services/colaboradorEquipamento.service";

@Component({
  selector: "app-alocar-equipamento-page",
  templateUrl: "./alocar-equipamento-page.component.html",
  styleUrls: ["./alocar-equipamento-page.component.scss"]
})
export class AlocarEquipamentoPageComponent implements OnInit {
  empresas: Empresa[];
  colaboradores: Colaborador[];
  equipamentos: Array<Equipamentos> = [];
  equipamentoForm: FormGroup;
  equipamentosSelecionados: Array<EquipamentoColaborador> = [];
  equipamentoColaborador: EquipamentoColaborador = new EquipamentoColaborador();
  colaboradorComodatos: EquipamentoColaborador[];

  selectedRow: Number;
  setClickedRow: Function;
  termo_assinadoBox: boolean = false;

  // Variavel view
  nomeColaborador: string = "";
  dataComodato: Date;
  dataDevolucao: Date;
  colaboradorAtual;
  // ------

  isComodato = true;
  isDevolucao = false;
  isEditable = true;

  countEquipamentInUSe: number;
  countEquipamentAvaiable: number;


  constructor(
    private colaboradorService: ColaboradorService,
    private empresaService: EmpresaService,
    private toast: ToastrManager,
    private equipamentoService: EquipamentoService,
    formBuilder: FormBuilder,
    private colabEquipamentoService: ColabEquipamentoService,
    private _http: HttpClient
  ) {
    this.equipamentoForm = formBuilder.group({
      id: [""],
      data_comodato: ["", Validators.required],
      data_devolucao: [""],
      observacao: [""],
      termo_assinado: [""],
      colaborador_id: ["", Validators.required],
      equipament_id: ["", Validators.required]
    });

    this.setClickedRow = function(index) {
      this.selectedRow = index;
    };
  }

  ngOnInit() {
    this.chargeDatas();
  }

  filterColaboradorTable(filterValue: string){
    let filter = filterValue.toLowerCase();

    $("#colaboradoresTable #contentTr").filter(function (){
      $(this).toggle(
        $(this).text().toLowerCase().indexOf(filter) > -1
      )
    });
  }

  filterByCity(empresa){

    if(!empresa){
      this.colaboradorService.index().subscribe(
        resp => {
          this.colaboradores = resp;
        });
    }

    this.colaboradorService.indexByCity(empresa).subscribe(
      resp => {
        this.colaboradores = resp;
      });
  }

  chargeDatas() {
    this.empresaService.index().subscribe(resp => (this.empresas = resp));

    this.equipamentoService
      .indexAvaiableEquipament()
      .subscribe(resp => {
        this.equipamentos = resp;
        this.countEquipamentAvaiable = resp.length;
      });

    this.equipamentoService.indexEquipamentInUse().subscribe(resp => {
      this.countEquipamentInUSe = resp.length;
    })

    this.colaboradorService
      .index()
      .subscribe(resp => (this.colaboradores = resp));

      this.equipamentosSelecionados = [];
  }

  isChecked() {
    this.termo_assinadoBox = !this.termo_assinadoBox;
    this.equipamentoForm.patchValue({
      termo_assinado: this.termo_assinadoBox
    });

    this.equipamentosSelecionados.forEach(element => {
      element.termo_assinado = this.termo_assinadoBox;
    });

    console.log(this.equipamentosSelecionados);
  }

  openDrop() {
    document.getElementById("equipamentDropdown").classList.toggle("show");
  }

  saveObservacao(equipamento: EquipamentoColaborador, index, value) {
    this.equipamentosSelecionados[index].observacao = value;
  }

  getColaborador(colaborador: Colaborador) {
    this.equipamentoForm.patchValue({
      colaborador_id: colaborador.id
    });

    this.nomeColaborador = colaborador.nome;
    this.colaboradorAtual = colaborador.id;


    this.colabEquipamentoService.indexAllComodato(colaborador.id).subscribe(
      resp => {
        this.colaboradorComodatos = resp;
      }
    )
  }

  devolucaoEquipamento(colaboradorEquipament: EquipamentoColaborador){
    console.log(this.dataDevolucao)

    if(this.dataDevolucao == null || this.dataDevolucao == undefined){
      this.toast.warningToastr("Por favor inserir a data de devolução" , "Aviso");
      return;
    }

    colaboradorEquipament.data_devolucao = this.dataDevolucao;

    this.colabEquipamentoService.devolucaoEquipament(colaboradorEquipament).subscribe(
      resp => {
        this.toast.successToastr("Item devolvido com sucesso !" , "Sucesso !");
        this.chargeDatas();
        this.colabEquipamentoService.indexAllComodato(this.colaboradorAtual).subscribe(
          resp => { this.colaboradorComodatos = resp }
        )
      }
    )



  }

  addEquipamentOnList(equipament, index) {
    let date = this.equipamentoForm.value.data_comodato;
    let colaborador = this.equipamentoForm.value.colaborador_id;

    this.dataComodato = date;

    if (date == null || date == "") {
      this.toast.warningToastr(
        "Por favor inclua uma data de comodato !",
        "Aviso"
      );
      return;
    }

    this.equipamentoForm.patchValue({
      equipament_id: equipament.id
    });

    let newcomodato = new EquipamentoColaborador();
    newcomodato.data_comodato = date;
    newcomodato.equipament_id = equipament;
    newcomodato.colaborador_id = colaborador;
    newcomodato.termo_assinado = false;
    newcomodato.observacao = "";

    console.log(newcomodato);

    this.equipamentos.splice(index, 1);

    this.equipamentosSelecionados.push(newcomodato);

    console.log(this.equipamentosSelecionados);
  }

  changeToModalComodato() {
    this.isDevolucao = false;
    this.isComodato = true;
  }

  changeToModalDevolucao() {
    this.isDevolucao = true;
    this.isComodato = false;
    this.colabEquipamentoService.indexAllComodato(this.colaboradorAtual).subscribe(
      resp => {
        this.colaboradorComodatos = resp;
      }
    )
  }

  removerItem(equipament, index) {
    this.equipamentosSelecionados.splice(index, 1);
    this.equipamentos.push(equipament.equipament_id);
  }

  printTerm(){
    var printWindow = window.open("" , "PRINT" , "height=700 , width=1000");

    printWindow.document.write("<html><head><title>" + "</title>");
    printWindow.document.write("</head><body>");
    printWindow.document.write("<h1></h1>" );
    printWindow.document.write(document.getElementById("termo").innerHTML);
    printWindow.document.write("</body></html>");

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  filterEquipamento(filterValue: string) {
    let filter = filterValue.toLowerCase();

    $("#equipamentosList").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(filter) > -1
      );
    });
  }

  async save(){

    await this.equipamentosSelecionados.forEach(element => {
      this.colabEquipamentoService.store(element).subscribe(
        resp => { 
          this.toast.successToastr("Equipamento alocado com sucesso " , "Sucesso !");
          this.chargeDatas();
         },
         err => {

         }
      )
    })

    this.chargeDatas();



  }
}
