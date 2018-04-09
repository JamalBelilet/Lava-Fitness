import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App } from 'ionic-angular';
import { MembershipPage } from '../membership/membership';
import { SurvayPage } from '../survay/survay';
import { GuidebookMachinesPage } from '../guidebook-machines/guidebook-machines';
import { GuidebookMusclesPage } from '../guidebook-muscles/guidebook-muscles';
import { Observable } from 'rxjs/Observable';
import { ProfileProvider } from '../../providers/profile/profile';

import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';


/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  membershipPage = MembershipPage;
  survayPage = SurvayPage;
  guidebookMachines = GuidebookMachinesPage;
  guidebookMuscles = GuidebookMusclesPage;

  selectedBranch = 'Alquds branch';

  branches$: Observable<Object>;
    constructor(public app: App, private alertCtrl: AlertController,private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private profileProvider: ProfileProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');

    this.branches$ = this.profileProvider.getBranches();

    this.branches$.subscribe(branch => {
      this.selectedBranch = (branch as any).data[3];
      console.log(this.selectedBranch);
    })
  }

  signout() {

    let alert = this.alertCtrl.create({
      title: 'Sign out',
      message: 'Do you want to sign out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Sign-out',
          handler: () => {
            this.storage.set("AccessToken", null);
            // this.navCtrl.popTo(LoginPage);
            // this.navCtrl.setRoot(LoginPage);
            this.app.getRootNav().setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();


  }

  myBooking() {
    console.log(this.navCtrl.parent.select(2));
  }

}
