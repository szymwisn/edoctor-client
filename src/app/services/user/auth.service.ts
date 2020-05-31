import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as jwtDecode from "jwt-decode";
import { SigninForm } from "../../models/form/signin-form.model";
import { RegisterForm } from "../../models/form/register-form.model";
import { Observable } from "rxjs";
import { Token, DecodedToken } from "../../models/user/token.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(form: SigninForm): Observable<Token> {
    return this.http.post<Token>("/api/signin", form);
  }

  register(form: RegisterForm) {
    return this.http.post("api/register", form);
  }

  decodeToken(token: Token): DecodedToken {
    const t = jwtDecode(token.token);

    const decodedToken: DecodedToken = {
      userId: t.user_id,
      exp: t.exp,
      iat: t.orig_iat,
    };

    return decodedToken;
  }

  refreshToken(token: Token) {
    return this.http.post<Token>("api/token-refresh", token.token);
  }

  storeToken(token: Token) {
    // TODO: change to cookies
    localStorage.setItem("token", token.token);
  }

  getToken(): Token {
    // TODO: change to cookies
    const value = localStorage.getItem("token");

    if (value !== null) {
      return { token: value } as Token;
    }

    return null;
  }

  removeToken() {
    // TODO: change to cookies
    localStorage.removeItem("token");
  }
}
