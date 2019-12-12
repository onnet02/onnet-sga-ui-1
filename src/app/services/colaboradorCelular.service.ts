import { Colaborador } from "./../models/colaborador";
import { ColaboradorCelular } from "./../models/ColaboradorCelular";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Globals } from "../global-variable";

@Injectable()
export class ColabCelularService {
  constructor(private global: Globals, private http: HttpClient) {}

  URI: string = this.global.BASE_URL + "phoneColab";

  index(): Observable<ColaboradorCelular[]> {
    return this.http.get<ColaboradorCelular[]>(this.URI);
  }

  indexByColaborator(
    colaborador: Colaborador
  ): Observable<ColaboradorCelular[]> {
    return this.http.get<ColaboradorCelular[]>(
      this.URI + `/find/${colaborador.id}`
    );
  }

  indexAllUsingPhone(): Observable<ColaboradorCelular[]>{
    return this.http.get<ColaboradorCelular[]>(this.URI + '/index/all-phone-in-use');
  }

  indexAllReturnedPhones() : Observable<ColaboradorCelular[]>{
    return this.http.get<ColaboradorCelular[]>(this.URI + '/find/AllReturnedPhone');
  }

  show(colabCelular: ColaboradorCelular): Observable<ColaboradorCelular> {
    return this.http.get<ColaboradorCelular>(this.URI + `/${colabCelular.id}`);
  }

  store(colabCeluar: ColaboradorCelular) {
    return this.http.post(this.URI, colabCeluar);
  }

  update(colabCelular: ColaboradorCelular) {
    return this.http.put(this.URI + `/${colabCelular.id}`, colabCelular);
  }

  devolucaoCelular(colabCelular: ColaboradorCelular){
    return this.http.put(this.URI + `/devolucao/${colabCelular.id}`, colabCelular)
  }

  delete(colabCelular: ColaboradorCelular) {
    return this.http.delete(this.URI + `/${colabCelular.id}`);
  }
}
