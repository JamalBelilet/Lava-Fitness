import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { Chart } from "chart.js";
import { WeightLogHistoryPage } from "../weight-log-history/weight-log-history";
import { BodyWeightLogHistoryPage } from "../body-weight-log-history/body-weight-log-history";

/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-person",
  templateUrl: "person.html"
})
export class PersonPage {
  @ViewChild("lineCanvas") lineCanvas;
  @ViewChild("lineCanvas1") lineCanvas1;
  @ViewChild("doughnutCanvas") doughnutCanvas;

  lineChart: any;
  lineChart1: any;
  doughnutChart: any;

  weightLogHistoryPage = WeightLogHistoryPage;
  bodyWeightLogHistoryPage = BodyWeightLogHistoryPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad PersonPage");


    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
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

    this.lineChart1 = new Chart(this.lineCanvas1.nativeElement, {
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
  }
}
