import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { Chart } from "chart.js";
/**
 * Generated class for the HeartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-heart',
  templateUrl: 'heart.html',
})
export class HeartPage {
  selectedSegment = 'workouts';
  selectedOption = 'weeks';

  @ViewChild("lineCanvas") lineCanvas;

  lineChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeartPage');

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["7/1", "7/1", "7/1", "7/1"],

        datasets: [
          {
            backgroundColor: ["#18b7c5", "#18b7c5", "#18b7c5", "#18b7c5"],
            borderColor: ["#22c3cc"],
            borderWidth: 1,
            data: [100, 20, 150, 30]
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
          text: "last weight 4 weaks ago",
          fontSize: 8,
          color: "#bababa"
        },
        scales: {
          yAxes: [
            {
              display: true
            }
          ]
        }
      }
    });
  }

}
