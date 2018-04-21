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
import { ClassShedulePage } from "../class-shedule/class-shedule";
import { BookPage } from "../book/book";
import { LavaProvider } from "../../providers/lava/lava";
import { ProfileProvider } from "../../providers/profile/profile";
import { PhotoViewer } from '@ionic-native/photo-viewer';
/**
 * Generated class for the StarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StarPage = /** @class */ (function () {
    function StarPage(photoViewer, navCtrl, navParams, modalCtrl, lavaProvider, profileProvider) {
        this.photoViewer = photoViewer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.lavaProvider = lavaProvider;
        this.profileProvider = profileProvider;
        // bookings$ = [
        //   {
        //     title: "Yoga",
        //     duration: "30 min",
        //     day: "today",
        //     time: "6:15 pm"
        //   },
        //   {
        //     title: "Yoga",
        //     duration: "30 min",
        //     day: "today",
        //     time: "6:15 pm"
        //   }
        // ];
        this.classShedule = ClassShedulePage;
    }
    StarPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad StarPage");
        this.bookings$ = this.profileProvider.getServices();
        // this.bookings$ = this.lavaProvider.getExerciseReservations();
    };
    StarPage.prototype.previewSchedule = function (imgURL) {
        this.photoViewer.show('https://mysite.com/path/to/image.jpg');
    };
    StarPage.prototype.bookClass = function () {
        var BookingModal = this.modalCtrl.create(BookPage, { book: 'class' });
        BookingModal.present();
    };
    StarPage.prototype.bookSession = function () {
        var BookingModal = this.modalCtrl.create(BookPage, { book: 'session' });
        BookingModal.present();
    };
    StarPage = __decorate([
        Component({
            selector: "page-star",
            templateUrl: "star.html"
        }),
        __metadata("design:paramtypes", [PhotoViewer,
            NavController,
            NavParams,
            ModalController,
            LavaProvider,
            ProfileProvider])
    ], StarPage);
    return StarPage;
}());
export { StarPage };
//# sourceMappingURL=star.js.map