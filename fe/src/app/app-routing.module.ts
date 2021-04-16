import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartTestComponent } from './entries/Components/chart-test/chart-test.component';

import { HomeComponent } from './home/home.component';

const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const entriesModule = () => import('./entries/entries.module').then(x => x.EntriesModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user', loadChildren: usersModule },
    { path: 'entries', loadChildren: entriesModule },
    // { path: 'statistics', component: ChartTestComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }