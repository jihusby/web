import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-component',
  templateUrl: './main.component.html'
})
export class MainComponent implements AfterViewInit, OnInit, OnDestroy {


  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  successStoryRows = [];

  hover: number;

  infoWindow: google.maps.InfoWindow;
  map: google.maps.Map;
  lat = 63.412467;
  lng = 10.445946;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 16,
    mapTypeControl: false
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: '',
    label: '',
    clickable: true,
  });

  experience: number;

  private subscription: Subscription;
  successStories: Post[];

  constructor(
    private service: PostService) {}

  ngOnInit() {
    this.experience = this.getExperience();
    this.subscription = this.service.getProfiledSuccessStories().subscribe(stories => {
      let successStoryRow = [];
      let i = 0;
      this.successStories = stories;
      for (const story of stories) {
        i++;
        successStoryRow.push(story);
        if (i % 4 === 0) {
          this.successStoryRows.push(successStoryRow);
          successStoryRow = [];
        }
      }
    });
  }

  mapInitializer() {
  this.infoWindow = new google.maps.InfoWindow();
  this.infoWindow.setContent('<b>Itema AS</b> Brøsetvegen 164B, 7069 TRONDHEIM');
  this.infoWindow.setPosition(this.marker.getPosition());
  this.map = new google.maps.Map(this.gmap.nativeElement,
    this.mapOptions);
  this.marker.setMap(this.map);

  google.maps.event.addListener(this.marker, 'mouseover', ($event) => {
    this.infoWindow.open(this.map, this.marker);
    });

  google.maps.event.addListener(this.marker, 'mouseout', ($event) => {
    this.infoWindow.close();
    });
  }

  getIndex(u: number, i: number) {
    const res = (u % 3) + i;
    if (res > 2) {
      return 0;
    }
    return res;
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  getImgPath(title: string): string {
    return './assets/img/' + title.replace(' ', '').toLowerCase();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getExperience() {
    const startDate = environment.config.experienceStartDate;
    const exp = (new Date().getTime() - new Date(startDate).getTime()) / 29030400000;
    const res = Math.round(exp * environment.config.noOfConsultants);
    if (res > 600) {
      return res;
    } else {
      return 606;
    }
  }

}


