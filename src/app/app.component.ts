import { Component } from '@angular/core';
import { Platform , ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashPage } from '../pages/splash/splash';

import { LoginPage } from "../pages/login/login";
import { PrincipalPage } from "../pages/principal/principal";

import { FcmProvider } from '../providers/fcm/fcm';

import { tap } from 'rxjs/operators';
import { ToastController } from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar,
     splashScreen: SplashScreen,modalCtrl: ModalController,
      fcm: FcmProvider, toastCtrl: ToastController,
      private nativeAudio: NativeAudio,
      public toastController: ToastController) {
      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();

      if(localStorage.getItem("usuario")) {
        this.rootPage = PrincipalPage;
      }
      let splash = modalCtrl.create(SplashPage);
            splash.present();

            
    fcm.getToken();
    fcm.onNotifications().subscribe(
      (msg) => {
        if (platform.is('ios')) {
          this.presentToast(msg.aps.alert);
        } else {
          this.presentToast(msg.body);
        }
      });
    });
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }
}
