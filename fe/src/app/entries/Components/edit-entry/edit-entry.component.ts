import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { EntryService } from '@app/_services/entry.service';
import { AlertService } from '@app/_services/alert.service'
import { MustMatch } from '@app/_helpers/must-match.validator';

import { UserService } from '@app/_services/user.service';

import { DTOSpeedTestWithID } from "../../../../../../sharedFolder/dto-speedtest"

@Component({ templateUrl: 'edit-entry.component.html' })
export class EditEntryComponent implements OnInit {
    form!: FormGroup;    
    loading = false;
    submitted = false;
    id!: string;
    entry!: DTOSpeedTestWithID;        

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

        this.id = this.route.snapshot.params['id'];
        
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

        this.editEntry();
    }

    private editEntry() {
        this.entryService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('Entry edited', { keepAfterRouteChange: true });
                this.router.navigate(['/entries'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }
   
}