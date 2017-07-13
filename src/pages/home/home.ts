import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { GpsPage } from '../gps/gps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Preview: string = "null";

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private platform: Platform,
    private toastCtrl: ToastController) {

  }






  showCam() {

    if (!this.platform.is("cordova")) {
      this.mostrar_toast("Error: No estamos en un celular");
      return;
    }

   


    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.Preview = 'data:image/jpeg;base64,' + imageData;
      //window.localStorage.setitem('MyIamge', this.Preview)
    }, (err) => {
      // Handle error
      this.mostrar_toast("Error" + err);
      console.error("Error en la camara:", err)
    });
  }
  //para traerla 
  goGPS(){
      this.navCtrl.push(GpsPage)
    }

  private mostrar_toast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500
    }).present();
  }



}



