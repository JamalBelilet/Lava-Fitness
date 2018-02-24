import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { TabsPage } from '../../pages/tabs/tabs';
import { AlertController } from "ionic-angular";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs/observable";
import { of } from "rxjs/observable/of";

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {
  // baseUrl: "http://lava.sa/api",
  public config = {
    baseUrl: "/api",

    AuthorizationKey: "as@dL8]Rn3$2S!anR",
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      AuthorizationKey: "as@dL8]Rn3$2S!anR"
    }),
    AccessToken: "e48095c6c90209b7a57e194693c1f1ce",
    status: "",
    debug: false
  };

  constructor(public http: HttpClient, private alertCtrl: AlertController) {
    console.log("Hello AuthenticationProvider Provider");
  }

  login(loginForm) {
    if (true) {


      return of({
        status: 1,
        data: {
          AccessToken: "44e7ba83035a6fd4a6c98f8d5039b403"
        }
      });
    }
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      AuthorizationKey: "as@dL8]Rn3$2S!anR"
    });
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };
    return this.http.post(
      `${this.config.baseUrl}/web/user/login`,
      `MobileNumber=${loginForm.MobileNumber}`,
      options
    );
  }


  register(user) {
    if (this.config.debug) {
      return of({
        status: 1,
        data: {
          AccessToken: "accb45021c8be4550dd1e826aad399e0"
        }
      });
    }
    const headers = this.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };
    return this.http.post(
      `${this.config.baseUrl}/web/user/register`,
      JSON.stringify({
        AuthorizationKey: this.config.AuthorizationKey,
        FullName: user.FullName,
        MobileNumber: user.MobileNumber,
        CityID: user.CityID,
        RegionID: user.RegionID,
        Email: user.Email,
        NationalityID: user.NationalityID,
        Language: user.Language,
        BirthDate: user.BirthDate
      }),
      options
    );
  }

  verify(user) {
    if (true) {
      return of({
        status: 1,
        data: {
          AccessToken: "accb45021c8be4550dd1e826aad399e0"
        }
      });
    }
    const headers = this.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };
    return this.http
      .post(
        `${this.config.baseUrl}/web/user/verify-token`,
        JSON.stringify({
          AuthorizationKey: this.config.AuthorizationKey,
          MobileNumber: user.MobileNumber,
          VerificationCode: user.VerificationCode,
          AccessToken: user.AccessToken
        }),
        options
      )
      .pipe(
        switchMap(response => {
          // this.config.AccessToken = (response as any).data.AccessToken;
          return of(response);
        })
      );
  }
}
