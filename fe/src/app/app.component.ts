import { Component, VERSION } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { AlertService } from '@app/_services/alert.service';
import { UserService } from "@app/_services/user.service";
import { first } from 'rxjs/operators';
import { DTOUserModelJustId } from "../../../sharedFolder/dto-user.model"

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent { 

    userId!: DTOUserModelJustId;
    public username!: string;
    public showLogout:boolean = false;
    version = VERSION.full;
    dialogRef!: any;
    constructor(public dialog: MatDialog, private alertService: AlertService, private userService: UserService) {} 
  
  openDialog(): void { 
    this.dialogRef = this.dialog.open(DialogComponent, { 
      width: '450px',       
    });
  }

  enableLogout(username: string) {

    this.showLogout = true;
    this.username = username;
    this.userService.getIdByUsername(this.username)
            .pipe(first())
            .subscribe(id => this.userId = id);
               
    // if (confirm(`Logged in! ID: ${this.userId.id}`)) {
      
    // }              
  }

  hideLogout() {
    if (confirm("Do you want to log out?")) {      
      this.alertService.info("You are logged out now");  
      this.showLogout = false;
      this.username = "";
    }  
  }

}