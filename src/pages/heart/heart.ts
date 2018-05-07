import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { Chart } from "chart.js";
import { LavaHealthProvider } from "../../providers/lava-health/lava-health";
import { Health } from "@ionic-native/health";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationProvider } from "../../providers/authentication/authentication";
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
  lang
  stepsPerWeek = [];

  myMonthSteps: any;
  myWeekSteps: any;
  mySteps: any;

  myWeekDistance: any;
  myDistance: any;

  selectedSegment = "workouts";
  selectedOption = "weeks";

  workoutChart;
  stepsChart;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private LavaHealth: LavaHealthProvider,
    private health: Health,
    private translate: TranslateService,
    private authProfider: AuthenticationProvider
  ) {
    this.lang = this.authProfider.config.lang;
    translate.get("week-days").subscribe((translated: string) => {
      this.workoutChart = {
        type: "bar",
        weeksData: {
          labels: [
            translated["weeksData"]["Saturday"],
            translated["weeksData"]["Sunday"],
            translated["weeksData"]["Monday"],
            translated["weeksData"]["Tuesday"],
            translated["weeksData"]["Wednesday"],
            translated["weeksData"]["Thursday"],
            translated["weeksData"]["Friday"]
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
          labels: [
            translated["monthsData"]["1wk"],
            translated["monthsData"]["2wk"],
            translated["monthsData"]["3wk"],
            translated["monthsData"]["4wk"]
          ],
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

      this.stepsChart = {
        type: "line",
        weeksData: {
          labels: [
            translated["weeksData"]["Saturday"],
            translated["weeksData"]["Sunday"],
            translated["weeksData"]["Monday"],
            translated["weeksData"]["Tuesday"],
            translated["weeksData"]["Wednesday"],
            translated["weeksData"]["Thursday"],
            translated["weeksData"]["Friday"]
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
          labels: [
            translated["monthsData"]["1wk"],
            translated["monthsData"]["2wk"],
            translated["monthsData"]["3wk"],
            translated["monthsData"]["4wk"]
          ],
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
    });
  }

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
            this.getDistance();
            this.getWeekDistance();
          })
          .catch(e => {});
      })
      .catch(e => {});
  }

  getDistance() {
    this.LavaHealth.getDistance()
      .then(data => {
        this.myDistance = (data as any).value;
      })
      .catch(error => {});
  }

  getWeekDistance() {
    this.LavaHealth.getWeekDistance()
      .then(data => {
        this.myWeekDistance = (data as any).value;
      })
      .catch(error => {});
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
        label: new Date(
          new Date().getTime() - 6 * 24 * 60 * 60 * 1000
        ).getDay(),
        startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(
          new Date().getTime() - 5 * 24 * 60 * 60 * 1000
        ).getDay(),
        startDate: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000),
        endDate: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(
          new Date().getTime() - 4 * 24 * 60 * 60 * 1000
        ).getDay(),
        startDate: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
        endDate: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(
          new Date().getTime() - 3 * 24 * 60 * 60 * 1000
        ).getDay(),
        startDate: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000),
        endDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(
          new Date().getTime() - 2 * 24 * 60 * 60 * 1000
        ).getDay(),
        startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
        endDate: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(
          new Date().getTime() - 1 * 24 * 60 * 60 * 1000
        ).getDay(),
        startDate: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
        endDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date().getDay(),
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
