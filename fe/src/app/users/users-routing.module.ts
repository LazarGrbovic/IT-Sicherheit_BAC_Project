import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LayoutComponent } from './layout.component';

import { LoginComponent } from './login.component';
import { AddUserComponent } from './add-user.component'
import { EditUserComponent } from "./edit-user.component"

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: LoginComponent },
            { path: 'add', component:  AddUserComponent},
            { path: 'login', component: LoginComponent },
            { path: 'edit/:id', component: EditUserComponent}            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }