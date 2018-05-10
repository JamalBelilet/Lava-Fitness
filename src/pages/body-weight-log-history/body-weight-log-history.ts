import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from "chart.js";
/**
 * Generated class for the BodyWeightLogHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import moment from "moment";
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'page-body-weight-log-history',
  templateUrl: 'body-weight-log-history.html',
})
export class BodyWeightLogHistoryPage {

  lang: string;
  @ViewChild("lineCanvas") lineCanvas;
  lineChart: any;

  selectedHistory = 'Chest';

  memberMeasurements = []
  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthenticationProvider) {
    this.lang = this.authProvider.config.lang;
    this.memberMeasurements = navParams.data;

    this.memberMeasurements = this.memberMeasurements.map(meus => {
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
            data: this.memberMeasurements.map(d => d.Chest).reverse()
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

  onSegmentChange() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        datasets: [
          {
            backgroundColor: ["rgba(34, 195, 204, 0)"],
            borderColor: ["#22c3cc"],
            borderWidth: 3.5,
            data: this.memberMeasurements.map(d => d[this.selectedHistory]).reverse()
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
