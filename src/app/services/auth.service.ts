import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIEndpoint } from '../core/constants/api-endpoint';
import { Constants } from '../core/constants/constant';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // private _userName = signal<string>('');
    public userName: string = '';

    constructor(
        private _httpClient: HttpClient
    ) {}

    // get userName(): any {
    //     return this._userName();
    // }
    // set userName(value: any) {
    //     this._userName.set(value);
    // }

    login$(payload: any): Observable<any> {
        return this._httpClient.post(`${environment.baseUrl}${APIEndpoint.SIGN_IN}`, payload)
        .pipe(
            tap((res: any) => {
                if(res.code === 200) {
                    localStorage.setItem(Constants.AUTH_STORE_KEY, JSON.stringify({ access_token: res.data.token.access_token, refresh_token: res.data.token.refresh_token, userName: res.data.name }));
                }
            }),
            map((res: any) => res),
            catchError(error => {
                return throwError(() => new Error(error));
            })
        );
    }
    
    logOut$(): Observable<any> {
        return this._httpClient.put(`${environment.baseUrl}${APIEndpoint.SIGN_OUT}`, {})
        .pipe(
            tap((res: any) => {
                if(res.code === 200) {
                    localStorage.removeItem(Constants.AUTH_STORE_KEY);
                }
            }),
            map((res: any) => res),
            catchError(error => {
                return throwError(() => new Error(error));
            })
        )
    }

    getUserName(): string {
        return localStorage.getItem(Constants.AUTH_STORE_KEY) ? JSON.parse(localStorage.getItem(Constants.AUTH_STORE_KEY) || '{}').userName : '';
    }
}
