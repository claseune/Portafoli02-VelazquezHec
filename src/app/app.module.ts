import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Camera } from '@ionic-native/camera';


import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

import { AngularFireAuthModule } from 'angularfire2/auth';
import { GpsPage } from '../pages/gps/gps';
import{GoogleMaps} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { StartPage } from '../pages/start/start';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BleSerialPage } from '../pages/ble-serial/ble-serial';
import { ColorPickPage } from '../pages/color-pick/color-pick';
import { ColorPickerModule } from 'ngx-color-picker';

export const config = {
  apiKey: "AIzaSyDbvMjiTTKHLeoZwRcj2KDz5HFPAZQWRR8",
  authDomain: "camara-377f2.firebaseapp.com",
  databaseURL: "https://camara-377f2.firebaseio.com",
  projectId: "camara-377f2",
  storageBucket: "camara-377f2.appspot.com",
  messagingSenderId: "259632457956"

}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GpsPage,
    StartPage,
    BleSerialPage,
    ColorPickPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
     AngularFireAuthModule,
     ColorPickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GpsPage,
    StartPage,
    BleSerialPage,
    ColorPickPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    GoogleMaps,
    LocalNotifications,
    BluetoothSerial,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
