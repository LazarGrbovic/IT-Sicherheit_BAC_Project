// import { Component, OnInit } from '@angular/core';
// import { first } from 'rxjs/operators';

// import { EntryService } from '@app/_services/entry.service';
// import { DTOSpeedTest, DTOSpeedTestWithID } from '../../../../sharedFolder/dto-speedtest';
// import { FormBuilder, FormGroup } from '@angular/forms';

// @Component({ templateUrl: 'list.component.html' })
// export class ListComponent implements OnInit {
//     entries!: DTOSpeedTestWithID[];
//     queryOptions: any[] = [
//         { name: "Upload", value: 'upload' },
//         { name: "Download", value: 'download' },
//         { name: "Provider", value: 'provider' },
//         { name: "TestProvider", value: 'testProvider' },
//         { name: "Ping", value: 'ping' },
//         { name: "Datum", value: 'datum' },
//         { name: "OS", value: 'os' },
//         { name: "Comment", value: 'comment' },
//         { name: "Note", value: 'note' },
//         { name: "Default", value: 'default' },
        
//       ];

//     queryAscDescOptions: any [] = [
//         { name: "Ascending", value : 'asc'},
//         { name: "Descending", value : 'desc'}
//     ]
      
//     selectedSortingColumn: any = "default";
//     queryAscDesc: any = "asc";      
//     //   toStr = JSON.stringify;         

//     constructor(private entryService: EntryService, private fb: FormBuilder) {}

//     ngOnInit() {
//         this.entryService.getAll()
//             .pipe(first())
//             .subscribe(allEntires => this.entries = allEntires);        
//     }

//     deleteEntry(id: string) {
//         const entry = this.entries.find(x => x.id === id);
//         if (!entry) return;
//         // user.isDeleting = true;
//         this.entryService.delete(id)
//             .pipe(first())
//             .subscribe(() => this.entries = this.entries.filter(x => x.id !== id));
//     }

//     // https://blog.kevinchisholm.com/angular/get-value-selected-dropdown-menu-item/
//     setQuerySortingByColumn(e: any){
        
//         this.selectedSortingColumn = e.target.value;
//     }

//     setQueryAscDesc(e: any) {
//         this.queryAscDesc = e.target.value;
//     }

//     sortEntries() {
//        if (!this.selectedSortingColumn) {
//            return;
//        }
       
//        if (this.queryAscDesc != "asc" && this.queryAscDesc != "desc") {
//            this.queryAscDesc = "asc";
//        }

//        this.entryService.getSortedEntries(this.selectedSortingColumn, this.queryAscDesc)
//             .pipe()
//             .subscribe(allEntries => this.entries = allEntries);
//     }
// }