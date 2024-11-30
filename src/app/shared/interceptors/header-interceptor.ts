import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AppCookieService } from "../services/utils/cookie/app-cookie.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    // Inject the current `AuthService` and use it to get an authentication token:
    const cookie = inject(AppCookieService);
    // Clone the request to add the authentication header.
    const newReq = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + cookie.get('token') as string),
    });
    return next(newReq);
}