import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { LavaProvider } from "../../providers/lava/lava";
import { Observable } from "rxjs/Observable";
import { ProfileProvider } from "../../providers/profile/profile";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { map } from "rxjs/operators";
import moment from "moment";
import { ClassesBookingPage } from "../classes-booking/classes-booking";
import { ServicesBookingPage } from "../services-booking/services-booking";

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
  branches$: Observable<Object>;
  massagers$: Observable<Object>;
  selectedClassDate: any;
  selectedSessionDate: any;

  selectedClassC: any;
  selectedSessionC: any;
  _book: any;
  done = false;
  sessions$: Observable<Object>;
  classes$: Observable<Object>;
  // selectedDate = new Date();

  selectedSession;
  selectedClass;

  reserveExerciseForm: FormGroup;
  reserveSessionForm: FormGroup;


  nowDate;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private assetsProvider: ProfileProvider,
    private lavaProvider: LavaProvider,
    private alertCtrl: AlertController
  ) {

    let monthC = new Date().getMonth()+1;
    let dateC = new Date().getDate();
    const date = dateC > 9 ? dateC : "0" + dateC;
    const month = monthC > 9 ? monthC : "0" + monthC;

    this.nowDate = `${new Date().getFullYear()}-${month}-${date}`

    this._book = navParams.get("book");



    if (this._book == "class") {
      this.reserveExerciseForm = formBuilder.group({
        Branch: [
          "Choose a " + this._book,
          Validators.compose([Validators.required])
        ],
        Date: [this.nowDate, Validators.required]
      });

      console.log(this.reserveExerciseForm.controls.Exercise);
    } else if (this._book == "session") {
      this.reserveSessionForm = formBuilder.group({
        Branch: [
          "Choose a " + this._book,
          Validators.compose([Validators.required])
        ],
        Massager: [
          "Choose a Massager",
          Validators.compose([Validators.required])
        ],
        Date: [this.nowDate, Validators.required]
      });

      console.log(this.reserveSessionForm.controls.Exercise);
    }
  }


  selectChanges(branch) {
    if (this._book == "session") {
      console.warn(branch.ID)
      this.massagers$ = this.assetsProvider.getMassagers(branch.ID);
      this.massagers$.subscribe(res=>console.log('hei', res));
    }
  }

  compareFn(e1, e2): boolean {
    // console.log(11111111, e1)
    // console.log(2222222, e2)
    // console.log(e1.key === e2.key)
    return e1.ID === e2.ID;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad BookPage");

    console.log(this._book);

    this.branches$ = this.assetsProvider.getBranches();
    this.massagers$ = this.assetsProvider.getMassagers(1);

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
      this.navCtrl.push(ClassesBookingPage, this.reserveExerciseForm.value);
    } else if (this._book == "session") {
      this.navCtrl.push(ServicesBookingPage, this.reserveSessionForm.value);
    }
  }
}
