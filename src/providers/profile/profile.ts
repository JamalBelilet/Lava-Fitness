import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationProvider } from "../authentication/authentication";
import { of } from "rxjs/observable/of";

@Injectable()
export class ProfileProvider {
  localProfile: any;
  private profile = {
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

  private headers;

  constructor(
    public http: HttpClient,
    private authProvider: AuthenticationProvider
  ) {
    console.log("Hello ProfileProvider Provider");


    this.headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      AuthorizationKey: this.authProvider.config.AuthorizationKey,
      AccessToken: this.authProvider.config.AccessToken
    });
  }

  getProfile() {
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/user/profile?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getCities() {
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
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/city/index?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getRegions() {
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
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/region/index?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getBranches() {


    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/branch/index?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getJobTitles() {
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
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/job-title/index?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getNationalities() {
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
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/nationality/index?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getServices() {
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/service/index?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getMemberMeasurements() {
    return this.http.get(
      `${
        this.authProvider.config.baseUrl
      }/web/training/measurements?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getMemberInbodyResults() {


    return this.http.get(
      `${
        this.authProvider.config.baseUrl
      }/web/training/inbody-results?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getMembership() {
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/membership/index?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getMemberPrograms() {
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/cardio/programs?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  updateUser(updatedUser) {
    if (this.authProvider.config.debug) {
      return of({
        status: 1,
        data: {
          AccessToken: "accb45021c8be4550dd1e826aad388f0"
        }
      });
    }
    const headers = this.authProvider.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };
    return this.http.post(
      `${this.authProvider.config.baseUrl}/web/user/update`,
      JSON.stringify({
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
      }),
      options
    );
  }

  getTrainers() {
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
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/traner/index?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getClasses() {
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/class/index?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getMassagers(BranchID) {
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/massager/index?AccessToken=${
        this.authProvider.config.AccessToken
      }&BranchID=${BranchID}`,
      { headers: this.authProvider.config.headers }
    );
  }


  finishProgram(ProgramID) {
    const headers = this.authProvider.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };
    return this.http.post(
      `${this.authProvider.config.baseUrl}/web/cardio/finish-program`,
      JSON.stringify({
        AccessToken: this.authProvider.config.AccessToken,
        ProgramID: ProgramID
      }),
      options
    );
  }

  evaluateProgram(ProgramID, Level) {
    const headers = this.authProvider.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };
    return this.http.post(
      `${this.authProvider.config.baseUrl}/web/cardio/evaluate-program`,
      JSON.stringify({
        AccessToken: this.authProvider.config.AccessToken,
        ProgramID: ProgramID,
        Level: Level
      }),
      options
    );
  }
}
