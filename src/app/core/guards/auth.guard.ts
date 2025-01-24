import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constants } from '../constants/constant';
import { SessionService } from '../services/session.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const sessionService = inject(SessionService);
    const router = inject(Router);

    return sessionService.isLoggedIn().pipe(
        map(loggedIn =>
            loggedIn
                ? true
                : router.createUrlTree([router.parseUrl(Constants.LOGIN_ROUTE)], {
                      queryParams: { origUrl: state.url }
                  })
        ),
        catchError(err => {
            router.navigate([Constants.LOGIN_ROUTE], {
                queryParams: { origUrl: state.url }
            });
            return of(false);
        })
    );
};
