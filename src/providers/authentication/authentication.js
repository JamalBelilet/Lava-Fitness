var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthenticationProvider = /** @class */ (function () {
    function AuthenticationProvider(http) {
        this.http = http;
        // baseUrl: "http://lava.sa/api",
        this.config = {
            baseUrl: "/api",
            AuthorizationKey: "as@dL8]Rn3$2S!anR",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                AuthorizationKey: "as@dL8]Rn3$2S!anR"
            }),
            AccessToken: "dc2494305d1023c7b7be37dfe9e2b418",
            status: "",
            debug: false
        };
        console.log("Hello AuthenticationProvider Provider");
    }
    AuthenticationProvider.prototype.login = function (user) {
        var headers = this.config.headers;
        var params = new HttpParams();
        var options = {
            headers: headers,
            params: params,
            withCredentials: true
        };
        if (user.MobileNumber.toString().substr(0, 3) != 966) {
            if (user.MobileNumber.toString().substr(0, 1) == 0) {
                user.MobileNumber = "966" + user.MobileNumber.toString().substr(1);
            }
        }
        return this.http.post(this.config.baseUrl + "/web/user/login", JSON.stringify({
            MobileNumber: user.MobileNumber,
        }), options);
    };
    AuthenticationProvider.prototype.register = function (user) {
        var headers = this.config.headers;
        var params = new HttpParams();
        var options = {
            headers: headers,
            params: params,
            withCredentials: true
        };
        if (user.MobileNumber.toString().substr(0, 3) != 966) {
            if (user.MobileNumber.toString().substr(0, 1) == 0) {
                user.MobileNumber = "966" + user.MobileNumber.toString().substr(1);
            }
        }
        return this.http.post(this.config.baseUrl + "/web/user/register", JSON.stringify({
            AuthorizationKey: this.config.AuthorizationKey,
            FullName: user.FullName,
            MobileNumber: user.MobileNumber,
            CityID: 1,
            RegionID: user.RegionID,
            Email: user.Email,
            NationalityID: user.NationalityID,
            Language: user.Language,
            BirthDate: user.BirthDate
        }), options);
    };
    AuthenticationProvider.prototype.verify = function (user) {
        var headers = this.config.headers;
        var params = new HttpParams();
        var options = {
            headers: headers,
            params: params,
            withCredentials: true
        };
        if (user.MobileNumber.toString().substr(0, 3) != 966) {
            if (user.MobileNumber.toString().substr(0, 1) == 0) {
                user.MobileNumber = "966" + user.MobileNumber.toString().substr(1);
            }
        }
        console.log('verify user', user);
        return this.http
            .post(this.config.baseUrl + "/web/user/verify-token", JSON.stringify({
            AuthorizationKey: this.config.AuthorizationKey,
            MobileNumber: user.MobileNumber,
            VerificationCode: user.VerifyNumber,
            AccessToken: this.config.AccessToken
        }), options);
    };
    AuthenticationProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], AuthenticationProvider);
    return AuthenticationProvider;
}());
export { AuthenticationProvider };
//# sourceMappingURL=authentication.js.map