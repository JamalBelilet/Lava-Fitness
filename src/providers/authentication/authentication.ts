import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { TabsPage } from '../../pages/tabs/tabs';
// import { of } from "rxjs/observable/of";

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {
  // baseUrl: "http://lava.sa/api",
  public config = {
    lang : "rtl",

    baseUrl: "http://lava.sa/api",

    AuthorizationKey: "as@dL8]Rn3$2S!anR",
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      AuthorizationKey: "as@dL8]Rn3$2S!anR"
    }),
    AccessToken: "dc2494305d1023c7b7be37dfe9e2b418",
    status: "",
    debug: false
  };

  constructor(public http: HttpClient) {
  }

  login(user) {
    const headers = this.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };
    if(user.MobileNumber.toString().substr(0, 3) != 966) {
      if (user.MobileNumber.toString().substr(0, 1) == 0) {
        user.MobileNumber = "966" + user.MobileNumber.toString().substr(1,);
      }
    }
    return this.http.post(
      `${this.config.baseUrl}/web/user/login`,
      JSON.stringify({
        MobileNumber: user.MobileNumber,
      }),
      options
    );
  }


  register(user) {
    const headers = this.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };
    if(user.MobileNumber.toString().substr(0, 3) != 966) {
      if (user.MobileNumber.toString().substr(0, 1) == 0) {
        user.MobileNumber = "966" + user.MobileNumber.toString().substr(1,);
      }
    }
    return this.http.post(
      `${this.config.baseUrl}/web/user/register`,
      JSON.stringify({
        AuthorizationKey: this.config.AuthorizationKey,
        FullName: user.FullName,
        MobileNumber: user.MobileNumber,
        CityID: 1,
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
    const headers = this.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };
    if(user.MobileNumber.toString().substr(0, 3) != 966) {
      if (user.MobileNumber.toString().substr(0, 1) == 0) {
        user.MobileNumber = "966" + user.MobileNumber.toString().substr(1,);
      }
    }
    return this.http
      .post(
        `${this.config.baseUrl}/web/user/verify-token`,
        JSON.stringify({
          AuthorizationKey: this.config.AuthorizationKey,
          MobileNumber: user.MobileNumber,
          VerificationCode: user.VerifyNumber,
          AccessToken: this.config.AccessToken
        }),
        options
      )
  }
}
