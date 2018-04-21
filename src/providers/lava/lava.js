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
import { AuthenticationProvider } from "../authentication/authentication";
import { of } from "rxjs/observable/of";
/*
  Generated class for the LavaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LavaProvider = /** @class */ (function () {
    function LavaProvider(http, authProvider) {
        this.http = http;
        this.authProvider = authProvider;
        console.log("Hello LavaProvider Provider");
        this.headers = new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
            AuthorizationKey: this.authProvider.config.AuthorizationKey,
            AccessToken: this.authProvider.config.AccessToken
        });
    }
    LavaProvider.prototype.getExerciseSchedules = function (date) {
        if (date === void 0) { date = new Date(); }
        var day = date.getDay() > 9 ? date.getDay() : "0" + date.getDay();
        var month = date.getMonth() > 9 ? date.getMonth() : "0" + date.getMonth();
        return this.http.get(this.authProvider.config.baseUrl + "/web/exercise/index?AccessToken=" + this.authProvider.config.AccessToken + "&BranchID=1&Year=" + date.getFullYear() + "&Month=" + month + "&Day=" + day + "&Type=0", { headers: this.authProvider.config.headers });
    };
    LavaProvider.prototype.getExerciseReservations = function () {
        return this.http.get(this.authProvider.config.baseUrl + "/web/exercise/view?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    LavaProvider.prototype.updateReservation = function (updatedUser) {
        if (this.authProvider.config.debug) {
            return of({
                status: 1,
                data: {
                    AccessToken: "accb45021c8be4550dd1e826aad388f0"
                }
            });
        }
        var headers = this.authProvider.config.headers;
        var params = new HttpParams();
        var options = {
            headers: headers,
            params: params,
            withCredentials: true
        };
        return this.http.post(this.authProvider.config.baseUrl + "/web/exercise/update", JSON.stringify({
            ID: "1286",
            Canceled: "1"
        }), options);
    };
    LavaProvider.prototype.reserveExercise = function (exerciseC) {
        var headers = this.authProvider.config.headers;
        var params = new HttpParams();
        var options = {
            headers: headers,
            params: params,
            withCredentials: true
        };
        console.log(JSON.stringify({
            AccessToken: this.authProvider.config.AccessToken,
            ExerciseScheduleID: exerciseC.Exercise.ExerciseScheduleID
        }));
        return this.http.post(this.authProvider.config.baseUrl + "/web/exercise/reserve", JSON.stringify({
            AccessToken: this.authProvider.config.AccessToken,
            ExerciseScheduleID: exerciseC.Exercise.ExerciseScheduleID
        }), options);
    };
    LavaProvider.prototype.getAllMassageReservations = function () {
        return this.http.get(this.authProvider.config.baseUrl + "/web/}/massage/index?AccessToken=" + this.authProvider.config.AccessToken + "&BranchID=1&Year=2018&Month=02&Day=18&MassagerID=83", { headers: this.authProvider.config.headers });
    };
    LavaProvider.prototype.getMassageReservations = function () {
        return this.http.get(this.authProvider.config.baseUrl + "/web/massage/view?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    LavaProvider.prototype.reserveMassageSession = function (ServiceC) {
        var headers = this.authProvider.config.headers;
        var params = new HttpParams();
        var options = {
            headers: headers,
            params: params,
            withCredentials: true
        };
        console.log(JSON.stringify({
            AccessToken: this.authProvider.config.AccessToken,
            ServiceID: ServiceC.Service.ServiceID,
            BranchID: ServiceC.Service.BranchID,
            MassagerID: ServiceC.Service.MassagerID,
            Date: ServiceC.Service.Date
        }));
        return this.http.post(this.authProvider.config.baseUrl + "/web/massage/reserve", JSON.stringify({
            AccessToken: this.authProvider.config.AccessToken,
            ServiceID: ServiceC.Service.ServiceID,
            BranchID: ServiceC.Service.BranchID,
            MassagerID: ServiceC.Service.MassagerID,
            Date: ServiceC.Service.Date
        }), options);
    };
    LavaProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            AuthenticationProvider])
    ], LavaProvider);
    return LavaProvider;
}());
export { LavaProvider };
//# sourceMappingURL=lava.js.map