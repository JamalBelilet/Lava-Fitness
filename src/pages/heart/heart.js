var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { LavaHealthProvider } from "../../providers/lava-health/lava-health";
import { Health } from "@ionic-native/health";
/**
 * Generated class for the HeartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HeartPage = /** @class */ (function () {
    function HeartPage(navCtrl, navParams, LavaHealth, health) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.LavaHealth = LavaHealth;
        this.health = health;
        this.stepsPerWeek = [];
        this.selectedSegment = "workouts";
        this.selectedOption = "weeks";
        this.workoutChart = {
            type: "bar",
            weeksData: {
                labels: [
                    "Saturday",
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                datasets: [
                    {
                        // label: "My First dataset",
                        backgroundColor: [
                            "#18b7c5",
                            "#18b7c5",
                            "#18b7c5",
                            "#18b7c5",
                            "#18b7c5",
                            "#18b7c5",
                            "#18b7c5"
                        ],
                        borderColor: ["#22c3cc"],
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            },
            monthsData: {
                labels: ["1wk", "2wk", "3wk", "4wk"],
                datasets: [
                    {
                        // label: "My First dataset",
                        backgroundColor: ["#18b7c5", "#18b7c5", "#18b7c5", "#18b7c5"],
                        borderColor: ["#22c3cc"],
                        data: [65, 59, 80, 81]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: { display: false }
            }
        };
        this.stepsChart = {
            type: "line",
            weeksData: {
                labels: [
                    "Saturday",
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                datasets: [
                    {
                        // label: "My First dataset",
                        backgroundColor: ["rgba(34, 195, 204, 0.125)"],
                        borderColor: ["#22c3cc"],
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            },
            monthsData: {
                labels: ["1wk", "2wk", "3wk", "4wk"],
                datasets: [
                    {
                        // label: "My First dataset",
                        backgroundColor: ["rgba(34, 195, 204, 0.125)"],
                        borderColor: ["#22c3cc"],
                        data: [65, 59, 80, 81]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: { display: false }
            }
        };
    }
    HeartPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log("ionViewDidLoad HeartPage");
        this.health
            .isAvailable()
            .then(function (available) {
            console.log(available);
            _this.health
                .requestAuthorization([
                {
                    read: ["steps"] //read only permission
                }
            ])
                .then(function (res) {
                _this.getSteps();
                _this.getStepsWeek();
                _this.getStepsMonth();
                _this.getStepsPerWeek();
                _this.getStepsPerDay();
            })
                .catch(function (e) { });
        })
            .catch(function (e) { });
    };
    HeartPage.prototype.getSteps = function () {
        var _this = this;
        this.LavaHealth.getSteps()
            .then(function (data) {
            _this.mySteps = data.value;
        })
            .catch(function (error) { });
    };
    HeartPage.prototype.getStepsWeek = function () {
        var _this = this;
        this.LavaHealth.getStepsParams()
            .then(function (data) {
            _this.myWeekSteps = data.value;
        })
            .catch(function (error) { });
    };
    HeartPage.prototype.getStepsMonth = function () {
        var _this = this;
        this.LavaHealth.getStepsParams("month")
            .then(function (data) {
            _this.myMonthSteps = data.value;
        })
            .catch(function (error) { });
    };
    HeartPage.prototype.getStepsPerWeek = function () {
        var _this = this;
        this.stepsChart.monthsData.labels = [];
        this.stepsChart.monthsData.datasets = [];
        [
            {
                label: "1wk",
                startDate: new Date(new Date().getTime() - 4 * 7 * 24 * 60 * 60 * 1000),
                endDate: new Date(new Date().getTime() - 3 * 7 * 24 * 60 * 60 * 1000)
            },
            {
                label: "2wk",
                startDate: new Date(new Date().getTime() - 3 * 7 * 24 * 60 * 60 * 1000),
                endDate: new Date(new Date().getTime() - 2 * 7 * 24 * 60 * 60 * 1000)
            },
            {
                label: "3wk",
                startDate: new Date(new Date().getTime() - 2 * 7 * 24 * 60 * 60 * 1000),
                endDate: new Date(new Date().getTime() - 1 * 7 * 24 * 60 * 60 * 1000)
            },
            {
                label: "4wk",
                startDate: new Date(new Date().getTime() - 1 * 7 * 24 * 60 * 60 * 1000),
                endDate: new Date()
            }
        ].forEach(function (week) {
            _this.LavaHealth.getStepsPerParams(week.startDate, week.endDate, "week", "steps")
                .then(function (data) {
                _this.stepsChart.monthsData.labels.push(week.label);
                _this.stepsChart.monthsData.datasets[0].data.push(data.value);
            })
                .catch(function (error) { });
        });
    };
    HeartPage.prototype.getStepsPerDay = function () {
        var _this = this;
        this.stepsChart.weeksData.labels = [];
        this.stepsChart.weeksData.datasets = [];
        [
            {
                label: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000).getDay,
                startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
                endDate: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)
            },
            {
                label: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).getDay,
                startDate: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000),
                endDate: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000)
            },
            {
                label: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000).getDay,
                startDate: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
                endDate: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000)
            },
            {
                label: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000).getDay,
                startDate: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000),
                endDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
            },
            {
                label: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).getDay,
                startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
                endDate: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                label: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).getDay,
                startDate: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
                endDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                label: new Date().getDay,
                startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
                endDate: new Date()
            }
        ].forEach(function (day) {
            _this.LavaHealth.getStepsPerParams(day.startDate, day.endDate, "day", "steps")
                .then(function (data) {
                _this.stepsChart.weeksData.labels.push(day.label);
                _this.stepsChart.weeksData.datasets[0].data.push(data.value);
            })
                .catch(function (error) { });
        });
    };
    HeartPage = __decorate([
        Component({
            selector: "page-heart",
            templateUrl: "heart.html"
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LavaHealthProvider,
            Health])
    ], HeartPage);
    return HeartPage;
}());
export { HeartPage };
//# sourceMappingURL=heart.js.map