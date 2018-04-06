import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { Chart } from "chart.js";
import { LavaHealthProvider } from "../../providers/lava-health/lava-health";
/**
 * Generated class for the HeartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-heart",
  templateUrl: "heart.html"
})
export class HeartPage {
  myMonthSteps: any;
  myWeekSteps: any;
  mySteps: any;
  selectedSegment = "workouts";
  selectedOption = "weeks";

  workoutChart = {
    type: "bar",
    weeksData: {
      labels: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      datasets: [
        {
          // label: "My First dataset",
          backgroundColor: ["#18b7c5", "#18b7c5", "#18b7c5", "#18b7c5", "#18b7c5", "#18b7c5", "#18b7c5"],
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
      legend: { display: false },
    }
  };

  stepsChart = {
    type: "line",
    weeksData: {
      labels: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
      legend: { display: false },
    }
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private LavaHealth: LavaHealthProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad HeartPage");
  }


  getSteps() {
    this.LavaHealth.getSteps()
      .then(data => {
        this.mySteps = (data as any).value;
      })
      .catch(error => {});
  }

  getStepsWeek() {
    this.LavaHealth.getStepsParams()
      .then(data => {
        this.myWeekSteps = (data as any).value;
      })
      .catch(error => {});
  }

  getStepsMonth() {
    this.LavaHealth.getStepsParams("month")
      .then(data => {
        this.myMonthSteps = (data as any).value;
      })
      .catch(error => {});
  }
}
