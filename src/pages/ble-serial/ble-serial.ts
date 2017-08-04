import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ColorPickPage } from '../color-pick/color-pick';


@Component({
  selector: 'page-ble-serial',
  templateUrl: 'ble-serial.html',
})
export class BleSerialPage {
  devices: any;//aqui guardamos los dipositivos donde ya nos hayamos vinculado
  unpaireds: any;//aqui escanea paa ver si hay nuevos
  data: string;
  colorToSet: string;
  private color: string = "#127bdc";

  constructor(public navCtrl: NavController, public navParams: NavParams, public bluetooth: BluetoothSerial) {
  }
  discoverUnpairedDevices() {
    console.log('Buscando...')
    this.bluetooth.discoverUnpaired().then((resp) => {
      this.unpaireds = resp;
      console.log(this.unpaireds)

    }, (error) => {
      console.log(error)
    })
  }

  connectToDevice(id) {
    this.bluetooth.connect(id).subscribe(resp => {
      this.navCtrl.push(ColorPickPage)
      //this.bluetooth.write('CONECTADO');
      console.log('ID: ' + id);
      console.log('resp ' + resp)
      //LOS SUBSCRIBE ,.... hay dos tipos de variables 
    })
  }

  ///nuevo
  sendData() {
    console.log(this.data)
    this.bluetooth.write(this.data).then((resp) => {
      console.log('SD_r: ' + resp)
      this.data = "";
    }, (error) => {
      console.log('SD_e: ' + error)
    })
  }

  onItemChange(selectedValue: string) {
    console.log(selectedValue.slice(4, -1));

    this.colorToSet = selectedValue.slice(4, -1);
  }

  setColor() {
    if (this.colorToSet) {
      this.bluetooth.write(this.colorToSet).then((resp) => {

      }, (error) => {
        alert(error);
      });
      console.log(this.colorToSet)
      console.log("set color: " + this.colorToSet)
    }
  }
  ///nuevooo aqui termina

  ionViewDidLoad() {
    this.bluetooth.list().then((success) => {
      console.log(success);
      this.devices = success;
    }, (error) => {
      console.log(error)
    })//trae la lista d elos que ya

    console.log('ionViewDidLoad BleSerialPage');
  }


}
