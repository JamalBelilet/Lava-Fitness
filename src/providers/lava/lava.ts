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
      `${this.authProvider.config.baseUrl}/web/exercise/index?AccessToken=${this.authProvider.config.AccessToken}&BranchID=1&Year=2018&Month=02&Day=11`, {headers: this.authProvider.config.headers}
    );
  }

  getExerciseReservations() {

    if (this.authProvider.config.debug) {
      return of({
        status: 1,
        data: [
          {
            ID: 1286,
            ExerciseScheduleID: 2079,
            CreationDate: "2018-02-18 16:27:46"
          },
          {
            ID: 65,
            ExerciseScheduleID: 1303,
            CreationDate: "2018-01-03 15:35:42"
          }
        ]
      });
    }
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/exercise/view?AccessToken=${this.authProvider.config.AccessToken}`, {headers: this.authProvider.config.headers}
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

  reserveExercise(updatedUser) {

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
      `${this.authProvider.config.baseUrl}/web/exercise/reserve`,
      JSON.stringify({
        ExerciseScheduleID: "2087"
      }),
      options
    );
  }

  getAllMassageReservations() {
    if (this.authProvider.config.debug) {
      return of({
        status: 1,
        data: [
          {
            ID: "179",
            Date: "2018-02-15 16:05:00",
            BranchID: "4",
            BranchName: "\u0645\u062e\u0631\u062c 5",
            MassagerID: "83",
            MassagerName:
              "\u0641\u0627\u0637\u0645\u0629\u0635\u0644\u0627\u062d"
          }
        ]
      });
    }
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/messager/index?AccessToken=${this.authProvider.config.AccessToken}`, {headers: this.authProvider.config.headers}
    );
  }

  getMassageReservations() {
    if (this.authProvider.config.debug) {
      return of({
        status: 1,
        data: [
          {
            ID: "179",
            Date: "2018-02-15 16:05:00",
            ServiceID: "4",
            ServiceName:
              "\u0633\u0627\u0639\u0629\u0648\u0627\u062d\u062f\u0629 \u0645\u0633\u0627\u062c\u0633\u0648\u064a\u062f\u064a - \u0627\u0644\u062c\u0633\u0645\u0643\u0627\u0645\u0644",
            BranchID: "4",
            BranchName: "\u0645\u062e\u0631\u062c 5",
            MassagerID: "83",
            MassagerName:
              "\u0641\u0627\u0637\u0645\u0629\u0635\u0644\u0627\u062d",
            CreationDate: "2018-02-14 16:09:20"
          }
        ]
      });
    }
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/messager/view?AccessToken=${this.authProvider.config.AccessToken}`, {headers: this.authProvider.config.headers}
    );
  }

  reserveMassageSession(updatedUser) {
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
      `${this.authProvider.config.baseUrl}/web/massage/reserve`,
      JSON.stringify({
        ServiceID: "4",
        BranchID: "1",
        MassagerID: "83",
        Date: "2018-02-19 16:05:00"
      }),
      options
    );
  }
}
