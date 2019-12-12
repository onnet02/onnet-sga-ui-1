import { async } from "@angular/core/testing";
import { MobileEmail } from "./../models/mobileEmail";
import { Observable } from "rxjs";
import { Globals } from "./../global-variable";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MobileEmailService {
  constructor(private http: HttpClient, private global: Globals) {}

  URI = this.global.BASE_URL + "mobile_email";

  index(): Observable<MobileEmail[]> {
    return this.http.get<MobileEmail[]>(this.URI);
  }

  indexByMobileEmail(): Observable<MobileEmail[]>{
    return this.http.get<MobileEmail[]>(this.URI + '/find/indexByEmailDisponivel');
  }

  show(mobileEmail: MobileEmail): Observable<MobileEmail> {
    return this.http.get<MobileEmail>(this.URI + `/${mobileEmail.id}`);
  }

  store(mobileEmail: MobileEmail) {
    return this.http.post(this.URI, mobileEmail);
  }

  update(mobileEmail: MobileEmail) {
    return this.http.put(this.URI + `/${mobileEmail.id}`, mobileEmail);
  }

  destroy(mobileEmail: MobileEmail) {
    return this.http.delete(this.URI + `/${mobileEmail.id}`);
  }
}
