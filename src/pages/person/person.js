var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Chart } from "chart.js";
import { WeightLogHistoryPage } from "../weight-log-history/weight-log-history";
import { BodyWeightLogHistoryPage } from "../body-weight-log-history/body-weight-log-history";
import { ProfileProvider } from "../../providers/profile/profile";
/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PersonPage = /** @class */ (function () {
    function PersonPage(navCtrl, navParams, profileProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileProvider = profileProvider;
        this.weightLogHistoryPage = WeightLogHistoryPage;
        this.bodyWeightLogHistoryPage = BodyWeightLogHistoryPage;
    }
    PersonPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad PersonPage");
        this.memberInbodyResults$ = this.profileProvider.getMemberInbodyResults();
        this.memberMeasurements$ = this.profileProvider.getMemberMeasurements();
        this.memberInbodyResults$.subscribe(function (res) { return console.log(res); });
        this.lineChartWeight = new Chart(this.lineCanvasWeight.nativeElement, {
            type: "line",
            data: {
                datasets: [
                    {
                        backgroundColor: ["rgba(34, 195, 204, 0.125)"],
                        borderColor: ["#22c3cc"],
                        borderWidth: 1,
                        data: [100, 20, 150, 30, 0]
                    }
                ]
            },
            options: {
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: "last weight 4 weaks ago",
                    fontSize: 8,
                    color: "#bababa"
                },
                scales: {
                    yAxes: [
                        {
                            display: false
                        }
                    ],
                }
            }
        });
        this.lineChartWeightSub = new Chart(this.lineCanvasWeightSub.nativeElement, {
            type: "line",
            data: {
                datasets: [
                    {
                        backgroundColor: ["rgba(34, 195, 204, 0.125)"],
                        borderColor: ["#22c3cc"],
                        borderWidth: 1,
                        data: [100, 20, 150, 30, 0]
                    }
                ]
            },
            options: {
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                legend: { display: false },
                title: {
                    display: false,
                },
                scales: {
                    yAxes: [
                        {
                            display: false
                        }
                    ]
                }
            }
        });
        this.lineChartSMM = new Chart(this.lineCanvasSMM.nativeElement, {
            type: "line",
            data: {
                datasets: [
                    {
                        backgroundColor: ["rgba(34, 195, 204, 0.125)"],
                        borderColor: ["#22c3cc"],
                        borderWidth: 1,
                        data: [100, 20, 150, 30, 0]
                    }
                ]
            },
            options: {
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                legend: { display: false },
                title: {
                    display: false,
                },
                scales: {
                    yAxes: [
                        {
                            display: false
                        }
                    ]
                }
            }
        });
        this.lineChartPBF = new Chart(this.lineCanvasPBF.nativeElement, {
            type: "line",
            data: {
                datasets: [
                    {
                        backgroundColor: ["rgba(34, 195, 204, 0.125)"],
                        borderColor: ["#22c3cc"],
                        borderWidth: 1,
                        data: [100, 20, 150, 30, 0]
                    }
                ]
            },
            options: {
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                legend: { display: false },
                title: {
                    display: false,
                },
                scales: {
                    yAxes: [
                        {
                            display: false
                        }
                    ]
                }
            }
        });
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
            type: "doughnut",
            data: {
                labels: ["Fats", "Minirals", "Water", "Protein"],
                datasets: [
                    {
                        data: [50, 4, 20, 10],
                        backgroundColor: ["#22c3cc", "#22c3cc", "#65a4ed", "#50e3c2"],
                        hoverBackgroundColor: ["#22c3cc", "#22c3cc", "#65a4ed", "#50e3c2"]
                    }
                ]
            }
        });
    };
    __decorate([
        ViewChild("lineCanvasWeight"),
        __metadata("design:type", Object)
    ], PersonPage.prototype, "lineCanvasWeight", void 0);
    __decorate([
        ViewChild("lineCanvasWeightSub"),
        __metadata("design:type", Object)
    ], PersonPage.prototype, "lineCanvasWeightSub", void 0);
    __decorate([
        ViewChild("lineCanvasSMM"),
        __metadata("design:type", Object)
    ], PersonPage.prototype, "lineCanvasSMM", void 0);
    __decorate([
        ViewChild("lineCanvasPBF"),
        __metadata("design:type", Object)
    ], PersonPage.prototype, "lineCanvasPBF", void 0);
    __decorate([
        ViewChild("doughnutCanvas"),
        __metadata("design:type", Object)
    ], PersonPage.prototype, "doughnutCanvas", void 0);
    PersonPage = __decorate([
        Component({
            selector: "page-person",
            templateUrl: "person.html"
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ProfileProvider])
    ], PersonPage);
    return PersonPage;
}());
export { PersonPage };
//# sourceMappingURL=person.js.map