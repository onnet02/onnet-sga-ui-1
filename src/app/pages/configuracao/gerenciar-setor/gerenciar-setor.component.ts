import { Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SetorService } from './../../../services/setor.service';
import { FormBuilder } from '@angular/forms';
import { MatSort, MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { Setor } from './../../../models/setor';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gerenciar-setor',
  templateUrl: './gerenciar-setor.component.html',
  styleUrls: ['./gerenciar-setor.component.scss']
})
export class GerenciarSetorComponent implements OnInit {

  setors:Setor[];
  setor: Setor = new Setor();
  setorForm: FormGroup;

  displayedColumns: string [] = ['nome', 'supervisor', 'editar' , 'deletar'];
  dataSource = new MatTableDataSource<Setor>(this.setors);
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort


  constructor(
    formBuilder: FormBuilder,
    private setorService: SetorService,
    private toastr: ToastrManager
  ) { 
    this.setorForm = formBuilder.group({
      id: [''],
      nome: ['' , Validators.required],
      supervisor: ['' , Validators.required]
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
    this.dataSource.filter  = filterValue.trim().toUpperCase();
  }

  initTable(){
    this.setorService.index().subscribe(
      suc => {
        this.dataSource.data = suc;
      },
      err => {}
    )
  }

  loadInput(form: Setor){
    this.setorForm.patchValue({
      id: form.id,
      nome: form.nome,
      supervisor: form.supervisor
    });
  }

  save(){
    var result, 
     setorValue = this.setorForm.value;

     if(setorValue.id){
       result = this.setorService.update(setorValue).subscribe(
         suc => {
           this.toastr.successToastr('Setor editado com sucesso !' , 'Sucesso !');
           this.initTable();
           this.clearForm();
         },
         err => {
           this.toastr.errorToastr('Ocorreu um erro ' , 'Erro !');
         }
       )
     } else {
       result = this.setorService.store(setorValue).subscribe(
         suc => {
           this.toastr.successToastr('Setor criado com sucesso !' , 'Sucesso');
           this.initTable();
           this.clearForm();
         },
         err => {
           this.toastr.errorToastr('Ocorreu um erro !' , 'Erro');
         }

       )
     }
  }

  trash(element: Setor){
    let response = confirm('Deseja mesmo excluir este registro ?');
    if(response){
      this.setorService.destroy(element).subscribe(
        suc => {
          this.toastr.warningToastr('Registro deletado com sucesso !', "Sucesso");
          this.initTable();
        },
        err => {
          this.toastr.errorToastr('O registro possui vinculo com outros');
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

}
