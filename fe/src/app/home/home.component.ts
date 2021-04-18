import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/_services/user.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit  {
    public loggedIn:boolean;

    constructor(
        private userService: UserService) {
            this.loggedIn = false;
        }
 
        ngOnInit(): void {
            if(this.userService.UserData!=null){
                this.loggedIn = true;
            }
        }
       }