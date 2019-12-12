import { ColabCelularService } from "src/app/services/colaboradorCelular.service";
import { MobileEmailService } from "src/app/services/mobileEmail.service";
import { MobileEmail } from "./../../../models/mobileEmail";
import { Email } from "./../../../models/email";
import { ChipService } from "./../../../services/gerenciarChip.service";
import { Chip } from "./../../../models/chip";
import { Celular } from "./../../../models/celular";
import { ToastrManager } from "ng6-toastr-notifications";
import { EmpresaService } from "./../../../services/empresa.service";
import { Empresa } from "./../../../models/empresa";
import { Colaborador } from "./../../../models/colaborador";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { CelularColaborador } from "src/app/models/celularColaborador";
import { ColaboradorService } from "src/app/services/colaborador.service";
import * as $ from "jquery";
import { ColaboradorCelular } from "src/app/models/ColaboradorCelular";
import { CelularService } from "src/app/services/celular.service";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-gerenciador-alocao-mobile",
  templateUrl: "./gerenciador-alocao-mobile.component.html",
  styleUrls: ["./gerenciador-alocao-mobile.component.scss"]
})
export class GerenciadorAlocaoMobileComponent implements OnInit {
  empresas: Empresa[];
  colaboradores: Colaborador[];
  colabCelular: ColaboradorCelular = new ColaboradorCelular();
  colabCelularForm: FormGroup;
  isEditable = true;
  secondFormGroup: FormGroup;
  celulares: Celular[];
  chips: Chip[];
  mobileEmails: MobileEmail[];
  celularesComodatados: ColaboradorCelular[];
  celularesEmUso: ColaboradorCelular[];

  selectedRow: Number;
  selectedRowPhone: Number;
  selectedRowChip: Number;
  selectedRowEmail: Number;
  setClickedRow: Function;
  setClickedRowPhone: Function;
  setClickedRowChip: Function;
  setClickedRowEmail: Function;

  // Valores do formulario (visual)]
  nomeColaborador: string = "";
  celularSelecionado: string = "";
  chipSelecionado: string = "";
  emailSelecionado: string = "";
  subModeloSelecionado: string = "";
  operadorSelecionada: string = "";
  imeiSelecionado: number;
  marcaSelecionada: string = "";
  termo_assinadoBox: boolean = false;
  colaboradorSelecionado: Colaborador;

  // Stepper Option
  isComodato = true;
  isDevolucao = false;
  // Variavel para conversão de data
  meses = new Array(
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  );
  dataExtensa: string = "";

  // Variaveis de impressão
  empresaTermo: string = "FIBER SERVICE TELECOM LTDA";
  cidadeTermo: string = "Patrocínio";
  // Variaveis de conta
  countCelular: number;
  countPhoneInUse: number;

  constructor(
    private empresaService: EmpresaService,
    private colaboradorService: ColaboradorService,
    private toast: ToastrManager,
    private formBuilder: FormBuilder,
    private celularService: CelularService,
    private chipService: ChipService,
    private mobileEmailService: MobileEmailService,
    private colabCelularService: ColabCelularService
  ) {
    this.colabCelularForm = formBuilder.group({
      id: [""],
      phones_id: ["", Validators.required],
      collaborators_id: ["", Validators.required],
      data_comodato: ["", Validators.required],
      data_devolucao: [""],
      chip_id: ["", Validators.required],
      mobile_email_id: ["", Validators.required],
      termo_assinado: [],
      acessorios: ["", Validators.required]
    });

    this.setClickedRow = function(index) {
      this.selectedRow = index;
    };

    this.setClickedRowPhone = function(index) {
      this.selectedRowPhone = index;
    };

    this.setClickedRowChip = function(index) {
      this.selectedRowChip = index;
    };

    this.setClickedRowEmail = function(index) {
      this.selectedRowEmail = index;
    };
  }

  ngOnInit() {
    this.chargeDatas();
  }

  chargeDatas() {
    this.empresaService.index().subscribe(resp => (this.empresas = resp));

    this.colaboradorService
      .index()
      .subscribe(resp => (this.colaboradores = resp));

    this.celularService
      .indexByDisponibility()
      .subscribe(
        resp => {this.celulares = resp; this.countCelular = resp.length;}
      )

    this.chipService.indexByDisponivel().subscribe(resp => (this.chips = resp));

    this.mobileEmailService
      .indexByMobileEmail()
      .subscribe(resp => (this.mobileEmails = resp));

    this.colabCelularService.indexAllUsingPhone().subscribe(
      resp => {this.countPhoneInUse = resp.length; this.celularesEmUso = resp;}
    );

  }

  isChecked() {
    this.termo_assinadoBox = !this.termo_assinadoBox;
    this.colabCelularForm.patchValue({
      termo_assinado: this.termo_assinadoBox
    });
  }

  converterDateToExtensive() {
    var data = this.colabCelularForm.value.data_comodato;

    var datas = data.split("-");

    this.dataExtensa =
      datas[2] + " de " + this.meses[datas[1]] + " de " + datas[0];
  }

  filterByCity(empresa: Empresa) {
    if(empresa == null || empresa == undefined){
      this.colaboradorService.index().subscribe(
        resp => {this.colaboradores = resp}
      );
    } else {
      this.colaboradorService.indexByCity(empresa).subscribe(
        resp => {this.colaboradores = resp},
        err => {this.toast.infoToastr('Não foi encontrado nenhum funcionario cadastrado nesta empresa', "Detalhe")}
      )
    }
  }

  getColaborador(colaborador: Colaborador) {
    this.colabCelularForm.patchValue({
      collaborators_id: colaborador.id
    });

    this.nomeColaborador = colaborador.nome;
    this.colaboradorSelecionado = colaborador

    this.colabCelularService.indexByColaborator(colaborador).subscribe(resp => {
      this.celularesComodatados = resp;
    });
    
  }

  filterTable(filterValue: string) {
    let filter = filterValue.toLowerCase();

    $("#colaboradoresTable #contentTr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(filter) > -1
      );
    });
  }

  filterTablePhone(filterValue: string) {
    let filter = filterValue.toLowerCase();

    $("#phoneTable #phoneTr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(filter) > -1
      );
    });
  }

  filterTableChip(filterValue: string) {
    let filter = filterValue.toLowerCase();
    console.log(filter);

    $("#chipTable #chipTr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(filter) > -1
      );
    });
  }

  filterTableEmail(filterValue: string) {
    let filter = filterValue.toLowerCase();
    $("#emailTable #emailTr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(filter) > -1
      );
    });
  }

  filterCelularEmUso(filterValue: string){
    let filter = filterValue.toLowerCase();

    $("#tableCelularEmUso #celularContentTr").filter(function() {
      $(this).toggle(
        $(this).text().toLowerCase().indexOf(filter) > -1
      );
    });
  }

  filterTableCelularDisp(filterValue : string){
    let filter = filterValue.toLowerCase();

    $("#InUseTable #inUseTr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(filter) > -1);
    });
  }
  

  changeToModalDevolucao() {
    this.isComodato = false;
    this.isDevolucao = true;
    this.resetForm();
    this.chargeDatas();
  }

  changeToModalComodato() {
    this.isDevolucao = false;
    this.isComodato = true;
    this.resetForm();
    this.chargeDatas();
  }

   devolucaoDoCelular(comodato: ColaboradorCelular){
    let resp = confirm("Você esta preste a realizar a devolução desse celular. Está operação é irreversível");
    if(resp == false){
      return;
    }

    var formValue = this.colabCelularForm.value;

    if(formValue.data_devolucao == null || formValue.data_devolucao == ""){
      this.toast.warningToastr('Preenche a data de devoluçao corretamente');
      return;
    }
    
    comodato.data_devolucao = formValue.data_devolucao;

    this.colabCelularService.devolucaoCelular(comodato).subscribe(
      resp => {
        this.toast.successToastr('A devolução do celular foi feita com sucesso !' , 'Sucesso !');
        this.clearMarkedRow();
        this.chargeDatas();
        this.resetForm();
        
       this.colabCelularService.indexByColaborator(this.colaboradorSelecionado).subscribe(
          suc => { this.celularesComodatados = suc}
        )
    
      },
      err => {
        this.toast.errorToastr('Ocorreu um erro ao tentar realizar a devolução' , 'Erro')
      }
    )

  }

  setSelectedPhone(celular: Celular) {
    this.colabCelularForm.patchValue({
      phones_id: celular.id
    });
    console.log(this.colabCelularForm.value);

    this.celularSelecionado = celular.modelo.nome;
    this.subModeloSelecionado = celular.sub_modelo;
    this.imeiSelecionado = celular.imei;
    this.marcaSelecionada = celular.modelo.marca.nome;
  }

  setSelectedChip(chip: Chip) {
    this.colabCelularForm.patchValue({
      chip_id: chip.id
    });

    this.chipSelecionado = chip.numero_tel;
    this.operadorSelecionada = chip.operadora;
  }

  setSelectedEmail(email: MobileEmail) {
    this.colabCelularForm.patchValue({
      mobile_email_id: email.id
    });

    this.emailSelecionado = email.mobil_email;
  }

  imprimirTermo() {
    var printWindow = window.open("", "PRINT", "height=700,width=1000");

    printWindow.document.write("<html><head><title>" + "</title>");
    printWindow.document.write("</head><body >");
    printWindow.document.write("<h1>" + "</h1>");
    printWindow.document.write(document.getElementById("termo").innerHTML);
    printWindow.document.write("</body></html>");

    printWindow.document.close();
    printWindow.focus();

    printWindow.print();
    printWindow.close();
  }

  clearMarkedRow() {
    this.selectedRow = null;
    this.selectedRowPhone = null;
    this.selectedRowChip = null;
    this.selectedRowEmail = null;
   
  }

  resetForm(){
    this.colabCelularForm.patchValue({
      id: [""],
      phones_id: "",
      data_comodato: "",
      data_devolucao: "",
      chip_id: "",
      mobile_email_id: "",
      termo_assinado: "",
      acessorios: ""
    });
  }

  salvar() {
    var result,
      formValue = this.colabCelularForm.value;

      formValue.data_devolucao = null;
      
      if(formValue.termo_assinado == null || formValue.termo_assinado == ""){
        formValue.termo_assinado = false;
      }

  
      result = this.colabCelularService.store(formValue).subscribe(
        resp => {
          this.toast.successToastr(
            "Celular comodatado com sucesso !",
            "Sucesso !"
          );
          this.colabCelularForm.reset();
          this.clearMarkedRow();
          this.chargeDatas();
        },
        err => {
          this.toast.errorToastr(
            "Ocorreu um erro ao tentar comodatar este celular!",
            "Erro"
          );
        }
      );
    }
  }
