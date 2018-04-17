import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";

/**
 * Generated class for the GuidebookMusclesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-guidebook-muscles",
  templateUrl: "guidebook-muscles.html"
})
export class GuidebookMusclesPage {
  exosDetails = {
    deltoid: {
      title: "Deltoid",
      detail: "Id dolor ex sint deserunt sint anim. Eiusmod esse nostrud ea sint duis reprehenderit irure irure nisi occaecat do magna minim. Est elit Lorem esse reprehenderit ea ipsum ad labore. Duis voluptate deserunt duis in esse irure ex occaecat dolore sit non amet irure. Aliquip nostrud quis aute nostrud. Pariatur deserunt velit sint deserunt cillum sint dolore culpa sint qui."
    },
    sideAbs: {
      title: "Side Abs",
      detail: "Magna quis nulla proident cupidatat. Dolor sit consequat nostrud ex ullamco occaecat ullamco aliquip nostrud ex aliqua. Non proident id ad proident et. Mollit exercitation commodo proident excepteur aliqua consectetur id sint dolor cillum. Cillum tempor dolore anim quis qui cupidatat et laboris ad. Nostrud Lorem eu cupidatat reprehenderit ea quis cillum reprehenderit magna quis ea sit. Deserunt id amet voluptate enim ipsum in dolore."
    },
    abs: {
      title: "Abs",
      detail: "Aliqua reprehenderit dolore velit eu consequat ullamco dolore quis cillum sint. Eu nostrud do sunt anim eiusmod. Consequat id minim aliqua amet fugiat amet nulla Lorem est."
    },
    quadriceps: {
      title: "Quadriceps",
      detail: "Ex ut irure ullamco labore incididunt aute esse tempor anim exercitation excepteur deserunt. Aute ad velit nulla minim sint proident eu sint anim ex ex fugiat. Veniam consectetur consectetur officia aute laborum ut amet Lorem esse anim pariatur. Aute nostrud velit ex eiusmod irure aliquip eu voluptate labore. Sit amet non in duis velit mollit irure nulla veniam aliqua sint cillum. Exercitation magna quis dolore dolore consectetur nostrud elit laboris id irure enim irure."
    },
    chest: {
      title: "Chest",
      detail: "In veniam dolor labore aliquip eiusmod quis elit id laborum commodo cupidatat. Do deserunt irure voluptate duis est cillum. Id voluptate do laborum quis qui commodo quis dolore id veniam culpa. Voluptate adipisicing excepteur dolor proident dolor qui est aliqua. Id laboris officia est exercitation ipsum labore ut pariatur. Fugiat ut officia ipsum tempor laborum adipisicing adipisicing aute. Laboris veniam voluptate magna consequat commodo enim officia fugiat aliquip velit."
    },
    back: {
      title: "Back",
      detail: "Ut sunt fugiat duis ea. Nulla mollit sunt deserunt magna sint irure culpa ullamco sit. Enim aliqua dolor occaecat nulla ex culpa velit qui tempor."
    },
    forearms: {
      title: "Forearms",
      detail: "Sint laboris occaecat velit consequat proident ex dolore Lorem adipisicing magna. Elit proident in qui Lorem excepteur ea anim qui excepteur fugiat elit deserunt. Quis dolore ad fugiat sint voluptate. Quis et reprehenderit ad ex proident ipsum pariatur incididunt id nisi est proident amet ut. Fugiat eu tempor aliquip sit proident elit labore voluptate anim excepteur eu ipsum in."
    },
    tibialisAnterior: {
      title: "Tibialis Anterior",
      detail: "Ea sint esse occaecat voluptate laboris non id laboris enim qui dolore magna. Esse quis veniam voluptate veniam. Duis quis non anim reprehenderit Lorem nostrud consectetur reprehenderit officia minim esse cillum. Sint ea voluptate commodo in amet magna in cillum reprehenderit proident ipsum. Reprehenderit dolor eiusmod qui id reprehenderit nisi non dolore eiusmod minim irure proident voluptate nostrud. Occaecat eiusmod ad qui quis laboris consectetur veniam eu et."
    }
  };


    constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad GuidebookMusclesPage");
  }

  showDetail(exerciceID) {

    let alert = this.alertCtrl.create({
      title: this.exosDetails[exerciceID].title,
      message: this.exosDetails[exerciceID].detail,
    });
    alert.present();

  }
}
