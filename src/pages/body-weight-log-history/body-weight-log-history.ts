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

@Component({
  selector: 'page-body-weight-log-history',
  templateUrl: 'body-weight-log-history.html',
})
export class BodyWeightLogHistoryPage {

  @ViewChild("lineCanvas") lineCanvas;
  lineChart: any;

  selectedHistory = 'Chest';

  memberMeasurements = []
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.memberMeasurements = navParams.data;
    console.log('hello fof', this.memberMeasurements);

    this.memberMeasurements = this.memberMeasurements.map(meus => {
      meus.CreationDate = moment(meus.CreationDate).format("MM/DD/YYYY");
      return meus;
    })
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
