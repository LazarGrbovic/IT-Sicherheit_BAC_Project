import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService } from '@app/_services/user.service';
import { AlertService } from '@app/_services/alert.service'
import { MustMatch } from '@app/_helpers/must-match.validator';

import { DTOUserModel } from "../../../../sharedFolder/dto-user.model" 

@Component({ templateUrl: 'edit-user.component.html' })
export class EditUserComponent implements OnInit {
    user!: DTOUserModel;
    form!: FormGroup;
    id!: string;
    username!: string;
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
        this.form = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(2)]],
            password: ['', [Validators.required, Validators.minLength(2)]],            
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

        this.loading = true;
        
        this.updateUser();
    }
    
    private updateUser() {
        this.userService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('User updated', { keepAfterRouteChange: true });
                this.router.navigate(['../../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }
}