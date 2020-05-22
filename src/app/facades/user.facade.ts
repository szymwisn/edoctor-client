import { Injectable } from "@angular/core";
import { DecodedToken } from "../models/user/token.model";
import { User } from "../models/user/user.model";
import { UserService } from "../services/user/user.service";
import { AuthService } from "../services/user/auth.service";
import { SigninForm } from "../models/form/signin-form.model";
import { RegisterForm } from "../models/form/register-form.model";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { ChangeSettingsForm } from "../models/form/change-settings-form.model";
import { map, take } from "rxjs/operators";
import { NotificationService } from "../services/utils/notification.service";
import { LoadingService } from "../services/utils/loading.service";

class State {
  token: DecodedToken = null;
  profile: User = {
    name: null,
    email: null,
    age: null,
    bloodType: null,
    height: null,
    mass: null,
    sex: null,
  };
}

@Injectable({ providedIn: "root" })
export class UserFacade {
  private state = new State();
  state$ = new BehaviorSubject<State>(this.state);

  token$: Observable<DecodedToken> = this.state$.pipe(
    map((state) => state.token)
  );
  profile$: Observable<User> = this.state$.pipe(map((state) => state.profile));

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    const token = this.authService.getToken();

    if (token) {
      const decodedToken: DecodedToken = this.authService.decodeToken(token);
      this.state$.next((this.state = { ...this.state, token: decodedToken }));
      this.getProfile();
    }
  }

  signin(form: SigninForm) {
    this.loadingService.start();
    this.authService
      .signIn(form)
      .pipe(take(1))
      .subscribe(
        (token) => {
          console.log(token);
          this.authService.storeToken(token);
          const decodedToken: DecodedToken = this.authService.decodeToken(
            token
          );
          this.state$.next(
            (this.state = { ...this.state, token: decodedToken })
          );
          this.getProfile();
          this.router.navigate(["profile"]);
        },
        (error) => {
          this.loadingService.stop();
          this.notificationService.addNotification("Failed to signin", 3000);
        },
        () => {
          this.loadingService.stop();
        }
      );
  }

  register(form: RegisterForm) {
    this.loadingService.start();
    this.authService
      .register(form)
      .pipe(take(1))
      .subscribe(
        (success) => {
          this.router.navigate(["signin"]);
          this.notificationService.addNotification(
            "Account successfully created",
            3000
          );
        },
        (error) => {
          this.loadingService.stop();
          this.notificationService.addNotification(
            "Problem with server connection"
          );
        },
        () => {
          this.loadingService.stop();
        }
      );
  }

  signout() {
    this.authService.removeToken();
    this.state$.next(
      (this.state = { ...this.state, profile: null, token: null })
    );
    this.router.navigate(["welcome"]);
  }

  changeSettings(form: ChangeSettingsForm) {
    this.loadingService.start();
    this.userService
      .changeSettings(this.state.token.userId, form)
      .pipe(take(1))
      .subscribe(
        (success) => {
          this.notificationService.addNotification("Settings changed", 3000);
          this.getProfile();
        },
        (error) => {
          this.loadingService.stop();
          this.notificationService.addNotification(
            "Problem with server connection"
          );
        },
        () => {
          this.loadingService.stop();
        }
      );
  }

  getProfile() {
    this.loadingService.start();
    this.userService
      .fetchUser(this.state.token.userId)
      .pipe(take(1))
      .subscribe(
        (profile) => {
          this.state$.next((this.state = { ...this.state, profile }));
        },
        (error) => {
          this.loadingService.stop();
          this.notificationService.addNotification(
            "Problem with server connection"
          );
        },
        () => {
          this.loadingService.stop();
        }
      );
  }
}
