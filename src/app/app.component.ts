import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit, OnInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  title = 'Itema';

  secondPageVisible: boolean;

  closeResult: string;

  private fragment: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngAfterViewInit() {
    this.secondPageVisible = false;
    // this.mapInitializer();
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
   }

  navigate(id: string) {
    console.log('id:', id);
    this.router.navigate(['/'], {fragment: id});
  }

}


