import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//import { Storage } from '@ionic/storage';

//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import 'rxjs/add/operator/toPromise';

import {AppConstants} from '../app/app-constants';

@Injectable()
export class ControlEscolarService {

  constructor(
    private http: Http,
    //public almacen: Storage
    //private sqlite: SQLite  {"limit":1,"order":"fechaCorte DESC"}
  ) {}

  getUltimaMatricula() {
    let fechaHoy = new Date();

    return this.http.get(AppConstants.apiUrl + 'MatriculaCortes?filter={"limit":1,"order":"fechaCorte DESC","include":[{"relation":"estadistica_matricula","scope":{"include":[{"relation":"unidad_pertenece","scope":{"fields":["nombre"],"include":[{"relation":"metas_asignadas","scope":{"where":{"anio":'+fechaHoy.getFullYear()+'}}}]}}]}}]}')
               .toPromise()
               .then(this.extractDataResumen)
               .catch(this.handleError);
  }

  public extractDataResumen(res: Response) {
    let body = res.json();
    let datos: any = [];
    var totalEdo: any;

    localStorage.setItem('fecha', body[0].fechaCorte);

    let fechaCorte = new Date(body[0].fechaCorte);
    
    totalEdo = {
        unidad              :'Estatal',
        gruposRegular       : 0,
        inscritosRegular    : 0,
        metaAcumRegular     : 0,
        gruposExtension     : 0,
        inscritosExtension  : 0,
        metaAcumExtension   : 0,
        gruposCae           : 0,
        inscritosCae        : 0,
        metaAcumCae         : 0,
        inscritosRoco       : 0,
        metaAcumRoco        : 0,
        inscritosEstandares : 0,
        metaAcumEstandares  : 0,
        gruposTotal         : 0,
        inscritosTotal      : 0,
        metaAcumTotal       : 0
    }

    for (let elemento of body[0].estadistica_matricula) {

      let metaAcumRegular: number = 0;
      let metaAcumExtension: number = 0;
      let metaAcumCae: number = 0;
      let metaAcumRoco: number = 0;
      let metaAcumEstandares: number = 0;

      if(elemento.idUnidadAdmtva != 1)
      {        
          if( (fechaCorte.getMonth() >= 0) && (fechaCorte.getMonth() <= 2) )
          {
            metaAcumRegular    = elemento.unidad_pertenece.metas_asignadas[0].reg1Trim;
            metaAcumExtension  = elemento.unidad_pertenece.metas_asignadas[0].ext1Trim;
            metaAcumCae        = elemento.unidad_pertenece.metas_asignadas[0].cae1Trim;
            metaAcumRoco       = elemento.unidad_pertenece.metas_asignadas[0].roco1Trim;
            metaAcumEstandares = elemento.unidad_pertenece.metas_asignadas[0].ecl1Trim;
          }
          else if( (fechaCorte.getMonth() >= 3) && (fechaCorte.getMonth() <= 5) )
          {
            metaAcumRegular    = elemento.unidad_pertenece.metas_asignadas[0].reg1Trim  + elemento.unidad_pertenece.metas_asignadas[0].reg2Trim;
            metaAcumExtension  = elemento.unidad_pertenece.metas_asignadas[0].ext1Trim  + elemento.unidad_pertenece.metas_asignadas[0].ext2Trim;
            metaAcumCae        = elemento.unidad_pertenece.metas_asignadas[0].cae1Trim  + elemento.unidad_pertenece.metas_asignadas[0].cae2Trim;
            metaAcumRoco       = elemento.unidad_pertenece.metas_asignadas[0].roco1Trim + elemento.unidad_pertenece.metas_asignadas[0].roco2Trim;
            metaAcumEstandares = elemento.unidad_pertenece.metas_asignadas[0].ecl1Trim  + elemento.unidad_pertenece.metas_asignadas[0].ecl2Trim;
          }
          else if( (fechaCorte.getMonth() >= 6) && (fechaCorte.getMonth() <= 8) )
          {
            metaAcumRegular    = elemento.unidad_pertenece.metas_asignadas[0].reg1Trim  + elemento.unidad_pertenece.metas_asignadas[0].reg2Trim  + elemento.unidad_pertenece.metas_asignadas[0].reg3Trim;
            metaAcumExtension  = elemento.unidad_pertenece.metas_asignadas[0].ext1Trim  + elemento.unidad_pertenece.metas_asignadas[0].ext2Trim  + elemento.unidad_pertenece.metas_asignadas[0].ext3Trim;
            metaAcumCae        = elemento.unidad_pertenece.metas_asignadas[0].cae1Trim  + elemento.unidad_pertenece.metas_asignadas[0].cae2Trim  + elemento.unidad_pertenece.metas_asignadas[0].cae3Trim;
            metaAcumRoco       = elemento.unidad_pertenece.metas_asignadas[0].roco1Trim + elemento.unidad_pertenece.metas_asignadas[0].roco2Trim + elemento.unidad_pertenece.metas_asignadas[0].roco3Trim;
            metaAcumEstandares = elemento.unidad_pertenece.metas_asignadas[0].ecl1Trim  + elemento.unidad_pertenece.metas_asignadas[0].ecl2Trim  + elemento.unidad_pertenece.metas_asignadas[0].ecl3Trim;
          }
          else
          {
            metaAcumRegular    = elemento.unidad_pertenece.metas_asignadas[0].reg1Trim  + elemento.unidad_pertenece.metas_asignadas[0].reg2Trim  + elemento.unidad_pertenece.metas_asignadas[0].reg3Trim  + elemento.unidad_pertenece.metas_asignadas[0].reg4Trim;
            metaAcumExtension  = elemento.unidad_pertenece.metas_asignadas[0].ext1Trim  + elemento.unidad_pertenece.metas_asignadas[0].ext2Trim  + elemento.unidad_pertenece.metas_asignadas[0].ext3Trim  + elemento.unidad_pertenece.metas_asignadas[0].ext4Trim;
            metaAcumCae        = elemento.unidad_pertenece.metas_asignadas[0].cae1Trim  + elemento.unidad_pertenece.metas_asignadas[0].cae2Trim  + elemento.unidad_pertenece.metas_asignadas[0].cae3Trim  + elemento.unidad_pertenece.metas_asignadas[0].cae4Trim;
            metaAcumRoco       = elemento.unidad_pertenece.metas_asignadas[0].roco1Trim + elemento.unidad_pertenece.metas_asignadas[0].roco2Trim + elemento.unidad_pertenece.metas_asignadas[0].roco3Trim + elemento.unidad_pertenece.metas_asignadas[0].roco4Trim;
            metaAcumEstandares = elemento.unidad_pertenece.metas_asignadas[0].ecl1Trim  + elemento.unidad_pertenece.metas_asignadas[0].ecl2Trim  + elemento.unidad_pertenece.metas_asignadas[0].ecl3Trim  + elemento.unidad_pertenece.metas_asignadas[0].ecl4Trim;
          }
      }

      datos.push({
        unidad: ( elemento.idUnidadAdmtva == 1 ? 'Cursos en línea' : elemento.unidad_pertenece.nombre),
        gruposRegular: elemento.gruposRegular,
        inscritosRegular: elemento.inscritosRegular,
        metaAcumRegular: metaAcumRegular,
        gruposExtension: elemento.gruposExtension,
        inscritosExtension: elemento.inscritosExtension,
        metaAcumExtension: metaAcumExtension,
        gruposCae: elemento.gruposCae,
        inscritosCae: elemento.inscritosCae,
        metaAcumCae: metaAcumCae,
        inscritosRoco: elemento.inscritosRoco,
        metaAcumRoco: metaAcumRoco,
        inscritosEstandares: elemento.inscritosEstandares,
        metaAcumEstandares: metaAcumEstandares,
        gruposTotal: elemento.gruposTotal,
        inscritosTotal: elemento.inscritosTotal,
        metaAcumTotal: (metaAcumRegular + metaAcumExtension + metaAcumCae + metaAcumRoco + metaAcumEstandares)
      });


      totalEdo.gruposRegular       += elemento.gruposRegular;
      totalEdo.inscritosRegular    += elemento.inscritosRegular;
      totalEdo.metaAcumRegular     += metaAcumRegular;
      totalEdo.gruposExtension     += elemento.gruposExtension;
      totalEdo.inscritosExtension  += elemento.inscritosExtension;
      totalEdo.metaAcumExtension   += metaAcumExtension;
      totalEdo.gruposCae           += elemento.gruposCae;
      totalEdo.inscritosCae        += elemento.inscritosCae;
      totalEdo.metaAcumCae         += metaAcumCae;
      totalEdo.inscritosRoco       += elemento.inscritosRoco;
      totalEdo.metaAcumRoco        += metaAcumRoco;
      totalEdo.inscritosEstandares += elemento.inscritosEstandares;
      totalEdo.metaAcumEstandares  += metaAcumEstandares;
      totalEdo.gruposTotal         += elemento.gruposTotal;
      totalEdo.inscritosTotal      += elemento.inscritosTotal;
      totalEdo.metaAcumTotal       += (metaAcumRegular + metaAcumExtension + metaAcumCae + metaAcumRoco + metaAcumEstandares);
    }

    datos.unshift(totalEdo);

    return datos || { };
  }


  /*getDetalleUnidad(idUnidadAdmtva: number) {
    if(idUnidadAdmtva === 0)
    {
        return this.http.get(AppConstants.apiUrl + 'MatriculaXUnidadTipos?filter={"include": [{"relation": "unidad_pertenece","scope":{"fields":["nombre"]}}]}')
                   .toPromise()
                   .then(this.extractDataTotalEdo)
                   .catch(this.handleError);
    }
    else
    {
        return this.http.get(`${AppConstants.apiUrl}MatriculaXUnidadTipos/${idUnidadAdmtva}?filter={"include": [{"relation": "unidad_pertenece","scope":{"fields":["nombre"]}}]}`)
                   .toPromise()
                   .then(this.extractData)
                   .catch(this.handleError);      
    }

  }*/


  /*private extractDataTotalEdo(res: Response) {
    let body = res.json();
    let totalEdo: any;

    totalEdo = {
        id                  : 0,
        fechaCorte          : '',
        idUnidadAdmtva      : 0,
        gruposRegular       : 0,
        inscritosRegular    : 0,
        gruposExtension     : 0,
        inscritosExtension  : 0,
        gruposCae           : 0,
        inscritosCae        : 0,
        inscritosRoco       : 0,
        inscritosEstandares : 0,
        gruposTotal         : 0,
        inscritosTotal      : 0,
        unidad_pertenece    :{idUnidadAdmtva: 0, nombre: 'Estatal'}
    }

    for (let elemento of body) {
      totalEdo.gruposRegular       += elemento.gruposRegular;
      totalEdo.inscritosRegular    += elemento.inscritosRegular;
      totalEdo.gruposExtension     += elemento.gruposExtension;
      totalEdo.inscritosExtension  += elemento.inscritosExtension;
      totalEdo.gruposCae           += elemento.gruposCae;
      totalEdo.inscritosRoco       += elemento.inscritosRoco;
      totalEdo.inscritosEstandares += elemento.inscritosEstandares;
      totalEdo.gruposTotal         += elemento.gruposTotal;
      totalEdo.inscritosTotal      += elemento.inscritosTotal;
    }
    //console.log(totalEdo);
    return totalEdo || { };
  }*/



  /*private extractData(res: Response) {
    let body = res.json();
    //console.log(body);
    return body || { };
  }*/

  private handleError (error: Response | any) {

    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Promise.reject(errMsg);
  }

}
