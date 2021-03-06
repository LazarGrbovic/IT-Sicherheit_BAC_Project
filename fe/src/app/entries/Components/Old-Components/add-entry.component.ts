// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';

// import { EntryService } from '@app/_services/entry.service';
// import { AlertService } from '@app/_services/alert.service'
// import { MustMatch } from '@app/_helpers/must-match.validator';

// @Component({ templateUrl: 'add-entry.component.html' })
// export class AddComponent implements OnInit {
//     form!: FormGroup;    
//     loading = false;
//     submitted = false;

//     constructor(
//         private formBuilder: FormBuilder,
//         private route: ActivatedRoute,
//         private router: Router,
//         private entryService: EntryService,
//         private alertService: AlertService
//     ) {}

//     ngOnInit() {
        
//         this.form = this.formBuilder.group({
//             upload: ['', [Validators.pattern("^[0-9]*$"), Validators.required]],
//             download: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
//             provider: ['', [Validators.required, Validators.minLength(1)]],
//             testProvider: ['', [Validators.required, Validators.minLength(1)]],
//             ping: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1)]],
//             datum: ['', [Validators.minLength(10), Validators.required, Validators.nullValidator]],
//             os: ['', [Validators.required, Validators.minLength(2)]],
//             comment: ['', [Validators.required, Validators.nullValidator, Validators.minLength(2)]],
//             // note: ['', [Validators.required , Validators.nullValidator, Validators.maxLength(1), Validators.minLength(1), Validators.pattern("^[1-5]*$")]]            
//             note: ['', [Validators.required , Validators.nullValidator]]
//         });
       
//     }

//     // convenience getter for easy access to form fields
//     get f() { return this.form.controls; }

//     onSubmit() {
//         this.submitted = true;

//         // reset alerts on submit
//         this.alertService.clear();
        

//         // stop here if form is invalid
//         if (this.form.invalid) {
//             return;
//         }

//         this.createEntry();
//     }

//     private createEntry() {
//         this.entryService.create(this.form.value)
//             .pipe(first())
//             .subscribe(() => {
//                 this.alertService.success('Entry added', { keepAfterRouteChange: true });
//                 this.router.navigate(['../'], { relativeTo: this.route });
//             })
//             .add(() => this.loading = false);
//     }    
// }