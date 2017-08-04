import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

/*
Fuente: https://ionicacademy.com/ionic-local-notifications/ 
 */
@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  
  constructor(public navCtrl: NavController, private plt: Platform, alertCtrl: AlertController, public navParams: NavParams, private localNotifications: LocalNotifications) {
    this.plt.ready().then((readySource) => {
    
      this.localNotifications.on('click', (notification, state) => {
        let json = JSON.parse(notification.data);

        let alert = alertCtrl.create({
          title: notification.title,
          subTitle: json.mydata
        });
        alert.present();
      })
    });
  }
  PrNotificacion() {
    var d = new Date();
      d.setHours(19);
      d.setMinutes(10);
      d.setSeconds(0);
      
    this.localNotifications.schedule({
      id: 1,
      title: 'HEEEY',
      text: 'Probando Notificaciones',
      at: /* or new Date(new Date().getTime() + 5000)*/ d ,
      data: { mydata: 'escondite' }
    
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

}
