import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NavigationBarComponent } from './features/navigation-bar/navigation-bar.component';
import { CacheMapService } from './services/cache-map';
import { httpInterceptorProviders } from './http-interceptors';
import {OverlayModule} from '@angular/cdk/overlay';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SuccessComponent } from './success/success.component';
import { FooterComponent } from './footer/footer.component';
import { FragmentPolyfillModule } from './fragment-polyfill.module';
import { Ng2OdometerModule } from 'ng2-odometer';

const routes: Routes = [
  {path: '' , redirectTo: '/hjem', pathMatch: 'full'},
  {path: 'hjem' , component: MainComponent},
  {path: 'kundehistorier' , component: SuccessComponent},
];

const routerOptions: ExtraOptions = {
  useHash: true,
  anchorScrolling: 'enabled',
  scrollOffset: [0, 50],
  onSameUrlNavigation: 'reload'
  // ...any other options you'd like to use
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SuccessComponent,
    FooterComponent,
    NavigationBarComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(routes, routerOptions),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    OverlayModule,
    Ng2OdometerModule.forRoot(),
    FragmentPolyfillModule.forRoot({
      smooth: true
    }),
  ],
  exports: [RouterModule],

  /*providers: [
    httpInterceptorProviders,
      CacheMapService,
      { provide: Cache, useClass: CacheMapService }
  ],*/
  bootstrap: [AppComponent],
})
export class AppModule { }
