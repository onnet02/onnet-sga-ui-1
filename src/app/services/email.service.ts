import { Email } from "./../models/email";
import { Observable } from "rxjs";
import { Globals } from "./../global-variable";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class EmailService {
  constructor(private http: HttpClient, private global: Globals) {}

  URI: string = this.global.BASE_URL + "email";

  index(): Observable<Email[]> {
    return this.http.get<Email[]>(this.URI);
  }

  indexByAvaiableEmail(): Observable<Email[]>{
    return this.http.get<Email[]>(this.URI + '/find/avaiablesEmails');
  }

  show(email: Email): Observable<Email> {
    return this.http.get<Email>(this.URI + `/${email.id}`);
  }

  store(email: Email) {
    return this.http.post(this.URI , email);
  }

  update(email : Email) {
    return this.http.put(this.URI + `/${email.id}` , email);
  }

  destroy(email : Email) {
      return this.http.delete(this.URI + `/${email.id}`);
  }
}
