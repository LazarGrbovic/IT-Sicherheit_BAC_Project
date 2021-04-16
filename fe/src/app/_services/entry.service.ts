import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { DTOUserModel } from '../../../../sharedFolder/dto-user.model';
import { DTOSpeedTest, DTOSpeedTestWithID} from '../../../../sharedFolder/dto-speedtest';

const baseUrl = `${environment.apiUrl}/speedtestdata`;

@Injectable({ providedIn: 'root' })
export class EntryService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<DTOSpeedTestWithID[]>(baseUrl);
    }

    getSortedEntries(column: string, ascDescOption: string) {
        return this.http.get<DTOSpeedTestWithID[]>(`${baseUrl}/?sortByColumn=${column}&ascDesc=${ascDescOption}`);
    }

    getById(id: string) {
        return this.http.get<DTOSpeedTestWithID>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id:string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    // delete(id: string) {
    //     return this.http.delete(`${baseUrl}/${id}`);
    // }
}