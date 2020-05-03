import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  UrlTree,
} from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { UserFacade } from "../../facades/user.facade";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private userFacade: UserFacade, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
    return this.userFacade.token$.pipe(
      map((token) => {
        if (
          token &&
          next.routeConfig.path !== "signin" &&
          next.routeConfig.path !== "register" &&
          next.routeConfig.path !== "welcome"
        ) {
          return true;
        } else if (
          !token &&
          (next.routeConfig.path === "signin" ||
            next.routeConfig.path === "register" ||
            next.routeConfig.path === "welcome")
        ) {
          return true;
        }

        this.router.navigate(["error"]);
        return false;
      })
    );
  }
}
