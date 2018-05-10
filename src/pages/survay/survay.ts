import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SurvayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-survay',
  templateUrl: 'survay.html',
})
export class SurvayPage {

  survay = [];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.survay = [
      {
        question: 'Non sunt fugiat ut labore ipsum reprehenderit eiusmod ?',
        answer: {text: 'Very Good', value: 3},
        options: [
          {text: 'Very Good', value: 3},
          {text: 'Needs Improvments', value: 2},
          {text: 'Very Bad', value: 1},
        ]
      },
      {
        question: 'Adipisicing voluptate in aliquip Lorem ?',
        answer: {text: 'Very Good', value: 3},
        options: [
          {text: 'Very Good', value: 3},
          {text: 'Needs Improvments', value: 2},
          {text: 'Very Bad', value: 1},
        ]
      },
      {
        question: 'Aliquip aliqua cupidatat ad amet officia non culpa dolore ?',
        answer: {text: 'Very Good', value: 3},
        options: [
          {text: 'Very Good', value: 3},
          {text: 'Needs Improvments', value: 2},
          {text: 'Very Bad', value: 1},
        ]
      },
      {
        question: 'Culpa velit consequat pariatur esse ut est ?',
        answer: {text: 'Very Good', value: 3},
        options: [
          {text: 'Very Good', value: 3},
          {text: 'Needs Improvments', value: 2},
          {text: 'Very Bad', value: 1},
        ]
      }
    ]
  }


  submit() {
    this.navCtrl.pop();
  }

}
