import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main.component.html'
})
export class MainComponent implements AfterViewInit, OnInit, OnDestroy {


  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  title = 'Itema';

  successStoryRows = [];

  closeResult: string;

  hover: number;

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
    title: 'Itema as',
    label: 'Itema as',
    clickable: true,
  });

  private fragment: string;

  private subscription: Subscription;
  successStories: Post[];

  constructor(
    private service: PostService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });

    this.subscription = this.service.getSuccessStories().subscribe(stories => {
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
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
    this.marker.setMap(this.map);
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

}


