import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';

import { HomePage } from './home';

import { ControlEscolarService } from '../../providers/control-escolar.service';

@NgModule({
  imports: [IonicModule.forRoot(HomePage), CommonModule],
  declarations: [HomePage],
  providers    : [ ControlEscolarService],
  exports: [HomePage]
})

export class HomeModule { }
