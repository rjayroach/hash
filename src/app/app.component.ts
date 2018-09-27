import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  title: string = 'maps'
  lat: number = 41.29364
  lng: number = 103.83223
  lable: string = 'AB'
  locationChosen: boolean = false
  markers: marker[]

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getUserLocation()
    this.dataService.fetchData().subscribe(
      (data) => this.markers = data
    )
  }

  labelOptions = {
    // color: '#CC0000',
    color: 'green',
    // fontFamily: '',
    fontSize: '14px',
    //fontWeight: 'bold',
    text: 'Start',
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      alert("Geolocation tracking started.");
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showTrackingPosition(position) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    console.log(this.lat)
    console.log(this.lng)


    // let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // this.map.panTo(location);

    // if (!this.marker) {
    //   this.marker = new google.maps.Marker({
    //     position: location,
    //     map: this.map,
    //     title: 'Got you!'
    //   });
    // }
    // else {
    //   this.marker.setPosition(location);
    // }
  }

  addCheck(checkType) {
    console.log('hello!')
    // store the current location in firebase and add type 't-check'
    // check that ninja guy's video for updating belt color on add to firebase
    // add a marker to the map at current location
    this.getUserLocation()
    console.log(this.lat)
    console.log(this.lng)
    console.log(checkType)
  }

  getUserLocation() {
    if (navigator.geolocation) {
      console.log('Geolocation is supported')
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords)
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
      }, (error) => {
       switch (error.code) {
           case 1:
               alert('Permission Denied');
               break;
           case 2:
               alert('Position Unavailable');
               break;
           case 3:
               alert('Timeout');
               break;
       }}
    } else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }
  }
  onChoseLocation(event) {
    this.lat = event.coords.lat
    this.lng = event.coords.lng
    this.locationChosen = true
    console.log(event)
  }

}

interface marker {
  lat: number
  lng: number
  label: string
}
