import { MarcaService } from './../../../services/marca.service';
import { Marca } from './../../../models/Marca';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ModeloService } from './../../../services/modelo.service';
import { MatPaginator, MatSort } from '@angular/material';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Modelo } from './../../../models/Modelo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerenciar-modelo',
  templateUrl: './gerenciar-modelo.component.html',
  styleUrls: ['./gerenciar-modelo.component.scss']
})
export class GerenciarModeloComponent implements OnInit {

  modelos: Modelo[];
  modelo : Modelo = new Modelo();
  modeloForm: FormGroup;

  marcas: Marca[];

  displayedColumns: string[] = ['nome' , 'marca' , 'exclusivo_mobile' , 'editar'];
  dataSource = new MatTableDataSource<Modelo>(this.modelos);
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    formBuilder: FormBuilder,
    private modeloService: ModeloService,
    private toast: ToastrManager,
    private marcaService: MarcaService
  ) { 
    this.modeloForm = formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      marca_id: [''],
      exclusivo_mobile: ['']
    });
  }

  ngOnInit() {
    this.chargeDatas();
  }

  ngAfterViewInit(){
    this.dataSource.connect();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  chargeDatas(){
    this.modeloService.index().subscribe(
      suc => {
        this.dataSource.data = suc;
      },
      err => {}
    )

    this.marcaService.index().subscribe(
      resp => {
        this.marcas = resp;
      },
      err => {}
    )
  }

  chargeForm(form: Modelo){
    this.modeloForm.patchValue({
      id: form.id,
      nome: form.nome,
      marca_id: form.marca_id,
      exclusivo_mobile: form.exclusivo_mobile
    })
  }

  save(){
     var result,
      modeloFormValue = this.modeloForm.value;

      if(modeloFormValue.id){
        result = this.modeloService.update(modeloFormValue).subscribe(
          suc => {
            this.toast.successToastr('Modelo editado com sucesso !' , 'Sucesso');
            this.chargeDatas();
            this.clearForm();
          },
          err => {
            this.toast.errorToastr('Ocorreu um erro' , 'Erro !');
          }
        )
      } else {
        result = this.modeloService.store(modeloFormValue).subscribe(
          suc => {
            this.toast.successToastr('Modelo criado com sucesso !' , 'Sucesso');
            this.chargeDatas();
            this.clearForm();
          },
          err => {
            this.toast.errorToastr('Ocorreu um erro !' , 'Erro');
          }
        )
      }
  }

  trash(element: Modelo){
    let response = confirm('Deseja mesmo excluir este registro ?');
    if(response){
      this.modeloService.destroy(element).subscribe(
        suc => {
          this.toast.warningToastr('Registro deletado com sucesso !' , 'Sucesso !');
          this.chargeDatas();
        },
        err => {
          this.toast.errorToastr('O registro possui vinculo com outros');
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





}
