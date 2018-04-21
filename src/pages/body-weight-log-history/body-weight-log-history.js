var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from "chart.js";
/**
 * Generated class for the BodyWeightLogHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BodyWeightLogHistoryPage = /** @class */ (function () {
    function BodyWeightLogHistoryPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.selectedHistory = 'arms';
    }
    BodyWeightLogHistoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WeightLogHistoryPage');
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: "line",
            data: {
                datasets: [
                    {
                        backgroundColor: ["rgba(34, 195, 204, 0)"],
                        borderColor: ["#22c3cc"],
                        borderWidth: 3.5,
                        data: [100, 50, 150, 30, 50]
                    }
                ]
            },
            options: {
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
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
                    ],
                    xAxes: [
                        {
                            display: true
                        }
                    ]
                }
            }
        });
    };
    __decorate([
        ViewChild("lineCanvas"),
        __metadata("design:type", Object)
    ], BodyWeightLogHistoryPage.prototype, "lineCanvas", void 0);
    BodyWeightLogHistoryPage = __decorate([
        Component({
            selector: 'page-body-weight-log-history',
            templateUrl: 'body-weight-log-history.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], BodyWeightLogHistoryPage);
    return BodyWeightLogHistoryPage;
}());
export { BodyWeightLogHistoryPage };
//# sourceMappingURL=body-weight-log-history.js.map