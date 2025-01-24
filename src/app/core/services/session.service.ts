import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

import { Constants } from '../constants/constant';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private _userInfo = signal({
        role: '',
        menu_json: [],
        name: '',
        userId: ''
    });
    loading = signal(false);
    private _moduleInfoSubject = new BehaviorSubject<any>({});
    readonly moduleInfo$ = this._moduleInfoSubject.asObservable();

    constructor() {}

    get isLoading(): any {
        return this.loading();
    }

    get userInfo(): any {
        return this._userInfo();
    }

    get currentUserRole(): string {
        return this._userInfo()?.role;
    }

    set moduleInfo(value: any) {
        this._moduleInfoSubject.next(value);
    }

    isLoggedIn(): any {
        return of(!!this.getJwtToken());
    }

    getJwtToken(): string {
        let token = JSON.parse(localStorage.getItem(Constants.AUTH_STORE_KEY) || '{}');
        return token.access_token || '';
    }
}

export interface ModuleInfo {
    moduleKey: '';
    moduleShortName: '';
    moduleNameEn: '';
    moduleNameBn: '';
    moduleIcon: '';
}
