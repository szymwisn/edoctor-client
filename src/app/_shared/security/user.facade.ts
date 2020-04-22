import { Injectable } from "@angular/core";
import { DecodedToken } from "./models/token.model";
import { User } from "./models/user.model";
import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { SigninForm } from "./models/form/signin-form.model";
import { RegisterForm } from "./models/form/register-form.model";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { ChangeSettingsForm } from "./models/form/change-settings-form.model";

class State {
  token: DecodedToken = null;
  profile: User = null;
}

@Injectable()
export class UserFacade {
  private state = new State();
  state$ = new BehaviorSubject<State>(this.state);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.getToken()) {
      const token = this.authService.getToken();
      const decodedToken: DecodedToken = this.authService.decodeToken(token);
      this.state$.next({ ...this.state, token: decodedToken });
      this.router.navigate(["profile"]);
    }
  }

  signin(form: SigninForm) {
    this.authService.signIn(form).subscribe(
      (token) => {
        this.authService.storeToken(token);
        const decodedToken: DecodedToken = this.authService.decodeToken(token);
        this.state$.next({ ...this.state, token: decodedToken });
        this.router.navigate(["profile"]);
      },
      (error) => {
        // TODO: show error notification
        console.log("Failed to signin", error);
      }
    );
  }

  register(form: RegisterForm) {
    this.authService.register(form).subscribe((success) => {
      this.router.navigate(["signin"]);
      //TODO: show success notification
      console.log("Account successfully created");
    });
  }

  signout() {
    this.authService.removeToken();
    this.state$.next({ profile: null, token: null });
    this.router.navigate(["welcome"]);
    //TODO: show success notification
    console.log("User successfully logged out");
  }

  getProfile() {
    this.userService.fetchUser(this.state.token.userId).subscribe(
      (profile) => this.state$.next({ ...this.state, profile }),
      (error) => {
        //TODO: show error notification
        console.log("Problem with server connection", error);
      }
    );
  }

  changeSettings(form: ChangeSettingsForm) {
    this.userService.changeSettings(this.state.token.userId, form).subscribe(
      (success) => {
        //TODO: show success notification
        console.log("Settings successfully changed");
      },
      (error) => {
        //TODO: show error notification
        console.log("Problem with server connection", error);
      }
    );
  }
}
