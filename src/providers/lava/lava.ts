import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationProvider } from "../authentication/authentication";
import { of } from "rxjs/observable/of";
/*
  Generated class for the LavaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LavaProvider {
  private headers;
  constructor(
    public http: HttpClient,
    private authProvider: AuthenticationProvider
  ) {
    console.log("Hello LavaProvider Provider");
    this.headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      AuthorizationKey: this.authProvider.config.AuthorizationKey,
      AccessToken: this.authProvider.config.AccessToken
    });
  }

  getExerciseSchedules(date: Date) {
    if (this.authProvider.config.debug) {
      return of({
        status: 1,
        data: {
          ID: "2410",
          Date: "2018-02-11 14:00:00",
          BranchID: "4",
          BranchName: "\u0645\u062e\u0631\u062c 5",
          ExerciseID: "7",
          ExerciseTitle: "jhkhk",
          CoachID: "103",
          CoachName: "fjfj",
          Duration: "45",
          Capacity: "20",
          ReservationCount: "0"
        }
      });
    }
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/exercise/index?AccessToken=${
        this.authProvider.config.AccessToken
      }&BranchID=1&Year=2018&Month=02&Day=11`,
      { headers: this.authProvider.config.headers }
    );
  }

  getExerciseReservations() {
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/exercise/view?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  updateReservation(updatedUser) {
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
      `${this.authProvider.config.baseUrl}/web/exercise/update`,
      JSON.stringify({
        ID: "1286",
        Canceled: "1"
      }),
      options
    );
  }

  reserveExercise(exerciseC) {
    const headers = this.authProvider.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };

    console.log(JSON.stringify({
      AccessToken: this.authProvider.config.AccessToken,
      ExerciseScheduleID: exerciseC.Exercise.ExerciseScheduleID
    }))

    return this.http.post(
      `${this.authProvider.config.baseUrl}/web/exercise/reserve`,
      JSON.stringify({
        AccessToken: this.authProvider.config.AccessToken,
        ExerciseScheduleID: exerciseC.Exercise.ExerciseScheduleID
      }),
      options
    );
  }

  getAllMassageReservations() {
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/messager/index?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  getMassageReservations() {
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/massage/view?AccessToken=${
        this.authProvider.config.AccessToken
      }`,
      { headers: this.authProvider.config.headers }
    );
  }

  reserveMassageSession(ServiceC) {
    const headers = this.authProvider.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };

    console.log(JSON.stringify({
      AccessToken: this.authProvider.config.AccessToken,
      ServiceID: ServiceC.Service.ServiceID,
      BranchID: ServiceC.Service.BranchID,
      MassagerID: ServiceC.Service.MassagerID,
      Date: ServiceC.Service.Date
    }));
    return this.http.post(
      `${this.authProvider.config.baseUrl}/web/massage/reserve`,
      JSON.stringify({
        AccessToken: this.authProvider.config.AccessToken,
        ServiceID: ServiceC.Service.ServiceID,
        BranchID: ServiceC.Service.BranchID,
        MassagerID: ServiceC.Service.MassagerID,
        Date: ServiceC.Service.Date
      }),
      options
    );
  }
}
