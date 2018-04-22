import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { LavaProvider } from "../../providers/lava/lava";
import { Observable } from "rxjs/Observable";
import { ProfileProvider } from "../../providers/profile/profile";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { map } from "rxjs/operators";
import moment from "moment";

/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-book",
  templateUrl: "book.html"
})
export class BookPage {
  selectedClassDate: any;
  selectedSessionDate: any;

  selectedClassC: any;
  selectedSessionC: any;
  _book: any;
  done = false;
  sessions$: Observable<Object>;
  classes$: Observable<Object>;

  selectedSession;
  selectedClass;

  reserveExerciseForm: FormGroup;
  reserveSessionForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private assetsProvider: ProfileProvider,
    private lavaProvider: LavaProvider,
    private alertCtrl: AlertController
  ) {
    this._book = navParams.get("book");

    if (this._book == "class") {
      this.reserveExerciseForm = formBuilder.group({
        Exercise: [
          "Choose a " + this._book,
          Validators.compose([Validators.required])
        ],
        Date: ["Choose a Date", Validators.required]
      });

      console.log(this.reserveExerciseForm.controls.Exercise);
    } else if (this._book == "session") {
      this.reserveSessionForm = formBuilder.group({
        Service: [
          "Choose a " + this._book,
          Validators.compose([Validators.required])
        ],
        Date: ["Choose a Date", Validators.required]
      });

      console.log(this.reserveSessionForm.controls.Exercise);
    }
  }

  selectChanges(selected) {
    if (this._book == "class") {
      this.selectedClass = selected;
      this.selectedClassDate = null;
    } else if (this._book == "session") {
      this.selectedSession = selected;
      this.selectedSessionDate = null;
    }
  }

  selectDate(selected) {
    if (this._book == "class") {
      this.selectedClassDate = selected;
    } else if (this._book == "session") {
      this.selectedSessionDate = selected;
    }
  }

  compareFn(e1, e2): boolean {
    // console.log(11111111, e1)
    // console.log(2222222, e2)
    // console.log(e1.key === e2.key)
    return e1.key === e2.key;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad BookPage");

    console.log(this._book);
    this.classes$ = this.lavaProvider.getExerciseReservations();
    this.classes$ = this.classes$.pipe(
      map(res => {
        (res as any).data = (res as any).data.map(meus => {
          meus.Date = moment(meus.Date).format("MM/DD/YYYY");
          return meus;
        });

        var obj = {};
        var ret_arr = [];
        for (var i = 0; i < (res as any).data.length; i++) {
          obj[(res as any).data[i].ExerciseTitle] = true;
        }

        let finalObj = [];
        for (var key in obj) {
          finalObj.push({
            data: (res as any).data.filter(element => {
              return element.ExerciseTitle == key;
            }),
            key: key
          });
        }

        console.log(finalObj);

        (res as any).data = finalObj;
        return res;
      })
    );

    this.sessions$ = this.lavaProvider.getMassageReservations();
    this.sessions$ = this.sessions$.pipe(
      map(res => {
        (res as any).data = (res as any).data.map(meus => {
          meus.Date = moment(meus.Date).format("MM/DD/YYYY");
          return meus;
        });

        var obj = {};
        var ret_arr = [];
        for (var i = 0; i < (res as any).data.length; i++) {
          obj[(res as any).data[i].ServiceName] = true;
        }

        let finalObj = [];
        for (var key in obj) {
          finalObj.push({
            data: (res as any).data.filter(element => {
              return element.ServiceName == key;
            }),
            key: key
          });
        }

        console.log(finalObj);

        (res as any).data = finalObj;
        return res;
      })
    );
  }

  close() {
    this.navCtrl.pop();
  }

  book() {
    if (this._book == "class") {
      this.lavaProvider
        .reserveExercise(this.reserveExerciseForm.value)
        .subscribe(
          res => {
            this.done = true;
            setTimeout(() => {
              this.navCtrl.pop();
            }, 3800);
            console.log("reserveExercise", JSON.stringify(res));
          },
          error =>
            this.alertCtrl
              .create()
              .setMessage(error.error.errors)
              .present()
        );
    } else if (this._book == "session") {
      this.lavaProvider
        .reserveMassageSession(this.reserveSessionForm.value)
        .subscribe(
          res => {
            this.done = true;
            setTimeout(() => {
              this.navCtrl.pop();
            }, 3800);
            console.log("reserveMassageSession", JSON.stringify(res));
          },
          error =>
            this.alertCtrl
              .create()
              .setMessage(error.error.errors)
              .present()
        );
    }
  }
}
