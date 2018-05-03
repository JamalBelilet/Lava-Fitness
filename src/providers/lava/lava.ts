import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationProvider } from "../authentication/authentication";
import { of } from "rxjs/observable/of";
import moment from "moment";

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

  getExerciseSchedules(branchID, dateC, monthC, year) {
    const date = dateC > 9 ? dateC : "0" + dateC;
    const month = monthC > 9 ? monthC : "0" + monthC;

    console.log(
      `${this.authProvider.config.baseUrl}/web/exercise/index?AccessToken=${
        this.authProvider.config.AccessToken
      }&BranchID=${branchID}&Year=${year}&Month=${month}&Day=${date}&Type=0`
    );

    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/exercise/index?AccessToken=${
        this.authProvider.config.AccessToken
      }&BranchID=${branchID}&Year=${year}&Month=${month}&Day=${date}&Type=0`,
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

  updateExerciseReservation(exerciseID) {
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
        ID: exerciseID,
        Canceled: "1",
        AccessToken: this.authProvider.config.AccessToken,
      }),
      options
    );
  }

  updateServiceReservation(massageID) {
    const headers = this.authProvider.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };
    return this.http.post(
      `${this.authProvider.config.baseUrl}/web/massage/update`,
      JSON.stringify({
        ID: massageID,
        Canceled: "1",
        AccessToken: this.authProvider.config.AccessToken,
      }),
      options
    );
  }

  reserveExercise(ExerciseScheduleIDC) {
    const headers = this.authProvider.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };

    console.log(
      JSON.stringify({
        AccessToken: this.authProvider.config.AccessToken,
        ExerciseScheduleID: ExerciseScheduleIDC
      })
    );

    return this.http.post(
      `${this.authProvider.config.baseUrl}/web/exercise/reserve`,
      JSON.stringify({
        AccessToken: this.authProvider.config.AccessToken,
        ExerciseScheduleID: ExerciseScheduleIDC
      }),
      options
    );
  }

  // const date = dateC > 9 ? dateC : "0" + dateC;
  //   const month = monthC > 9 ? monthC : "0" + monthC;

  //   console.log(`${this.authProvider.config.baseUrl}/web/exercise/index?AccessToken=${
  //     this.authProvider.config.AccessToken
  //   }&BranchID=1&Year=${year}&Month=${month}&Day=${date}&Type=0`)

  //   return this.http.get(
  //     `${this.authProvider.config.baseUrl}/web/exercise/index?AccessToken=${
  //       this.authProvider.config.AccessToken
  //     }&BranchID=1&Year=${year}&Month=${month}&Day=${date}&Type=0`,
  //     { headers: this.authProvider.config.headers }
  //   );
  getAllMassageReservations(BranchID, MassagerID, dateC, monthC, year) {
    const date = dateC > 9 ? dateC : "0" + dateC;
    const month = monthC > 9 ? monthC : "0" + monthC;
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/massage/index?AccessToken=${
        this.authProvider.config.AccessToken
      }&BranchID=${BranchID}&Year=${year}&Month=${month}&Day=${date}&MassagerID=${MassagerID}&Type=0`,
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

    console.log(
      JSON.stringify({
        AccessToken: this.authProvider.config.AccessToken,
        ServiceID: ServiceC.ServiceID,
        BranchID: ServiceC.BranchID,
        MassagerID: ServiceC.MassagerID,
        Date: moment(ServiceC.Date).locale("en")
      })
    );
    return this.http.post(
      `${this.authProvider.config.baseUrl}/web/massage/reserve`,
      JSON.stringify({
        AccessToken: this.authProvider.config.AccessToken,
        ServiceID: ServiceC.ServiceID,
        BranchID: ServiceC.BranchID,
        MassagerID: ServiceC.MassagerID,
        Date: moment(ServiceC.Date).locale("en")
      }),
      options
    );
  }

  getMemberReadouts(ProgramID) {
    return this.http.get(
      `${this.authProvider.config.baseUrl}/web/cardio/readout?AccessToken=${
        this.authProvider.config.AccessToken
      }&ProgramID=${ProgramID}`,
      { headers: this.authProvider.config.headers }
    );
  }

  addCardioReadout(exercise, workoutID) {
    const headers = this.authProvider.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };

    return this.http.post(
      `${this.authProvider.config.baseUrl}/web/cardio/add-cardio-readout`,
      JSON.stringify({
        AccessToken: this.authProvider.config.AccessToken,
        EquipmentID: exercise.Equipment.ID,
        ProgramID: workoutID,
        Duration: exercise.Duration,
        Speed: exercise.Speed,
        Level: exercise.Level,
        HeartRate: exercise.HeartRate
      }),
      options
    );
  }

  addBoddyBuildingReadout(exercise, workoutID) {
    const headers = this.authProvider.config.headers;
    const params = new HttpParams();
    const options = {
      headers,
      params,
      withCredentials: true
    };

    return this.http.post(
      `${this.authProvider.config.baseUrl}/web/cardio/add-bodybuilding-readout`,
      JSON.stringify({
        AccessToken: this.authProvider.config.AccessToken,
        EquipmentID: exercise.Equipment.ID,
        ProgramID: workoutID,
        Duration: exercise.Duration,
        Repetition: exercise.Repetition,
        NumberOfRepetition: exercise.NumberOfRepetition,
        Calories: exercise.Calories
      }),
      options
    );
  }
}
