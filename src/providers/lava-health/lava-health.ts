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
  constructor(public http: HttpClient, private health: Health) {}

  getDistance(
    startDate: Date = new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: Date = new Date(),
    bucket: string = "day"
  ) {
    return new Promise((resolve, reject) => {
      this.health
        .queryAggregated({
          startDate: startDate, // 6 days ago
          endDate: endDate, // now
          dataType: "distance",
          bucket: bucket
        })
        .then(successResponse => {
          resolve(successResponse);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getWeekDistance(
    startDate: Date = new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000),
    endDate: Date = new Date(),
    bucket: string = "day"
  ) {
    return new Promise((resolve, reject) => {
      this.health
        .queryAggregated({
          startDate: startDate,
          endDate: endDate,
          dataType: "distance",
          bucket: bucket
        })
        .then(successResponse => {
          resolve(successResponse);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getSteps(
    startDate: Date = new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: Date = new Date(),
    bucket: string = "day"
  ) {
    return new Promise((resolve, reject) => {
      this.health
        .queryAggregated({
          startDate: startDate,
          endDate: endDate,
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

  getStepsParams(days: number) {
    return new Promise((resolve, reject) => {
      this.health
        .queryAggregated({
          startDate: new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000),
          endDate: new Date(),
          bucket: "day",
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
    bucket: string = "day",
    dataType = "steps"
  ) {
    return new Promise((resolve, reject) => {
      this.health
        .queryAggregated({
          startDate: startDate,
          endDate: endDate,
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

}
