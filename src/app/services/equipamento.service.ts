import { Equipamentos } from './../models/equipamentos';
import { Observable } from 'rxjs';
import { Globals } from './../global-variable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EquipamentoService {

    constructor(private http: HttpClient,  private global: Globals) { }

    URI = this.global.BASE_URL + 'equipaments';

    index(): Observable<Equipamentos[]>{
        return this.http.get<Equipamentos[]>(this.URI);
    }

    indexAvaiableEquipament(): Observable<Equipamentos[]>{
        return this.http.get<Equipamentos[]>(this.URI + '/find/indexEquipamentAvaiable')
    }

    indexEquipamentInUse(): Observable<Equipamentos[]>{
        return this.http.get<Equipamentos[]>(this.URI + '/inUse/index');
    }

    show(equipamentos: Equipamentos): Observable<Equipamentos>{
        return this.http.get<Equipamentos>(this.URI + `/${equipamentos.id}`);
    }

    store(equipamentos: Equipamentos){
        return this.http.post(this.URI, equipamentos);
    }
    
    update(equipamentos: Equipamentos){
        return this.http.put(this.URI + `/${equipamentos.id}` , equipamentos);
    }

    destroy(equipamentos: Equipamentos){
        return this.http.delete(this.URI + `/${equipamentos.id}`);
    }

}