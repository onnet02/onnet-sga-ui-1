import { Empresa } from './../models/empresa';
import { Colaborador } from 'src/app/models/colaborador';
import { Observable } from 'rxjs';
import { Globals } from "./../global-variable";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ColaboradorService {
  constructor(private http: HttpClient, private global: Globals) {}

  URI: string = this.global.BASE_URL + "colaborador";

  index(): Observable<Colaborador[]> {
      return this.http.get<Colaborador[]>(this.URI);
  }

  indexByCity(empresa: Empresa): Observable <Colaborador[]>{
    return this.http.get<Colaborador[]>(this.URI + `/find/city/${empresa.id}`);
  }

  show(colaborador: Colaborador): Observable<Colaborador> {
    return this.http.get<Colaborador>(this.URI + `/${colaborador.id}`);
  }

  store(colaborador: Colaborador) {
    return this.http.post(this.URI , colaborador);
  }

  update(colaborador: Colaborador) {
      return this.http.put(this.URI + `/${colaborador.id}` , colaborador);
  }

  destryo(colaborador: Colaborador) {
      return this.http.delete(this.URI + `/${colaborador.id}`)
  }
}
