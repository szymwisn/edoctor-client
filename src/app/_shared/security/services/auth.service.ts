import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as jwtDecode from "jwt-decode";
import { SigninForm } from "../models/form/signin-form.model";
import { RegisterForm } from "../models/form/register-form.model";
import { Observable, of } from "rxjs";
import { Token, DecodedToken } from "../models/token.model";

const tempToken: Token = {
  value:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
};

const tempDecodedToken: DecodedToken = {
  exp: 3600,
  iat: new Date().getTime(),
  userId: "5ea099512e74d85412886174",
};

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(form: SigninForm): Observable<Token> {
    // return this.http.post<Token>("api/signin", form);
    return of(tempToken);
  }

  register(form: RegisterForm) {
    return this.http.post("api/register", form);
  }

  decodeToken(token: Token): DecodedToken {
    // return jwtDecode(token.value) as DecodedToken;
    return tempDecodedToken;
  }

  refreshToken(token: Token) {
    return this.http.post<Token>("api/token-refresh", token.value);
  }

  storeToken(token: Token) {
    // TODO: change to cookies
    localStorage.setItem("token", token.value);
  }

  getToken(): Token {
    // TODO: change to cookies
    const value = localStorage.getItem("token");

    if (value !== null) {
      return { value } as Token;
    }

    return null;
  }

  removeToken() {
    // TODO: change to cookies
    localStorage.removeItem("token");
  }
}
