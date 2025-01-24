import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

import { environment } from '../../../environments/environment';
// import { NzNotificationService } from 'ng-zorro-antd/notification';

import { APIEndpoint } from '../constants/api-endpoint';
import { HttpStatus } from '../constants/constant';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(
        private _httpClient: HttpClient,
        // private _notification: NzNotificationService
    ) {}

    private _headers = new HttpHeaders({
        accept: 'application/json'
    });

    get<T>(apiUrl: string, isNotify: boolean = true, params?: any): any {
        return this._httpClient.get<T>(`${environment.baseUrl}${apiUrl}`, { params: params, headers: this._headers, observe: 'response' });
    }

    post(apiUrl: string, body: any, isNotify: boolean = true, params?: any): any {
        return this._httpClient.post(`${environment.baseUrl}${apiUrl}`, body, { params: params, headers: this._headers, observe: 'response' });
    }

    put(apiUrl: string, body: any, isNotify: boolean = true): any {
        return this._httpClient.put(`${environment.baseUrl}${apiUrl}`, body, { headers: this._headers, observe: 'response' });
    }

    getFile(fileName: string, dirName: string, params?: any): any {
        return this._httpClient.get(`${environment.baseUrl}${APIEndpoint.DOWNLOAD}/${dirName}/${fileName}`, { params: params, headers: this._headers, responseType: 'blob', observe: 'response' });
    }

    downloadFile$(fileName: string, dirName: string): Observable<any> {
        return this._httpClient.get(`${environment.baseUrl + APIEndpoint.DOWNLOAD}/${dirName}/${fileName}`, {
            responseType: 'blob',
            observe: 'response',
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    uploadFile(formData: any): any {
        let headers: HttpHeaders = new HttpHeaders();
        let withCredentials = false;
        if (environment.production) {
            headers = new HttpHeaders();
            withCredentials = true;
        }
        return this._httpClient.post(`${environment.baseUrl}${APIEndpoint.UPLOAD}`, formData, { reportProgress: true, observe: 'events', withCredentials: withCredentials, headers });
    }

    deleteFile$(fileName: string, dirName: string): Observable<any> {
        return this._httpClient.post(`${environment.baseUrl + APIEndpoint.DELETE}/${dirName}/${fileName}`, {
            reportProgress: true,
            observe: 'events',
            withCredentials: true
        });
    }

    fakeDelete$(): any {
        return of({ success: true }).pipe(delay(100));
    }

    // traceRes(isNotify: boolean = true) {
    //     return <T>(source$: Observable<T>): Observable<T> => {
    //         return new Observable(sub => {
    //             const subscription = source$.subscribe({
    //                 next: (res: any) => {
    //                     if (HttpStatus.SUCCESS.includes(res?.body?.code)) {
    //                         isNotify && this._notification.success('Success', res?.body?.message);
    //                     } else if (HttpStatus.INFO.includes(res?.body?.code)) {
    //                         isNotify && this._notification.info('Info', res?.body?.message);
    //                     } else if (HttpStatus.WARN.includes(res?.body?.code)) {
    //                         isNotify && this._notification.warning('Warning', res?.body?.message);
    //                     } else if (HttpStatus.ERROR.includes(res?.body?.code)) {
    //                         isNotify && this._notification.error('Error', res?.body?.message);
    //                     }
    //                     sub.next(res);
    //                 },
    //                 error: error => {
    //                     this._notification.error('Error!', error?.error?.message || error?.message);
    //                     sub.error(error);
    //                 },
    //                 complete: () => {
    //                     sub.complete();
    //                 }
    //             });
    //             return () => subscription.unsubscribe();
    //         });
    //     };
    // }
}
