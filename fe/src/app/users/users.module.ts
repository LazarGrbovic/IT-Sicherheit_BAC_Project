import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout.component';

import { LoginComponent } from './login.component';
import { AddUserComponent} from './add-user.component' 
import { EditUserComponent } from './edit-user.component'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ],
    declarations: [
        LayoutComponent,        
        LoginComponent,
        AddUserComponent,
        EditUserComponent
    ]
})
export class UsersModule { }