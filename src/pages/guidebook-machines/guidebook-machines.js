var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
/**
 * Generated class for the GuidebookMachinesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GuidebookMachinesPage = /** @class */ (function () {
    function GuidebookMachinesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.selectedGroup = "Group: Ads";
        this.items = [];
        this.itemExpandHeight = 41.8 / 167.3 * 100;
        this.items = [
            { expanded: false },
            { expanded: true },
            { expanded: false },
        ];
    }
    GuidebookMachinesPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad GuidebookMachinesPage");
    };
    GuidebookMachinesPage.prototype.expandItem = function (item) {
        this.items.map(function (listItem) {
            if (item == listItem) {
                listItem.expanded = !listItem.expanded;
            }
            else {
                listItem.expanded = false;
            }
            return listItem;
        });
    };
    GuidebookMachinesPage = __decorate([
        Component({
            selector: "page-guidebook-machines",
            templateUrl: "guidebook-machines.html"
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], GuidebookMachinesPage);
    return GuidebookMachinesPage;
}());
export { GuidebookMachinesPage };
//# sourceMappingURL=guidebook-machines.js.map