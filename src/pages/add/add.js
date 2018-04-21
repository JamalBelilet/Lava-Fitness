var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App, ActionSheetController } from 'ionic-angular';
import { MembershipPage } from '../membership/membership';
import { SurvayPage } from '../survay/survay';
import { GuidebookMachinesPage } from '../guidebook-machines/guidebook-machines';
import { GuidebookMusclesPage } from '../guidebook-muscles/guidebook-muscles';
import { ProfileProvider } from '../../providers/profile/profile';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddPage = /** @class */ (function () {
    function AddPage(launchNavigator, socialSharing, actionSheetController, app, alertCtrl, storage, navCtrl, navParams, profileProvider) {
        this.launchNavigator = launchNavigator;
        this.socialSharing = socialSharing;
        this.actionSheetController = actionSheetController;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileProvider = profileProvider;
        this.membershipPage = MembershipPage;
        this.survayPage = SurvayPage;
        this.guidebookMachines = GuidebookMachinesPage;
        this.guidebookMuscles = GuidebookMusclesPage;
        this.selectedBranch = 'Alquds branch';
    }
    AddPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad AddPage');
        this.branches$ = this.profileProvider.getBranches();
        this.branches$.subscribe(function (branch) {
            _this.selectedBranch = branch.data[3];
            console.log(_this.selectedBranch);
        });
    };
    AddPage.prototype.signout = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Sign out',
            message: 'Do you want to sign out?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Sign-out',
                    handler: function () {
                        _this.storage.set("AccessToken", null);
                        // this.navCtrl.popTo(LoginPage);
                        // this.navCtrl.setRoot(LoginPage);
                        _this.app.getRootNav().setRoot(LoginPage);
                    }
                }
            ]
        });
        alert.present();
    };
    AddPage.prototype.myBooking = function () {
        console.log(this.navCtrl.parent.select(2));
    };
    AddPage.prototype.sendInvitation = function () {
        var _this = this;
        var sharePortionActionSheet = this.actionSheetController.create({
            title: 'Invite your friends',
            buttons: [
                {
                    text: 'share Lava on Facebook',
                    icon: 'logo-facebook',
                    handler: function () {
                        _this.socialSharing.shareViaFacebook("Lava Fitness", null, 'http://lava.sa');
                    }
                },
                {
                    text: 'share Lava on twitter ',
                    icon: 'logo-twitter',
                    handler: function () {
                        _this.socialSharing.shareViaTwitter("Lava Fitness", null, 'http://lava.sa');
                    }
                },
                {
                    text: 'Invite ...',
                    icon: 'ios-text-outline',
                    handler: function () {
                        _this.socialSharing.share("Lava Fitness", null, null, 'http://lava.sa');
                    }
                },
                {
                    text: 'cancel',
                    role: 'destructive'
                }
            ]
        });
        sharePortionActionSheet.present();
    };
    AddPage.prototype.navigateTo = function (address) {
        this.launchNavigator.navigate(address)
            .then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
    };
    AddPage = __decorate([
        Component({
            selector: 'page-add',
            templateUrl: 'add.html',
        }),
        __metadata("design:paramtypes", [LaunchNavigator,
            SocialSharing,
            ActionSheetController,
            App, AlertController, Storage, NavController, NavParams, ProfileProvider])
    ], AddPage);
    return AddPage;
}());
export { AddPage };
//# sourceMappingURL=add.js.map