import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the GuidebookMachinesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-guidebook-machines",
  templateUrl: "guidebook-machines.html"
})
export class GuidebookMachinesPage {
  selectedGroup = "Group: Ads";

  items: any = [];
  itemExpandHeight: number = 41.8 / 167.3 * 100;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [
      { expanded: false },
      { expanded: true },
      { expanded: false },
      // { expanded: false },
    ];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad GuidebookMachinesPage");
  }

  expandItem(item) {
    this.items.map(listItem => {
      if (item == listItem) {
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }

      return listItem;
    });
  }
}
