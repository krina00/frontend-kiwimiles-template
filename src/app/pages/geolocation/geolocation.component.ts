import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})

export class GeolocationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getLocation();
  }

  private getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          console.log(latitude);
          console.log(longitude);
          //this.callApi(longitude, latitude);

        });
    } else {
       console.log("No support for geolocation")
    }
  }

  callApi(Longitude: number, Latitude: number){
    //const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
    //Call API
  }

}
