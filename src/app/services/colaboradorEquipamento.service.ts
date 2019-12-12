import { EquipamentoColaborador } from './../models/equipamentoColaborador';
import { Observable } from 'rxjs';
import { Globals } from './../global-variable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ColabEquipamentoService {


    constructor(private http: HttpClient,  private globals: Globals) { }

    URI: string = this.globals.BASE_URL + "collaborator_equipament";

    index(): Observable<EquipamentoColaborador[]>{
        return this.http.get<EquipamentoColaborador[]>(this.URI);
    }

    indexAllComodato(id): Observable<EquipamentoColaborador[]>{
        return this.http.get<EquipamentoColaborador[]>(this.URI + `/find/allComodato/${id}`)
    }

    show(equipamentoColaborador: EquipamentoColaborador): Observable<EquipamentoColaborador>{
        return this.http.get<EquipamentoColaborador>(this.URI + `/${equipamentoColaborador.id}`)
    }

    store(equipamentoColaborador: EquipamentoColaborador){
        return this.http.post(this.URI , equipamentoColaborador);
    }

    update(equipamentoColaborador: EquipamentoColaborador){
        return this.http.put(this.URI + `/${equipamentoColaborador.id}` , equipamentoColaborador );
    }

    devolucaoEquipament(equipamentoColaborador: EquipamentoColaborador){
        return this.http.put(this.URI + `/devolucao/${equipamentoColaborador.id}` , equipamentoColaborador );
    }

    delete(equipamentoColaborador: EquipamentoColaborador){
        return this.http.delete(this.URI + `/${equipamentoColaborador.id}`);
    }
    
}