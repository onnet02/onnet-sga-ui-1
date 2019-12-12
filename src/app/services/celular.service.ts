import { Celular } from "./../models/celular";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Globals } from "./../global-variable";
import { Injectable } from "@angular/core";

@Injectable()
export class CelularService {
  constructor(private global: Globals, private http: HttpClient) {}

  URI: string = this.global.BASE_URL + "phones";

  index(): Observable<Celular[]> {
    return this.http.get<Celular[]>(this.URI);
  }

  indexByDisponibility(): Observable<Celular[]>{
    return this.http.get<Celular[]>(this.URI + '/find/disponivel')
  }

  show(celular: Celular): Observable<Celular> {
    return this.http.get<Celular>(this.URI);
  }

  store(celular: Celular) {
    return this.http.post(this.URI, celular);
  }

  update(celular: Celular) {
    return this.http.put(this.URI + `/${celular.id}`, celular);
  }

  destroy(celular: Celular) {
    return this.http.delete(this.URI + `/${celular.id}`);
  }
}
