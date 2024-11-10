import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private _http: HttpClient ,private location : Location, private _activatedRoute : ActivatedRoute) { }

    getSlots () : Observable<any> {
        return this._http.get(`${environment.STUDENT_SLOT}${
           this.getRoute()
        }`);
    }
    getRoute() {
        let route = location.pathname.split('/');
        console.log( environment.STUDENT_SLOT + route[route.length - 1].toString())
       return route[route.length - 1].toString()
    }
}