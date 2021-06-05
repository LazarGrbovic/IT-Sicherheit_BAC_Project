import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '@environments/environment';
import { DTOUserModel, DTOUserModelJustId, DTOUserModelWithID } from '../../../../sharedFolder/dto-user.model';
import { Token } from '../../../../sharedFolder/token';
import {ChangeUserRequest} from '../../../../sharedFolder/changeUserRequest'

const baseUrl = `${environment.apiUrl}/user`;

@Injectable({ providedIn: 'root' })
export class UserService {

    private token : Token;
    public UserData!: DTOUserModelJustId | null;

    constructor(private http: HttpClient, private router: Router) {
        this.token = new Token("", "");
      }

    // getAll() {
    //     return this.http.get<DTOUserModel[]>(baseUrl);
    // }
    
    getIdByUsername(username: string) {
        return this.http.get<DTOUserModelJustId>(`${baseUrl}/username/${username}`);
    }

    login(params: any) {
        // http://choly.ca/post/typescript-json/
        return this.http.post(`${baseUrl}/login`, params);
    }

    create(params: any) {
        return this.http.post(`${baseUrl}/add`, params);
    }

    update(id: string, username: string, passwordhash : string) {
        let request = new ChangeUserRequest(this.token, username, passwordhash);
        return this.http.put(`${baseUrl}/${id}`, request);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    logout() {
        this.UserData = null;
        this.router.navigate(['home']);
        console.log(this.UserData);
        this.token = new Token("", "");
    }

    storeToken(token : Token){
        this.token = token;
    }

    retrieveToken() : Token{
        return this.token;
    }
}