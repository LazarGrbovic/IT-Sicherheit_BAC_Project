import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { LayoutComponent } from './layout.component';
// import { ListComponent } from './list.component';
// import { AddComponent } from './add-entry.component';
import { EditEntryComponent } from './Components/edit-entry/edit-entry.component';
import { ChartTestComponent } from './Components/chart-test/chart-test.component';
import { AddEntryComponent } from './Components/add-entry/add-entry.component';
import { ListEntriesComponent } from './Components/list-entries/list-entries.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EntriesRoutingModule
    ],
    declarations: [
        LayoutComponent,
        // ListComponent,
        // AddComponent,
        ListEntriesComponent,
        EditEntryComponent,
        ChartTestComponent,
        AddEntryComponent,
        ListEntriesComponent        
    ]
})
export class EntriesModule { }