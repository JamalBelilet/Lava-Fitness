import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Chart } from "chart.js";

/**
 * Generated class for the WeightLogHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-weight-log-history',
  templateUrl: 'weight-log-history.html',
})
export class WeightLogHistoryPage {

  @ViewChild("lineCanvas") lineCanvas;
  lineChart: any;

  selectedHistory = 'sixmounths';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
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
  }

}
