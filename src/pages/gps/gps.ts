import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker,
  MyLocationOptions
} from '@ionic-native/google-maps';
/**
 * Generated class for the GpsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gps',
  templateUrl: 'gps.html',
})
export class GpsPage {
  longData; latData: number;
  currentPosition:string;
  mik: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private googleMaps: GoogleMaps) {
    
  }



  ionViewWillEnter() {
    this.loadMap();
   /* 
    let options: GeolocationOptions = {
      enableHighAccuracy: true
    }
    this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log(' resp: ', resp)
      //this.loadMap();
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      alert(error)
    });
    */
  }


  loadMap() {

    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        let options: MyLocationOptions = {
          enableHighAccuracy: true
        }

        map.getMyLocation(options).then((resp) => {
          console.log('resp', resp)
          this.longData = resp.latLng.lng;
          this.latData = resp.latLng.lat;
          //let ionic: LatLng = new LatLng(this.latData, this.longData);
          //crear una variable y pasarle LAtlng para despues pasarsela alas opciones de cmara y marker (position y target)
          
         this.mik = resp.latLng;
          let position: CameraPosition = {
            target: this.mik,
            zoom: 18,
            tilt: 30
          };
          map.moveCamera(position);
          // create new marker
          /*let markerOptions: MarkerOptions = {
            position: this.mik,
            title: 'Ionic'
          };
          map.addMarker(markerOptions)
            .then((marker: Marker) => {
              marker.showInfoWindow();
            })*/
        })
        map.setMyLocationEnabled(true);
      });
  }





  ionViewDidLoad() {

    
  }

}
