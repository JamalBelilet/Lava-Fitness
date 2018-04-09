import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { LavaProvider } from "../../providers/lava/lava";
import { Observable } from "rxjs/Observable";
import { ProfileProvider } from "../../providers/profile/profile";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

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
  _book: any;
  done = false;
  sessions$: Observable<Object>;
  classes$: Observable<Object>;

  reserveExerciseForm: FormGroup;
  reserveSessionForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private assetsProvider: ProfileProvider,
    private lavaProvider: LavaProvider
  ) {
    this._book = navParams.get("book");

    if (this._book == "class") {
      this.reserveExerciseForm = formBuilder.group({
        Exercise: [
          "Choose a " + this._book,
          Validators.compose([Validators.required])
        ],
        Date: [new Date().toISOString(), Validators.required]
      });
    } else if (this._book == "session") {
      this.reserveSessionForm = formBuilder.group({
        Service: [
          "Choose a " + this._book,
          Validators.compose([Validators.required])
        ],
        Date: [new Date().toISOString(), Validators.required]
      });
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad BookPage");

    console.log(this._book);
    this.classes$ = this.lavaProvider.getExerciseReservations();
    // this.classes$ = this.assetsProvider.getClasses();
    this.sessions$ = this.lavaProvider.getMassageReservations();
  }

  close() {
    this.navCtrl.pop();
  }

  book() {
    if (this._book == "class") {
      this.lavaProvider.reserveExercise(this.reserveExerciseForm.value).subscribe(res => console.log('reserveExercise', JSON.stringify(res)));
    } else if (this._book == "session") {
      this.lavaProvider.reserveMassageSession(this.reserveSessionForm.value).subscribe(res => console.log('reserveMassageSession', JSON.stringify(res)));

    }

    this.done = true;
    setTimeout(() => {
      this.navCtrl.pop();
    }, 3800);
  }
}
