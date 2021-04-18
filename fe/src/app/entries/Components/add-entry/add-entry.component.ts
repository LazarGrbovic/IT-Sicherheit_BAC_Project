import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { EntryService } from '@app/_services/entry.service';
import { AlertService } from '@app/_services/alert.service'
import { MustMatch } from '@app/_helpers/must-match.validator';

import { UserService } from '@app/_services/user.service';
import { DTOSpeedTest } from '../../../../../../sharedFolder/dto-speedtest';

@Component({ templateUrl: 'add-entry.component.html' })
export class AddEntryComponent implements OnInit {
    form!: FormGroup;    
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private entryService: EntryService,
        private alertService: AlertService,
        private userService: UserService
    ) {}

    ngOnInit() {

        if(this.userService.UserData == null){
            this.router.navigate(['']);
        }
        
        this.form = this.formBuilder.group({
            upload: ['', [Validators.pattern("^[0-9]*$"), Validators.required]],
            download: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            provider: ['', [Validators.required, Validators.minLength(1)]],
            testProvider: ['', [Validators.required, Validators.minLength(1)]],
            ping: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1)]],
            datum: ['', [Validators.minLength(10), Validators.required, Validators.nullValidator]],
            os: ['', [Validators.required, Validators.minLength(2)]],
            comment: ['', [Validators.required, Validators.nullValidator, Validators.minLength(2)]],
            // note: ['', [Validators.required , Validators.nullValidator, Validators.maxLength(1), Validators.minLength(1), Validators.pattern("^[1-5]*$")]]            
            note: ['', [Validators.required , Validators.nullValidator]]
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

        this.createEntry();
    }

    private createEntry() {
        if(this.userService.UserData != null){

            let entry:DTOSpeedTest = new DTOSpeedTest(
            this.userService.UserData.id,
            this.form.controls['upload'].value,
            this.form.controls['download'].value,
            this.form.controls['provider'].value,
            this.form.controls['testProvider'].value,
            this.form.controls['ping'].value,
            this.form.controls['datum'].value,
            this.form.controls['os'].value,
            this.form.controls['comment'].value,
            this.form.controls['note'].value
        )

        this.entryService.create(entry)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('Entry added', { keepAfterRouteChange: true });
                this.router.navigate(['../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }   
 }
}