import { Marca } from "./../models/Marca";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Globals } from "./../global-variable";
import { Injectable } from "@angular/core";

@Injectable()
export class MarcaService {
  constructor(private global: Globals, private http: HttpClient) {}

  URI: string = this.global.BASE_URL + "marca";

  index(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.URI);
  }

  show(marca: Marca): Observable<Marca> {
    return this.http.get<Marca>(this.URI + `/${marca.id}`);
  }

  store(marca: Marca) {
    return this.http.post(this.URI, marca);
  }

  update(marca: Marca) {
    return this.http.put(this.URI + `/${marca.id}`, marca);
  }

  destroy(marca: Marca) {
    return this.http.delete(this.URI + `/${marca.id}`);
  }
}
