import { AuthenticationService } from './../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  submitted = false;
  returnUrl : string;
  error = "";

  constructor(
    private router: Router,
    private fb : FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['' , Validators.required]
    });

    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl' || '/'];

  }

  ngOnDestroy() {


  }

  get f() { return this.loginForm.controls;}

  onSubmit(){
    console.log("teste")
    this.submitted = true;

    // if(this.loginForm.invalid){
    //   return;
    // }

    this.authenticationService.login(this.f.email.value , this.f.password.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/dashboard']);
      }, error => {
        this.error = error;
      }
    );

   
  }

}
