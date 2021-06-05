import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '@environments/environment';
import { DTOUserModel, DTOUserModelJustId, DTOUserModelWithID } from '../../../../sharedFolder/dto-user.model';

const baseUrl = `${environment.apiUrl}/user`;

@Injectable({ providedIn: 'root' })
export class UserService {


    public UserData!: DTOUserModelJustId | null;
   
    constructor(private http: HttpClient, private router: Router) { }

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

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    logout() {
        this.UserData = null;
        this.router.navigate(['home']);
        console.log(this.UserData);
    }
}