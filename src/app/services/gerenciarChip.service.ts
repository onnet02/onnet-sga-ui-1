import { Chip } from './../models/chip';
import { Observable } from 'rxjs';
import { Globals } from './../global-variable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ChipService {

    constructor(private http: HttpClient, private global : Globals) { }

    URI = this.global.BASE_URL + 'chip';

    index(): Observable<Chip[]>{
        return this.http.get<Chip[]>(this.URI);
    }
    
    indexByDisponivel(): Observable<Chip[]>{
        return this.http.get<Chip[]>(this.URI + '/find/indexByDisponivel');
    }

    show(chip: Chip): Observable<Chip>{
        return this.http.get<Chip>(this.URI + `/${chip.id}`);
    }

    store(chip: Chip){
        return this.http.post(this.URI, chip);
    }

    update(chip: Chip){
        return this.http.put(this.URI + `/${chip.id}` , chip);
    }

    destroy(chip : Chip){
        return this.http.delete(this.URI + `/${chip.id}`);
    }

}