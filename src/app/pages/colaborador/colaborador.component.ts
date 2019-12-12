import { ToastrManager } from "ng6-toastr-notifications";
import { ColaboradorService } from "./../../services/colaborador.service";
import { SetorService } from "src/app/services/setor.service";
import { EmailService } from "src/app/services/email.service";
import { CargoService } from "src/app/services/cargo.service";
import { EmpresaService } from "./../../services/empresa.service";
import { MatSort } from "@angular/material";
import { MatPaginator } from "@angular/material";
import { ViewChild } from "@angular/core";
import { Email } from "./../../models/email";
import { Setor } from "./../../models/setor";
import { Cargo } from "./../../models/cargo";
import { Empresa } from "./../../models/empresa";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Colaborador } from "src/app/models/colaborador";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-colaborador",
  templateUrl: "./colaborador.component.html",
  styleUrls: ["./colaborador.component.scss"]
})
export class ColaboradorComponent implements OnInit {
  colaboradores: Colaborador[];
  colaborador: Colaborador = new Colaborador();
  colaboradorForm: FormGroup;

  empresas: Empresa[];
  cargos: Cargo[];
  setors: Setor[];
  emails: Email[];

  labelPosition = 'after';
  checked = false;

  // Counts
  countAllColaborators: number = 0;
  countActiveColaborators: number = 0;

  displayedColumns: String[] = [
    "nome",
    "email",
    "empresa",
    "setor",
    "cargo",
    "ativo",
    "editar"
  ];
  dataSource = new MatTableDataSource<Colaborador>(this.colaboradores);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private cargoService: CargoService,
    private emailService: EmailService,
    private setorService: SetorService,
    private colaboradorService: ColaboradorService,
    private toast: ToastrManager
  ) {
    this.colaboradorForm = formBuilder.group({
      id: [''],
      nome: ['' , Validators.required],
      setor_id: ['', Validators.required],
      email_id: ['', [Validators.required]],
      empresa_id: ['', Validators.required],
      contato: ['', Validators.required],
      cargo_id: ['' , Validators.required],
      desligado: []
    })
  }

  ngOnInit() {
    this.initTable();
  }

  ngAfterViewInit() {
    this.dataSource.connect();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

 

  applyFilter(filterValue : string){
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter)
  }

  initTable(){

    this.colaboradorService.index().subscribe(colaboradores =>{
      this.dataSource.data = colaboradores;
      this.countAllColaborators = colaboradores.length
    });

    this.cargoService.index().subscribe(cargos =>{
      this.cargos = cargos;
    });
    this.empresaService.index().subscribe(empresas => {
      this.empresas = empresas;
    });
    this.emailService.indexByAvaiableEmail().subscribe(emails => {
      this.emails = emails;
    });
    this.setorService.index().subscribe(setor => {
      this.setors = setor
    });
   
  }

  loadInput(form: Colaborador){
    this.colaboradorForm.patchValue({
      id: form.id,
      nome: form.nome,
      setor_id: form.setor_id,
      email_id: form.email_id,
      empresa_id: form.empresa_id,
      contato: form.contato,
      cargo_id: form.cargo_id,
      desligado: form.desligado
    });
  }

  save(){
    var result, 
      colaboradorValue = this.colaboradorForm.value;

      if(colaboradorValue.desligado == null ){
        colaboradorValue.desligado = false;
      }

      if(colaboradorValue.id){
        result = this.colaboradorService.update(colaboradorValue).subscribe(
          suc => {
            this.toast.successToastr('Colaborador editado com sucesso !' , 'Sucesso !');
            this.initTable();
            this.clearForm();
          },
          err => {
            this.toast.errorToastr('Ocorreu um erro !' , 'Erro !');
          }
        )
      } else {
        result = this.colaboradorService.store(colaboradorValue).subscribe(
          suc => {
            this.toast.successToastr('Colaborador cadastrado com sucesso !', 'Sucesso !');
            this.initTable();
            this.clearForm();
          },
          err => {
            this.toast.errorToastr('Ocorreu um erro !', 'Erro');
          }
        )
      }
  }

  clearForm(){
    var forms = document.getElementsByTagName('form');

    for(var i = 0; i < forms.length; i++){
      forms[i].reset();
    }
  }

  trash(colaborador: Colaborador){
    var response = confirm('Deseja realmente inativar este colaborador ');
    if(response) {
      this.colaboradorService.destryo(colaborador).subscribe(
        suc => {
          this.toast.warningToastr('Colaborador inativado com sucesso !' , 'Alerta');
          this.initTable();
        },
        err => {
          this.toast.errorToastr('Ocorreu um erro !' , "Erro !");
        });
    } else {
      return;
    }
  }
}
