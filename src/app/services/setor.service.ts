import { Observable } from 'rxjs';
import { Setor } from './../models/setor';
import { Globals } from './../global-variable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SetorService {

    constructor(private http: HttpClient , private global: Globals) { }

    URI = this.global.BASE_URL + 'setor';

    index(): Observable<Setor[]>{
        return this.http.get<Setor[]>(this.URI);
    }

    show(setor: Setor): Observable<Setor>{
        return this.http.get<Setor>(this.URI + `/${setor.id}`);
    }

    store(setor: Setor){
        return this.http.post(this.URI , setor);
    }

    update(setor : Setor){
        return this.http.put(this.URI + `/${setor.id}` , setor);
    }

    destroy(setor : Setor){
        return this.http.delete(this.URI + `/${setor.id}`);
    }

}