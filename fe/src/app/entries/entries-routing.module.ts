import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { ListEntriesComponent } from './Components/list-entries/list-entries.component';
import { AddEntryComponent } from './Components/add-entry/add-entry.component';
import { EditEntryComponent } from './Components/edit-entry/edit-entry.component';
// import { BarChartComponent } from './bar-chart.component';
import { ChartTestComponent } from './Components/chart-test/chart-test.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListEntriesComponent },
            { path: 'add', component: AddEntryComponent },
            { path: 'edit/:id', component: EditEntryComponent },
            // { path: 'statistics', component: BarChartComponent }
            { path: 'statistics', component: ChartTestComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntriesRoutingModule { }