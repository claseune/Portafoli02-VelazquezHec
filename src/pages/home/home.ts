import { Component } from '@angular/core';
import { NavController, ToastController, Platform, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GpsPage } from '../gps/gps';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { BleSerialPage } from '../ble-serial/ble-serial';
import { ColorPickPage } from '../color-pick/color-pick';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picture = [];
  Preview: string = "null";
  datapicture: FirebaseListObservable<any>;
  storageRef = firebase.storage().ref()

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private platform: Platform,
    private toastCtrl: ToastController,
    db: AngularFireDatabase,
    private altr: AlertController) {
    this.datapicture = db.list('/mediapics');
  }
goblue(){
  this.navCtrl.push(BleSerialPage)
}
goColor(){
this.navCtrl.push(ColorPickPage)
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
        this.Preview = imageData;
        this.guardado();
    }, (err) => {
      // Handle error
      this.mostrar_toast("Error" + err);
      console.error("Error en la camara:", err)
    });
  }
  //para traerla 
  goGPS() {
    this.navCtrl.push(GpsPage)
  }

  public guardado() {
    this.altr.create({
      title: 'Ingresar descripcion',
      subTitle: 'Registra título y descripcion de esta imagen papu',
      inputs: [{
        name: 'title',
        placeholder: 'insertar título',
        type: 'text'
      },
      {
        name: 'subtitle',
        placeholder: 'insertar descripción',
        type: 'text'
      }],//let es privadamente dentro de la funcion var es mas general
      buttons: [{
        text: 'ok',
        handler: data => {
          var date = new Date();//de esta forma VALIDAMOS el guardado conjunto de la informacion para operar con ello despues
          let uploadTask = this.storageRef.child('pictures/' + date + '.jpg').putString(this.Preview, 'base64');
          uploadTask.then((Response) => {
            this.storageRef.child('pictures/' + date + '.jpg').getDownloadURL().then((URL) => {
              this.datapicture.push({
                title: data.title,
                subtitle: data.subtitle,
                url: URL
              });
            }, (error) => {
              console.error("Error en la extraccion del url:", error)
            });
          }, (error) => {
            console.error("Error en el guardado:", error)
          });
        }
      }]
    }).present();


  }


  private mostrar_toast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500
    }).present();
  }



}



