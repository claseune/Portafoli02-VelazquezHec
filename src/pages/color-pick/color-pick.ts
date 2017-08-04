import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
/**
 * Generated class for the ColorPickPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-color-pick',
  templateUrl: 'color-pick.html',
})
export class ColorPickPage {
 colorToSet: string;
  private color: string = "#127bdc";
  constructor(public navCtrl: NavController, public navParams: NavParams,  public bluetooth: BluetoothSerial) {
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad ColorPickPage');
  }

}
