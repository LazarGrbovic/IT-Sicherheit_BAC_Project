import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppComponent } from "../app.component";

import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

import hash from 'object-hash'

import { UserService } from '@app/_services/user.service';
import { DTOUserModel, DTOUserModelJustId } from '../../../../sharedFolder/dto-user.model';

import { AlertService } from '@app/_services/alert.service';
import { Token } from '../../../../sharedFolder/token'

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form!: FormGroup;    
    loading = false;
    submitted = false;
    

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private myApp: AppComponent) {}

        // https://stackoverflow.com/questions/40145002/how-to-access-a-method-from-app-component-from-other-component/40145529

    ngOnInit() {
        // this.userService.tryToLogin
        
        this.form = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(1)]],            
            password: ['', [Validators.required, Validators.minLength(1)]]            
        });        
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        console.debug("Inside submitted login");

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }        

        this.tryToLogin();
    }

    private tryToLogin() {
       // https://stackoverflow.com/questions/43713558/how-to-get-a-single-value-from-formgroup 
       let username = this.form.controls['username'].value;

       let passwordHash:string = hash.MD5(this.form.controls['password'].value);
      this.form.controls['password'].setValue(passwordHash);

console.log("userService login is being called");
console.log(this.userService.UserData);

        this.userService.login(this.form.value)
                .pipe(first())
                .subscribe((response) => {
                    let token = response as Token;
                    this.userService.storeToken(token);
                    this.alertService.success(`Login successful! Welcome ${username}`, { keepAfterRouteChange: true });                    
                    this.router.navigate([''], { relativeTo: this.route });
                    this.myApp.enableLogout(username);
                })
                .add(() => this.loading = false);
        
                console.log("userService getIDbyUsername is being called");
                let userID: string ="";
                 this.userService.getIdByUsername(this.form.controls['username'].value).subscribe((val) => this.userService.UserData = val);
    }   
}