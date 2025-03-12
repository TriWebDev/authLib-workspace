import { HttpInterceptorFn } from '@angular/common/http';

export const AUTH_INTERCEPTOR: HttpInterceptorFn = (req, next) => {
    /* Now using the localStorage as the way to store user info */
    const token = localStorage.getItem('token');

    const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

    return next(authReq);
};
