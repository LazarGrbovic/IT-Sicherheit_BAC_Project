import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DialogComponent } from './dialog.component'; 
import { DialogModule } from './dialog.module'; 

import { ChartsModule } from 'ng2-charts';


// used to create fake backend
// import { fakeBackendProvider } from './_helpers/fake-backend';

import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components/alert.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,        
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,        
        DialogModule,
        CommonModule,
        MatButtonModule,
        MatCommonModule,
        MatFormFieldModule,
        MatInputModule,
        ChartsModule        
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        
        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };