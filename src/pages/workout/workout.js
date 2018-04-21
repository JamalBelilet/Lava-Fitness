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
import { NavController, NavParams, ModalController } from "ionic-angular";
import { FinishWorkoutPage } from "../finish-workout/finish-workout";
import { ProfileProvider } from "../../providers/profile/profile";
/**
 * Generated class for the WorkoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WorkoutPage = /** @class */ (function () {
    // @Output() finish = new EventEmitter();
    function WorkoutPage(profileProvider, navCtrl, navParams, modalCtrl) {
        this.profileProvider = profileProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.workout = navParams.data;
    }
    WorkoutPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad WorkoutPage");
    };
    WorkoutPage.prototype.open = function ($event, itemSlide, item) {
        // reproduce the slide on the click
        $event.stopPropagation();
        $event.preventDefault();
        itemSlide.setElementClass("active-sliding", true);
        itemSlide.setElementClass("active-slide", true);
        itemSlide.setElementClass("active-options-left", true);
        item.setElementStyle("transform", "translate3d(90.04%, 0px, 0px)");
    };
    WorkoutPage.prototype.close = function (item) {
        item.close();
        item.setElementClass("active-sliding", false);
        item.setElementClass("active-slide", false);
        item.setElementClass("active-options-left", false);
    };
    WorkoutPage.prototype.finishWorkout = function () {
        this.profileProvider.finishProgram(this.workout.ID).subscribe(function (res) {
            // this.finish.emit(this.workout);
        });
        var modal = this.modalCtrl.create(FinishWorkoutPage, { workoutID: this.workout.ID }).present();
    };
    WorkoutPage = __decorate([
        Component({
            selector: "page-workout",
            templateUrl: "workout.html"
        }),
        __metadata("design:paramtypes", [ProfileProvider, NavController, NavParams, ModalController])
    ], WorkoutPage);
    return WorkoutPage;
}());
export { WorkoutPage };
//# sourceMappingURL=workout.js.map