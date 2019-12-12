import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class AuthenticationService {

    cloudUri = 'https://onnet-sgax.herokuapp.com/authenticate';
    localUri = 'http://localhost:3333/authenticate';

    constructor(private http: HttpClient){}



    login(email: string , password: string){
        return this.http.post<any>(this.localUri , { email, password})
        .pipe(map(user => {
            if(user && user.token){
                localStorage.setItem('currentUser' , JSON.stringify(user));
                
            }
            return user;
        }));
    }

    logout(){
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}