import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  showOverlay: boolean;
  constructor() {}

  ngOnInit() {
    this.showOverlay = false;
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
    console.log('clicked: ', this.showOverlay);
  }

}


