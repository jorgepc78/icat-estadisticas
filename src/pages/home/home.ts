import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';

import { ControlEscolarService } from '../../providers/control-escolar.service';
import 'rxjs/add/operator/switchMap';

import { DetalleUnidadPage } from '../detalle-unidad/detalle-unidad';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  errorMessage: string;
  listaMatriculaUnidad:any [] = [];
  public fecha: string = "";
  loadingWindow: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private controlEscolarService: ControlEscolarService
    //public storage: Storage
    ) {
    }

  ngOnInit() {

      this.loadingWindow = this.loadingCtrl.create({
        content: 'Cargando datos...',
        spinner: 'crescent'
      });
      this.loadingWindow.present();
      this.getUltimaMatricula();
  }

  verDetalle(detalleUnidad: any): void {
        this.navCtrl.push(DetalleUnidadPage, {
            detalleUnidad: detalleUnidad
        });
  }

  getUltimaMatricula(): void {

   this.controlEscolarService.getUltimaMatricula()
                      /*.then(this.extractData)
                      .catch(this.handleError);*/
                     .then(
                       listaMatriculaUnidad => 
                       {
                            this.listaMatriculaUnidad = listaMatriculaUnidad;
                            let d = new Date(localStorage.getItem('fecha'));
                            let mes: string;

                            if((d.getMonth()+1) < 10)
                              mes = '0'+(d.getMonth()+1).toString();
                            else
                              mes = (d.getMonth()+1).toString();

                            this.fecha = d.getDate().toString() +'/'+ mes +'/'+ d.getFullYear();
                            this.loadingWindow.dismiss();

                       }, //checar este formato de funcion en typescript
                       error => this.errorMessage = <any>error);

   /* this.controlEscolarService.getUltimaMatricula()
    .then(
        function (respuesta: DatosMatriculaUnidad[]) {
            console.log("Promise resolved as " + respuesta.length ); 
            console.log("Promise resolved as " + respuesta); 
        },
        function (error : any) {
            console.log("Promise rejected as " + error); 
        }
    )*/

/*this.controlEscolarService.getUltimaMatricula().then(function (respuesta: DatosMatriculaUnidad[]) {
    this.detalleMatriculaUnidad = respuesta;
    for (var i in respuesta) {
        var registrationDTO: DatosMatriculaUnidad = respuesta[i];
        this.detalleMatriculaUnidad.push(registrationDTO);
        console.log(registrationDTO);
    }
});
*/ 
    /*this.storage.ready().then(() => {
        this.storage.set('fecha', this.fecha);
        this.storage.set('data', this.detalleMatriculaUnidad);

        this.storage.get('data').then((data) => {
          console.log('Me: Hey, ' + name + '! You have a very nice name.' + data);
        });
        // Storage is ready to use
      // Note: ready() is only available in 1.1.7 or greater!
    });*/

  }

  /*private extractData(respuesta: DatosMatriculaUnidad[]) {
    console.log(respuesta);
    this.detalleMatriculaUnidad = respuesta;
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    console.error(error);
  }*/


}
