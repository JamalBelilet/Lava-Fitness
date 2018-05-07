import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ProfileProvider } from "../../providers/profile/profile";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";
import { AuthenticationProvider } from "../../providers/authentication/authentication";

/**
 * Generated class for the MembershipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-membership",
  templateUrl: "membership.html"
})
export class MembershipPage {
  lang: string;
  membership$: Observable<Object>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private profileProvider: ProfileProvider,
    private authProvider: AuthenticationProvider
  ) {
    this.lang = this.authProvider.config.lang;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MembershipPage");

    this.membership$ = this.profileProvider.getMembership();

    this.membership$ = this.membership$.pipe(
      map(value => {
        let membership = (value as any).data;

        function* values(obj) {
          for (let prop of Object.keys(obj)) yield obj[prop];
        }

        membership.Services = Array.from(values(membership.Services));

        membership.Services.map(service => {
          service.repeatByNumberOfServices = new Array(
            Number(service.NumberOfServices)
          );
        });

        console.log("arr_f", membership);
        return membership;
      })
    );
  }
}
