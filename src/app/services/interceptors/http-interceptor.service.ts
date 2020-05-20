import { Injectable } from "@angular/core";
import { AuthService } from "../user/auth.service";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.getToken() !== null) {
      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json",
          Authorization: "JWT " + this.authService.getToken().token,
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json",
          Authorization: "No JWT Token provided",
        },
      });
    }

    return next.handle(request);
  }
}
