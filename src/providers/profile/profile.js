var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationProvider } from "../authentication/authentication";
import { of } from "rxjs/observable/of";
var ProfileProvider = /** @class */ (function () {
    function ProfileProvider(http, authProvider) {
        this.http = http;
        this.authProvider = authProvider;
        this.profile = {
            status: 1,
            data: {
                FullName: "asdfad",
                IdentityID: 123456789,
                SocialStatus: 1,
                Address: "",
                BirthDate: "1993-04-22",
                CityName: "الریاض",
                RegionName: "الجزیرة",
                MobileNumber: "966*********",
                Language: "AR",
                Email: "aaaaa@gmail.com",
                NationalityID: 1
            }
        };
        console.log("Hello ProfileProvider Provider");
        this.headers = new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
            AuthorizationKey: this.authProvider.config.AuthorizationKey,
            AccessToken: this.authProvider.config.AccessToken
        });
    }
    ProfileProvider.prototype.getProfile = function () {
        return this.http.get(this.authProvider.config.baseUrl + "/web/user/profile?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.getCities = function () {
        console.log("getCities" + this.authProvider.config.debug);
        if (this.authProvider.config.debug) {
            return of({
                status: 1,
                data: [
                    {
                        ID: 1,
                        NameAR: "\u0627\u0644\u0631\u064a\u0627\u0636",
                        NameEN: "Riyadh"
                    }
                ]
            });
        }
        return this.http.get(this.authProvider.config.baseUrl + "/web/city/index?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.getRegions = function () {
        if (this.authProvider.config.debug) {
            return of({
                status: 1,
                data: [
                    {
                        ID: 1,
                        NameAR: "العلیا",
                        NameEN: "Al Olya",
                        CityID: 1
                    },
                    {
                        ID: 2,
                        NameAR: "السلیمانیة",
                        NameEN: "Al Solimania",
                        CityID: 1
                    }
                ]
            });
        }
        return this.http.get(this.authProvider.config.baseUrl + "/web/region/index?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.getBranches = function () {
        return this.http.get(this.authProvider.config.baseUrl + "/web/branch/index?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.getJobTitles = function () {
        if (this.authProvider.config.debug) {
            return of({
                status: 1,
                data: [
                    {
                        ID: 1,
                        TitleAR: "بدون عمل",
                        TitleEN: "Jobless"
                    },
                    {
                        ID: 2,
                        TitleAR: "طبیبة",
                        TitleEN: "Doctor"
                    }
                ]
            });
        }
        return this.http.get(this.authProvider.config.baseUrl + "/web/job-title/index?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.getNationalities = function () {
        if (this.authProvider.config.debug) {
            return of({
                status: 1,
                data: [
                    {
                        ID: 1,
                        NameAR: "السعودیة",
                        NameEN: "Saudi Arabia"
                    },
                    {
                        ID: 2,
                        NameAR: "الاردن",
                        NameEN: "Jordan"
                    }
                ]
            });
        }
        return this.http.get(this.authProvider.config.baseUrl + "/web/nationality/index?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.getServices = function () {
        return this.http.get(this.authProvider.config.baseUrl + "/web/service/index?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.getMemberMeasurements = function () {
        return this.http.get(this.authProvider.config.baseUrl + "/web/training/measurements?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.getMemberInbodyResults = function () {
        return this.http.get(this.authProvider.config.baseUrl + "/web/training/inbody-results?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.getMembership = function () {
        return this.http.get(this.authProvider.config.baseUrl + "/web/membership/index?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.getMemberPrograms = function () {
        return this.http.get(this.authProvider.config.baseUrl + "/web/cardio/programs?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.updateUser = function (updatedUser) {
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
        return this.http.post(this.authProvider.config.baseUrl + "/web/user/update", JSON.stringify({
            AuthorizationKey: this.authProvider.config.AuthorizationKey,
            AccessToken: this.authProvider.config.AccessToken,
            FullName: updatedUser.FullName,
            MobileNumber: updatedUser.MobileNumber,
            CityID: updatedUser.CityID,
            RegionID: updatedUser.RegionID,
            Email: updatedUser.Email,
            NationalityID: updatedUser.NationalityID,
            Language: updatedUser.Language,
            BirthDate: updatedUser.BirthDate
        }), options);
    };
    ProfileProvider.prototype.getTrainers = function () {
        if (this.authProvider.config.debug) {
            return of({
                status: 1,
                data: [
                    {
                        ID: 22,
                        FullName: "عالیة فاطمة",
                        FullNameEN: "Alia Fatima"
                    },
                    {
                        ID: 40,
                        FullName: "نعمت الصباغ",
                        FullNameEN: "Neimat Alsabbagh"
                    }
                ]
            });
        }
        return this.http.get(this.authProvider.config.baseUrl + "/web/traner/index?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.getClasses = function () {
        return this.http.get(this.authProvider.config.baseUrl + "/web/class/index?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.getMassagers = function () {
        if (this.authProvider.config.debug) {
            return of({
                status: 1,
                data: [
                    {
                        ID: 83,
                        FullName: "\u0641\u0627\u0637\u0645\u0629\u0635\u0644\u0627\u062d",
                        FullNameEN: "Fatima Salah"
                    },
                    {
                        ID: 84,
                        FullName: "\u0645\u0627\u064a\u0627\u0644\u0633\u0627\u0646\u062a\u0631\u0627",
                        FullNameEN: "May Alcantra"
                    }
                ]
            });
        }
        return this.http.get(this.authProvider.config.baseUrl + "/web/messager/index?AccessToken=" + this.authProvider.config.AccessToken, { headers: this.authProvider.config.headers });
    };
    ProfileProvider.prototype.finishProgram = function (ProgramID) {
        var headers = this.authProvider.config.headers;
        var params = new HttpParams();
        var options = {
            headers: headers,
            params: params,
            withCredentials: true
        };
        return this.http.post(this.authProvider.config.baseUrl + "/web/cardio/finish-program", JSON.stringify({
            AccessToken: this.authProvider.config.AccessToken,
            ProgramID: ProgramID
        }), options);
    };
    ProfileProvider.prototype.evaluateProgram = function (ProgramID, Level) {
        var headers = this.authProvider.config.headers;
        var params = new HttpParams();
        var options = {
            headers: headers,
            params: params,
            withCredentials: true
        };
        return this.http.post(this.authProvider.config.baseUrl + "/web/cardio/evaluate-program", JSON.stringify({
            AccessToken: this.authProvider.config.AccessToken,
            ProgramID: ProgramID,
            Level: Level
        }), options);
    };
    ProfileProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            AuthenticationProvider])
    ], ProfileProvider);
    return ProfileProvider;
}());
export { ProfileProvider };
//# sourceMappingURL=profile.js.map