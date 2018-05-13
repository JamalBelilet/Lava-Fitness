import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";

import { Chart } from "chart.js";
import { WeightLogHistoryPage } from "../weight-log-history/weight-log-history";
import { BodyWeightLogHistoryPage } from "../body-weight-log-history/body-weight-log-history";
import { ProfileProvider } from "../../providers/profile/profile";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationProvider } from "../../providers/authentication/authentication";

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
  lang: string;
  @ViewChild("lineCanvasWeight") lineCanvasWeight;

  @ViewChild("lineCanvasWeightSub") lineCanvasWeightSub;
  @ViewChild("lineCanvasSMM") lineCanvasSMM;
  @ViewChild("lineCanvasPBF") lineCanvasPBF;

  @ViewChild("doughnutCanvas") doughnutCanvas;

  lineChartWeight: any;

  lineChartWeightSub: any;
  lineChartSMM: any;
  lineChartPBF: any;

  doughnutChart: any;

  weightLogHistoryPage = WeightLogHistoryPage;
  bodyWeightLogHistoryPage = BodyWeightLogHistoryPage;

  memberInbodyResults$: Observable<Object>;
  memberMeasurements$: Observable<Object>;

  count = 0;

  loading = this.loadingCtrl.create({
    spinner: "ios"
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private profileProvider: ProfileProvider,
    private loadingCtrl: LoadingController,
    private translate: TranslateService,
    private authProvider: AuthenticationProvider
  ) {
    this.lang = this.authProvider.config.lang;
  }

  ionViewDidLoad() {
    this.loading.present();

    this.memberInbodyResults$ = this.profileProvider.getMemberInbodyResults();

    this.memberMeasurements$ = this.profileProvider.getMemberMeasurements();

    this.memberInbodyResults$
      .pipe(
        map(res => {
          (res as any).data = (res as any).data.sort(function(
            measurementA,
            measurementB
          ) {
            return (
              new Date(measurementA.CreationDate) <
              new Date(measurementB.CreationDate)
            );
          });

          let dataC = (res as any).data[0];
          this.translate.get("doughnut").subscribe((translated: string) => {
            this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
              type: "doughnut",
              data: {
                labels: translated,
                datasets: [
                  {
                    data: [
                      dataC.BodyFatMass / dataC.Weight * 100,
                      dataC.TotalBodyWater / dataC.Weight * 100,
                      100 -
                        (dataC.BodyFatMass / dataC.Weight * 100 +
                          dataC.TotalBodyWater / dataC.Weight * 100)
                    ],
                    backgroundColor: ["#22c3cc", "#65a4ed", "#aaaaaa"],
                    hoverBackgroundColor: ["#22c3cc", "#65a4ed", "#aaaaaa"]
                  }
                ]
              }
            });
          });

          this.lineChartSMM = new Chart(this.lineCanvasSMM.nativeElement, {
            type: "line",
            data: {
              datasets: [
                {
                  backgroundColor: ["rgba(34, 195, 204, 0.125)"],
                  borderColor: ["#22c3cc"],
                  borderWidth: 1,
                  data: (res as any).data.map(d => d.SMM).reverse()
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
                display: false
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

          this.lineChartPBF = new Chart(this.lineCanvasPBF.nativeElement, {
            type: "line",
            data: {
              datasets: [
                {
                  backgroundColor: ["rgba(34, 195, 204, 0.125)"],
                  borderColor: ["#22c3cc"],
                  borderWidth: 1,
                  data: (res as any).data.map(d => d.PBF).reverse()
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
                display: false
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
          return res;
        })
      )
      .subscribe(re => {
        this.count++;
        if (this.loading && this.count >= 2) {
          this.loading.dismiss();
          this.loading = null;
        }
      });

    this.memberMeasurements$ = this.memberMeasurements$.pipe(
      map(res => {
        (res as any).data = (res as any).data.sort(function(
          measurementA,
          measurementB
        ) {
          return (
            new Date(measurementA.CreationDate) <
            new Date(measurementB.CreationDate)
          );
        });

        return res;
      })
    );

    this.memberMeasurements$
      .pipe(
        map(res => {
          this.translate.get("Last weight").subscribe((translated: string) => {
            this.lineChartWeight = new Chart(
              this.lineCanvasWeight.nativeElement,
              {
                type: "line",
                data: {
                  datasets: [
                    {
                      backgroundColor: ["rgba(34, 195, 204, 0.125)"],
                      borderColor: ["#22c3cc"],
                      borderWidth: 1,
                      data: (res as any).data.map(d => d.Weight).reverse()
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
                    text: `${translated}: ${(res as any).data[0].CreationDate}`,
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
              }
            );
          });

          this.lineChartWeightSub = new Chart(
            this.lineCanvasWeightSub.nativeElement,
            {
              type: "line",
              data: {
                datasets: [
                  {
                    backgroundColor: ["rgba(34, 195, 204, 0.125)"],
                    borderColor: ["#22c3cc"],
                    borderWidth: 1,
                    data: (res as any).data.map(d => d.Weight).reverse()
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
                  display: false
                },
                scales: {
                  yAxes: [
                    {
                      display: false
                    }
                  ]
                }
              }
            }
          );

          return res;
        })
      )
      .subscribe(res => {
        this.count++;
        if (this.loading && this.count >= 2) {
          this.loading.dismiss();
          this.loading = null;
        }
      }, error => {
        if (this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
      });
  }
}
