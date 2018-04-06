import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Health } from "@ionic-native/health";

/*
  Generated class for the LavaHealthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LavaHealthProvider {
  constructor(public http: HttpClient, private health: Health) {
    console.log("Hello LavaHealthProvider Provider");
  }

  getActivity() {
    return new Promise((resolve, reject) => {
      this.health
        .queryAggregated({
          startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
          endDate: new Date(), // now
          dataType: "activity",
          bucket: "day"
        })
        .then(successResponse => {
          resolve(successResponse);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getSteps() {
    return new Promise((resolve, reject) => {
      this.health
        .queryAggregated({
          startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // three days ago
          endDate: new Date(), // now
          dataType: "steps",
          bucket: "day"
        })
        .then(successResponse => {
          resolve(successResponse);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getStepsParams(bucket: string = "week") {
    return new Promise((resolve, reject) => {
      this.health
        .queryAggregated({
          startDate: new Date(new Date().setHours(0, 0, 0, 0)),
          endDate: new Date(),
          bucket: bucket,
          dataType: "steps"
        })
        .then(successResponse => {
          resolve(successResponse);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  getStepsPerParams(
    startDate = new Date(new Date().setHours(0, 0, 0, 0)),
    endDate = new Date(),
    bucket: string = "week",
    dataType = "steps"
  ) {
    return new Promise((resolve, reject) => {
      this.health
        .queryAggregated({
          startDate: new Date(new Date().setHours(0, 0, 0, 0)),
          endDate: new Date(),
          bucket: bucket,
          dataType: "steps"
        })
        .then(successResponse => {
          resolve(successResponse);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  storeSteps(stepsData: any) {
    return new Promise((resolve, reject) => {
      this.health
        .store(stepsData)
        .then(successResponse => {
          resolve(successResponse);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getCalories(
    startDate: Date = new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    endDate: Date = new Date(),
    bucket: string = "day"
  ) {
    return new Promise((resolve, reject) => {
      this.health
        .queryAggregated({
          startDate: startDate,
          endDate: endDate,
          bucket: bucket,
          // filtered: true,
          dataType: "calories"
        })
        .then(successResponse => {
          resolve(successResponse);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  setCalories(caloriesData: any) {
    return new Promise((resolve, reject) => {
      this.health
        .store(caloriesData)
        .then(successResponse => {
          resolve(successResponse);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getCaloriesActive(
    startDate: Date = new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    endDate: Date = new Date(),
    bucket: string = "day"
  ) {
    return new Promise((resolve, reject) => {
      this.health
        .queryAggregated({
          startDate: startDate,
          endDate: endDate,
          bucket: bucket,
          dataType: "calories.active"
        })
        .then(successResponse => {
          resolve(successResponse);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getCaloriesBasal(
    startDate: Date = new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    endDate: Date = new Date(),
    bucket: string = "day"
  ) {
    return new Promise((resolve, reject) => {
      this.health
        .queryAggregated({
          startDate: startDate,
          endDate: endDate,
          bucket: bucket,
          dataType: "calories.basal"
        })
        .then(successResponse => {
          resolve(successResponse);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
