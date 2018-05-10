import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Chart } from "chart.js";
import moment from "moment";
import { AuthenticationProvider } from '../../providers/authentication/authentication';

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
  lang;
  @ViewChild("lineCanvas") lineCanvas;
  lineChart: any;

  selectedHistory = 'sixmounths';
  memberInbodyResults = [];
  selectedC;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthenticationProvider) {
    this.lang = this.authProvider.config.lang;

    this.memberInbodyResults = navParams.data.dataC;
    this.selectedC = navParams.data.selectedC;

    this.memberInbodyResults = this.memberInbodyResults.map(meus => {
      meus.CreationDate = moment(meus.CreationDate).format("MM/DD/YYYY");
      return meus;
    })
  }

  ionViewDidLoad() {

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        datasets: [
          {
            backgroundColor: ["rgba(34, 195, 204, 0)"],
            borderColor: ["#22c3cc"],
            borderWidth: 3.5,
            data: this.memberInbodyResults.map(d => d[this.selectedC]).reverse()
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
