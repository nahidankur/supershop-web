import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private _stnLoading = signal(false);
    private _btnLoading = signal(false);
    private _tableDataLoading = signal(false);

    set isSkeletonLoading(value: boolean) {
        if (value) this._stnLoading.set(value);
        else {
            setTimeout(() => {
                this._stnLoading.set(value);
            }, 300);
        }
    }

    get isSkeletonLoading(): boolean {
        return this._stnLoading();
    }

    set isButtonLoading(value: boolean) {
        this._btnLoading.set(value);
    }

    get isButtonLoading(): boolean {
        return this._btnLoading();
    }

    set isTableDataLoading(value: boolean) {
        this._tableDataLoading.set(value);
    }

    get isTableDataLoading(): boolean {
        return this._tableDataLoading();
    }
}
