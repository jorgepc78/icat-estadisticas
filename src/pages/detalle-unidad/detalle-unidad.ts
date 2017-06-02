import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ControlEscolarService } from '../../providers/control-escolar.service';
import 'rxjs/add/operator/switchMap';

/*
  Generated class for the DetalleUnidad page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detalle-unidad',
  templateUrl: 'detalle-unidad.html'
})
export class DetalleUnidadPage implements OnInit {

  //public datosMatriculaUnidad: DatosMatriculaUnidad;
  errorMessage: string;
  datosUnidad: any;

  constructor(public navCtrl: NavController, private controlEscolarService: ControlEscolarService, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DetalleUnidadPage'); 
  }

  ngOnInit() {
     this.datosUnidad = this.navParams.get('detalleUnidad');
  }
}
