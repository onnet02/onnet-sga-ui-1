import { Globals } from "./../global-variable";
import { Empresa } from "./../models/empresa";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class EmpresaService {
  constructor(private http: HttpClient, private global: Globals) {}

  URI = this.global.BASE_URL + "empresa";

  index(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.URI);
  }

  show(empresa: Empresa): Observable<Empresa> {
    return this.http.get<Empresa>(this.URI + `/${empresa.id}`);
  }

  store(empresa: Empresa) {
    return this.http.post(this.URI, empresa);
  }

  update(empresa: Empresa) {
    return this.http.put(this.URI +`/${empresa.id}` , empresa);
  }

  destroy(empresa: Empresa) {
    return this.http.delete(this.URI + `/${empresa.id}`);
  }
}
