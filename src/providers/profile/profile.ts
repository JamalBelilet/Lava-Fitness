import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationProvider } from "../authentication/authentication";

@Injectable()
export class ProfileProvider {
  localProfile: any;

  private headers;

  constructor(
    public http: HttpClient,
    private authProvider: AuthenticationProvider
  ) {

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
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/city/index?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getRegions() {
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
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/job-title/index?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getNationalities() {
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
