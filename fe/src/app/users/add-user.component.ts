import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import hash from 'object-hash'

import { UserService } from '@app/_services/user.service';
import { AlertService } from '@app/_services/alert.service'
import { MustMatch } from '@app/_helpers/must-match.validator';

@Component({ templateUrl: 'add-user.component.html' })
export class AddUserComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],            
            email: ['', [Validators.required, Validators.email]]                     
        });        
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.createUser();
      
    }

    private createUser() {
        let username = this.form.controls['username'].value;

        let passwordHash:string = hash.MD5(this.form.controls['password'].value);
        this.form.controls['password'].setValue(passwordHash);

        this.userService.create(this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success(`User ${username} added`, { keepAfterRouteChange: true });
                this.router.navigate([''], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }
    
}