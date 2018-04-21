var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Health } from "@ionic-native/health";
/*
  Generated class for the LavaHealthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LavaHealthProvider = /** @class */ (function () {
    function LavaHealthProvider(http, health) {
        this.http = http;
        this.health = health;
        console.log("Hello LavaHealthProvider Provider");
    }
    LavaHealthProvider.prototype.getActivity = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.health
                .queryAggregated({
                startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
                endDate: new Date(),
                dataType: "activity",
                bucket: "day"
            })
                .then(function (successResponse) {
                resolve(successResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    LavaHealthProvider.prototype.getDistance = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.health
                .queryAggregated({
                startDate: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000),
                endDate: new Date(),
                dataType: "distance",
                bucket: "day"
            })
                .then(function (successResponse) {
                resolve(successResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    LavaHealthProvider.prototype.getSteps = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.health
                .queryAggregated({
                startDate: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000),
                endDate: new Date(),
                dataType: "steps",
                bucket: "day"
            })
                .then(function (successResponse) {
                resolve(successResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    LavaHealthProvider.prototype.getStepsParams = function (bucket) {
        var _this = this;
        if (bucket === void 0) { bucket = "week"; }
        return new Promise(function (resolve, reject) {
            _this.health
                .queryAggregated({
                startDate: new Date(new Date().setHours(0, 0, 0, 0)),
                endDate: new Date(),
                bucket: bucket,
                dataType: "steps"
            })
                .then(function (successResponse) {
                resolve(successResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    LavaHealthProvider.prototype.getStepsPerParams = function (startDate, endDate, bucket, dataType) {
        var _this = this;
        if (startDate === void 0) { startDate = new Date(new Date().setHours(0, 0, 0, 0)); }
        if (endDate === void 0) { endDate = new Date(); }
        if (bucket === void 0) { bucket = "week"; }
        if (dataType === void 0) { dataType = "steps"; }
        return new Promise(function (resolve, reject) {
            _this.health
                .queryAggregated({
                startDate: new Date(new Date().setHours(0, 0, 0, 0)),
                endDate: new Date(),
                bucket: bucket,
                dataType: "steps"
            })
                .then(function (successResponse) {
                resolve(successResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    LavaHealthProvider.prototype.storeSteps = function (stepsData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.health
                .store(stepsData)
                .then(function (successResponse) {
                resolve(successResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    LavaHealthProvider.prototype.getCalories = function (startDate, endDate, bucket) {
        var _this = this;
        if (startDate === void 0) { startDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24); }
        if (endDate === void 0) { endDate = new Date(); }
        if (bucket === void 0) { bucket = "day"; }
        return new Promise(function (resolve, reject) {
            _this.health
                .queryAggregated({
                startDate: startDate,
                endDate: endDate,
                bucket: bucket,
                // filtered: true,
                dataType: "calories"
            })
                .then(function (successResponse) {
                resolve(successResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    LavaHealthProvider.prototype.setCalories = function (caloriesData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.health
                .store(caloriesData)
                .then(function (successResponse) {
                resolve(successResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    LavaHealthProvider.prototype.getCaloriesActive = function (startDate, endDate, bucket) {
        var _this = this;
        if (startDate === void 0) { startDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24); }
        if (endDate === void 0) { endDate = new Date(); }
        if (bucket === void 0) { bucket = "day"; }
        return new Promise(function (resolve, reject) {
            _this.health
                .queryAggregated({
                startDate: startDate,
                endDate: endDate,
                bucket: bucket,
                dataType: "calories.active"
            })
                .then(function (successResponse) {
                resolve(successResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    LavaHealthProvider.prototype.getCaloriesBasal = function (startDate, endDate, bucket) {
        var _this = this;
        if (startDate === void 0) { startDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24); }
        if (endDate === void 0) { endDate = new Date(); }
        if (bucket === void 0) { bucket = "day"; }
        return new Promise(function (resolve, reject) {
            _this.health
                .queryAggregated({
                startDate: startDate,
                endDate: endDate,
                bucket: bucket,
                dataType: "calories.basal"
            })
                .then(function (successResponse) {
                resolve(successResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    LavaHealthProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, Health])
    ], LavaHealthProvider);
    return LavaHealthProvider;
}());
export { LavaHealthProvider };
//# sourceMappingURL=lava-health.js.map