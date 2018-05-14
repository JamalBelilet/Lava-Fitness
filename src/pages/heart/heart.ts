import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

// import { Chart } from "chart.js";
import { LavaHealthProvider } from "../../providers/lava-health/lava-health";
import { Health } from "@ionic-native/health";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationProvider } from "../../providers/authentication/authentication";
import { LavaProvider } from "../../providers/lava/lava";
import { ProfileProvider } from "../../providers/profile/profile";
import { map } from "rxjs/operators";
// import { Observable } from "rxjs/Observable";

import moment from "moment";
import { ChartComponent } from "angular2-chartjs";

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
  avg: number;
  thisMonthReadoutsCounts: any = 0;
  thisWeekReadoutsCounts: any = 0;
  memberReadouts;

  todayReadouts = [];
  todayReadoutsExos = [];
  thisWeekReadouts = [];
  thisMonthReadouts = [];

  lang;
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

  _readouts = [];

  @ViewChild("workoutChartDays") workoutChartDays: ChartComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private LavaHealth: LavaHealthProvider,
    private health: Health,
    private translate: TranslateService,
    private authProfider: AuthenticationProvider,
    private lavaProvider: LavaProvider,
    private profileProvider: ProfileProvider
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
              data: [0, 0, 0, 0, 0, 0, 0]
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
              data: [0, 0, 0, 0]
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
              data: [0, 0, 0, 0, 0, 0, 0]
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
              data: [0, 0, 0, 0]
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
    this.health
      .isAvailable()
      .then((available: boolean) => {
        this.health
          .requestAuthorization([
            "distance",
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

    this.profileProvider
      .getMemberPrograms()
      .pipe(
        map(value => {
          let array = (value as any).data;
          function* values(obj) {
            for (let prop of Object.keys(obj)) yield obj[prop];
          }
          return Array.from(values(array));
        })
      )
      .pipe(
        map(workouts => {
          return workouts.map(workout => {
            return this.lavaProvider
              .getMemberReadouts((workout as any).ID)
              .pipe(map(readouts => (readouts as any).data))
              .subscribe(readouts => {
                let todayReadouts = Object.assign({}, readouts);
                // let thisWeekReadouts = Object.assign({}, readouts);
                // let thisMonthReadouts = Object.assign({}, readouts);

                todayReadouts.Bodybuilding =
                  (!readouts.Bodybuilding && []) ||
                  readouts.Bodybuilding.filter(
                    exo => moment(exo.CreationDate) >= moment()
                  );
                todayReadouts.Cardio =
                  (!readouts.Cardio && []) ||
                  readouts.Cardio.filter(
                    exo => moment(exo.CreationDate) >= moment()
                  );

                // thisWeekReadouts.Bodybuilding =
                //   (!readouts.Bodybuilding && []) ||
                //   readouts.Bodybuilding.filter(
                //     exo =>
                //       moment(exo.CreationDate) >= moment().subtract(7, "days")
                //   );
                // thisWeekReadouts.Cardio =
                //   (!readouts.Cardio && []) ||
                //   readouts.Cardio.filter(
                //     exo =>
                //       moment(exo.CreationDate) >= moment().subtract(7, "days")
                //   );

                // thisMonthReadouts.Bodybuilding =
                //   (!readouts.Bodybuilding && []) ||
                //   readouts.Bodybuilding.filter(
                //     exo => moment(exo.CreationDate).month() == moment().month()
                //   );
                // thisMonthReadouts.Cardio =
                //   (!readouts.Cardio && []) ||
                //   readouts.Cardio.filter(
                //     exo => moment(exo.CreationDate).month() == moment().month()
                //   );
                if (
                  todayReadouts.Cardio.length ||
                  todayReadouts.Bodybuilding.length
                ) {
                  this.todayReadouts.push(todayReadouts);
                  if (todayReadouts.Bodybuilding.length) {
                    todayReadouts.Bodybuilding.forEach(exo => {
                      this.todayReadoutsExos.push(exo);
                    });
                  }
                }

                // if (
                //   thisWeekReadouts.Cardio.length ||
                //   thisWeekReadouts.Bodybuilding.length
                // )
                //   this.thisWeekReadouts.push(thisWeekReadouts);
                // if (
                //   thisMonthReadouts.Cardio.length ||
                //   thisMonthReadouts.Bodybuilding.length
                // )
                //   this.thisMonthReadouts.push(thisMonthReadouts);

                this._readouts.push(JSON.stringify(readouts));
                this.thisWeekReadoutsCounts = 0;
                this.thisMonthReadoutsCounts = 0;
                this.getWorkoutsPerDay(this._readouts).forEach(
                  count => (this.thisWeekReadoutsCounts += count)
                );
                let weeksCounts = this.getWorkoutsPerWeek(this._readouts);
                weeksCounts.forEach(
                  count => (this.thisMonthReadoutsCounts += count)
                );
                this.avg = weeksCounts.length
                  ? this.thisMonthReadoutsCounts / weeksCounts.length
                  : 0;
              });
          });
        })
      )
      .subscribe(() => {});
  }
  getDistance() {
    this.LavaHealth.getDistance()
      .then(data => {
        let _distance = 0;
        (data as any).forEach(cDistance => {
          _distance += cDistance;
        });
        this.myDistance = Math.floor(_distance);
      })
      .catch(error => {});
  }

  getWeekDistance() {
    this.LavaHealth.getWeekDistance()
      .then(data => {
        let _distance = 0;
        (data as any).forEach(cDistance => {
          _distance += cDistance;
        });
        this.myWeekDistance = Math.floor(_distance);
      })
      .catch(error => {});
  }

  getSteps() {
    this.LavaHealth.getSteps()
      .then(data => {
        let _steps = 0;
        (data as any).forEach(cSteps => {
          _steps += cSteps;
        });
        this.mySteps = Math.floor(_steps);
      })
      .catch(error => {});
  }

  getStepsWeek() {
    this.LavaHealth.getStepsParams()
      .then(data => {
        let _steps = 0;
        (data as any).forEach(cSteps => {
          _steps += cSteps;
        });
        this.myWeekSteps = Math.floor(_steps);
      })
      .catch(error => {});
  }

  getStepsMonth() {
    this.LavaHealth.getStepsParams("month")
      .then(data => {
        let _steps = 0;
        (data as any).forEach(cSteps => {
          _steps += cSteps;
        });
        this.myMonthSteps = Math.floor(_steps);
      })
      .catch(error => {});
  }

  getStepsPerWeek() {
    this.stepsChart.monthsData.labels = [];
    this.stepsChart.monthsData.datasets[0].data = [];

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
          let _steps = 0;
          (data as any).forEach(cSteps => {
            _steps += cSteps;
          });
          this.translate
            .get((week as any).label)
            .subscribe((translated: string) => {
              this.stepsChart.monthsData.labels.push(week.label);
              this.stepsChart.monthsData.datasets[0].data.push(_steps);
            });
        })
        .catch(error => {});
    });
  }
  getStepsPerDay() {
    this.stepsChart.weeksData.labels = [];
    this.stepsChart.weeksData.datasets[0].data = [];
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
          let _steps = 0;
          (data as any).forEach(cSteps => {
            _steps += cSteps;
          });
          this.translate
            .get("d" + (day as any).label.getDay())
            .subscribe((translated: string) => {
              this.stepsChart.weeksData.labels.push(translated);
              this.stepsChart.weeksData.datasets[0].data.push(
                Math.floor(_steps)
              );
            });
        })
        .catch(error => {});
    });
  }
  getWorkoutsPerDay(readouts) {
    this.workoutChart.weeksData.labels = [];
    this.workoutChart.weeksData.datasets[0].data = [];
    let counts = [];

    [
      {
        label: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date()
      }
    ].forEach(day => {
      let count = 0;

      readouts.forEach(readout => {
        readout = JSON.parse(readout);
        readout.Bodybuilding =
          (!readout.Bodybuilding && []) ||
          readout.Bodybuilding.filter(
            exo =>
              moment(exo.CreationDate).year() == day.label.getFullYear() &&
              moment(exo.CreationDate).month() == day.label.getMonth() &&
              moment(exo.CreationDate).date() == day.label.getDate()
          );
        readout.Cardio =
          (!readout.Cardio && []) ||
          readout.Cardio.filter(
            exo =>
              moment(exo.CreationDate).year() == day.label.getFullYear() &&
              moment(exo.CreationDate).month() == day.label.getMonth() &&
              moment(exo.CreationDate).date() == day.label.getDate()
          );

        count +=
          readout.Bodybuilding.length > 0 || readout.Cardio.length > 0 ? 1 : 0;
      });
      counts.push(count);

      this.translate
        .get("d" + (day as any).label.getDay())
        .subscribe((translated: string) => {
          this.workoutChart.weeksData.labels.push(translated);
          this.workoutChart.weeksData.datasets[0].data.push(count);
        });
    });

    this.workoutChartDays.chart.update();
    return counts;
  }
  getWorkoutsPerWeek(readouts) {
    this.workoutChart.monthsData.labels = [];
    this.workoutChart.monthsData.datasets[0].data = [];
    let counts = [];
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
    ].forEach(day => {
      let count = 0;

      this.getWorkoutsPerDayOverAWeek(readouts, day.endDate).forEach(
        _count => (count += _count)
      );

      this.translate.get((day as any).label).subscribe((translated: string) => {
        this.workoutChart.monthsData.labels.push(translated);
        this.workoutChart.monthsData.datasets[0].data.push(count);
      });
      counts.push(count);
    });

    return counts;
  }

  //---------------------------------------------
  getWorkoutsPerDayOverAWeek(readouts, endDate: Date) {
    let counts = [];
    [
      {
        label: new Date(endDate.getTime() - 6 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(endDate.getTime() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(endDate.getTime() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(endDate.getTime() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(endDate.getTime() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        label: new Date(endDate.getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        label: endDate
      }
    ].forEach(day => {
      let count = 0;
      readouts.forEach(readout => {
        readout = JSON.parse(readout);
        readout.Bodybuilding =
          (!readout.Bodybuilding && []) ||
          readout.Bodybuilding.filter(
            exo =>
              moment(exo.CreationDate).year() == day.label.getFullYear() &&
              moment(exo.CreationDate).month() == day.label.getMonth() &&
              moment(exo.CreationDate).date() == day.label.getDate()
          );
        readout.Cardio =
          (!readout.Cardio && []) ||
          readout.Cardio.filter(
            exo =>
              moment(exo.CreationDate).year() == day.label.getFullYear() &&
              moment(exo.CreationDate).month() == day.label.getMonth() &&
              moment(exo.CreationDate).date() == day.label.getDate()
          );

        count +=
          readout.Bodybuilding.length > 0 || readout.Cardio.length > 0 ? 1 : 0;
      });
      counts.push(count);
    });
    return counts;
  }

  //-------------------------------------
}
