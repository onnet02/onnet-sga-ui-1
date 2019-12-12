import { Cargo } from "./../models/cargo";
import { Observable } from "rxjs";
import { Globals } from "./../global-variable";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CargoService {
  constructor(private http: HttpClient, private global: Globals) {}

  URI = this.global.BASE_URL + "cargo";

  index(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.URI);
  }

  show(cargo: Cargo): Observable<Cargo> {
    return this.http.get<Cargo>(this.URI);
  }

  store(cargo: Cargo) {
    return this.http.post(this.URI, cargo);
  }

  update(cargo: Cargo) {
    return this.http.put(this.URI + `/${cargo.id}`, cargo);
  }

  destroy(cargo: Cargo) {
    return this.http.delete(this.URI + `/${cargo.id}`);
  }
}
