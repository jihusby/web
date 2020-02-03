import { Component, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  showOverlay: boolean;

  overlayRef: any;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.showOverlay = false;
  }

  openWithTemplate(tpl: TemplateRef<any>) {
    const configs = new OverlayConfig({
      hasBackdrop: false,
      panelClass: ['modal', 'is-active'],
      backdropClass: 'modal-background'
     });

    this.overlayRef = this.overlay.create(configs);
    this.overlayRef.backdropClick().subscribe(() => {

      this.close();
    });
    this.overlayRef.attach(new TemplatePortal(tpl, this.viewContainerRef));
  }

  close(){
    console.log('closed');
    this.overlayRef.dispose();
  }

}


