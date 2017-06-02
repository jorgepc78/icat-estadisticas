//import 'intl';
//import 'intl/locale-data/jsonp/en';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

//import { HomePage } from '../pages/home/home';
import { HomeModule } from '../pages/home/home.module';
/*paginas*/
import { DetalleUnidadPage } from '../pages/detalle-unidad/detalle-unidad';


@NgModule({
  declarations: [
    MyApp,
    DetalleUnidadPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
        backButtonText: 'Atrás',
        mode: 'ios',
        //iconMode: 'ios',
        modalEnter: 'modal-slide-in',
        modalLeave: 'modal-slide-out',
        //tabsPlacement: 'bottom',
        pageTransition: 'ios-transition'
    }), 
    HomeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetalleUnidadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: "es-MX" }    
  ]
})
export class AppModule {}
