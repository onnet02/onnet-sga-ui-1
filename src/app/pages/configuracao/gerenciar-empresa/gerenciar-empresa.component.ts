import { Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EmpresaService } from './../../../services/empresa.service';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { Empresa } from './../../../models/empresa';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gerenciar-empresa',
  templateUrl: './gerenciar-empresa.component.html',
  styleUrls: ['./gerenciar-empresa.component.scss']
})
export class GerenciarEmpresaComponent implements OnInit {

  empresas: Empresa[];
  empresa: Empresa = new Empresa();
  empresaForm: FormGroup;

  displayedColumns: string [] = ['nome_fantasia' ,  'cidade' , 'editar', 'deletar'];
  dataSource = new MatTableDataSource<Empresa>(this.empresas);
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;



  constructor(
    formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private toastr: ToastrManager
    ) {
      this.empresaForm = formBuilder.group({
        id: [''],
        nome_fantasia: ['', Validators.required],
        cidade: ['', Validators.required]
      });
     }

  ngOnInit() {
    this.initTable();
  }

  ngAfterViewInit(){
    this.dataSource.connect();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue : string){
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  initTable(){
    this.empresaService.index().subscribe(
      suc => {
        this.dataSource.data = suc;
      },
      err => {
        err = {}
      }
    );
  }

  loadInput(form: Empresa){
    this.empresaForm.patchValue({
      id: form.id,
      nome_fantasia: form.nome_fantasia
    });
  }

  save(){
    var result ,
      formValue = this.empresaForm.value;

      if(formValue.id){
        result = this.empresaService.update(formValue).subscribe(
          suc => {
            this.toastr.successToastr("Empresa editada com sucesso !" , ' Sucesso !');
            this.initTable();
            this.clearForm();
          },
          err => {
            this.toastr.errorToastr('Ocorreu um erro !' , 'Erro !' )
          }
        )
      } else {
        result = this.empresaService.store(formValue).subscribe(
          suc => {
            this.toastr.successToastr('Empresa cadastrada com sucesso ! ' , ' Sucesso');
            this.initTable();
            this.clearForm();
            
          },
          err => {
            this.toastr.errorToastr('Ocorreu um erro !' , 'Erro ');
          }
        )
      }
  }

  clearForm() {
    var forms = document.getElementsByTagName("form");

    for (var i = 0; i < forms.length; i++) {
      forms[i].reset();
    }
  }

  trash(empresa){
    var response = confirm('Deseja realmente excluir esta empresa ?');
    if(response){
      this.empresaService.destroy(empresa)
      .subscribe(
        suc => {
          this.toastr.warningToastr('Registro excluido com sucesso ! ' , 'Alerta');
          this.initTable();

        },
        err => {
          this.toastr.errorToastr('Ocorreu um erro ao tentar excluir registro' , 'Erro');
        }
      )
    } else {
      return ;
    }
  }


}
