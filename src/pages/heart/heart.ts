import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { Chart } from "chart.js";
import { LavaHealthProvider } from "../../providers/lava-health/lava-health";
import { Health } from "@ionic-native/health";
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
  stepsPerWeek = [];

  myMonthSteps: any;
  myWeekSteps: any;
  mySteps: any;
  selectedSegment = "workouts";
  selectedOption = "weeks";

  workoutChart = {
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

  stepsChart = {
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private LavaHealth: LavaHealthProvider,
    private health: Health
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad HeartPage");

    this.health
      .isAvailable()
      .then((available: boolean) => {
        console.log(available);
        this.health
          .requestAuthorization([
            {
              read: ["steps"] //read only permission
            }
          ])
          .then(res => {
            this.getSteps();
            this.getStepsWeek();
            this.getStepsMonth();
            this.getStepsPerWeek();
            this.getStepsPerDay();
          })
          .catch(e => {});
      })
      .catch(e => {});
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

  getStepsPerWeek() {
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
    ].forEach(week => {
      this.LavaHealth.getStepsPerParams(
        week.startDate,
        week.endDate,
        "week",
        "steps"
      )
        .then(data => {
          this.stepsChart.monthsData.labels.push(week.label);
          this.stepsChart.monthsData.datasets[0].data.push((data as any).value);
        })
        .catch(error => {});
    });
  }
  getStepsPerDay() {
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
    ].forEach(day => {
      this.LavaHealth.getStepsPerParams(
        day.startDate,
        day.endDate,
        "day",
        "steps"
      )
        .then(data => {
          this.stepsChart.weeksData.labels.push((day as any).label);
          this.stepsChart.weeksData.datasets[0].data.push((data as any).value);
        })
        .catch(error => {});
    });
  }
}
