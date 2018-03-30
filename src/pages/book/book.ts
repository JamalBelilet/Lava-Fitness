import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LavaProvider } from '../../providers/lava/lava';
import { Observable } from 'rxjs/Observable';
import { ProfileProvider } from '../../providers/profile/profile';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  _book: any;
  done = false;
  sessions$: Observable<Object>;
  classes$: Observable<Object>;

  reserveForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController, public navParams: NavParams, private assetsProvider: ProfileProvider, private lavaProvider: LavaProvider) {
    this._book = navParams.get('book');

    this.reserveForm = formBuilder.group({
      ServiceID: ["Choose a " + this._book, Validators.required],
      Date: [new Date().toISOString(), Validators.required]
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');

    console.log(this._book);
    this.classes$ = this.assetsProvider.getClasses();
    this.sessions$ = this.assetsProvider.getServices();
  }


  close() {
    this.navCtrl.pop();
  }

  book(){
    if(this._book == 'class') {
      this.lavaProvider.reserveExercise(this.reserveForm.value)

    }
    else if(this._book == 'session') {
      console.log(this.reserveForm.value);
      this.lavaProvider.reserveMassageSession(this.reserveForm.value)
    }

    this.done = true;
    setTimeout(()=> {
      this.navCtrl.pop();
    }, 100800)
  }

}
