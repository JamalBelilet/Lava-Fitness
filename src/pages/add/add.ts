import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MembershipPage } from '../membership/membership';
import { SurvayPage } from '../survay/survay';
import { GuidebookMachinesPage } from '../guidebook-machines/guidebook-machines';
import { GuidebookMusclesPage } from '../guidebook-muscles/guidebook-muscles';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

}
