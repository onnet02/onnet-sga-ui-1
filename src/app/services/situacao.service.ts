import { Situacao } from "./../models/Situacao";
import { Observable } from "rxjs";
import { Globals } from "./../global-variable";
import { HttpClient } from "@angular/common/http";

import { Injectable } from "@angular/core";

@Injectable()
export class SituacaoService {
  constructor(private http: HttpClient, private global: Globals) {}

  URI: string = this.global.BASE_URL + "situations";

  index(): Observable<Situacao[]> {
    return this.http.get<Situacao[]>(this.URI);
  }

  show(situacao: Situacao): Observable<Situacao> {
    return this.http.get<Situacao>(this.URI + `/${situacao.id}`);
  }

  store(situacao: Situacao) {
    return this.http.post(this.URI, situacao);
  }

  update(situacao: Situacao) {
    return this.http.put(this.URI + `/${situacao.id}`, situacao);
  }

  destroy(situacao: Situacao) {
    return this.http.delete(this.URI + `/${situacao.id}`);
  }
}
