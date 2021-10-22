import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaccion } from '../interfaces/transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  private URL = 'http://192.168.2.15:3000/api/transaccion';

  constructor(private http: HttpClient) { }

  GenerarTransaccion(transaccion: Transaccion){
    return this.http.post<boolean>(this.URL + '/nueva', transaccion);
  }

  TransaccionInicial(transaccion: Transaccion){
    return this.http.post<boolean>(this.URL + 'transaccion_inicial', transaccion);
  }

  GetTransaccionesByContrato(noContrato: number){
    return this.http.get<Transaccion[]>(this.URL + '/todas_by_contrato/' + noContrato);
  }

  UltimaTransaccionPorContrato(noContrato: number){
    return this.http.get<Transaccion>(this.URL + '/ultima_por_contrato/' + noContrato);
  }

  GetTransaccionesEmpresa(){
    return this.http.get<Transaccion[]>(this.URL + '/transacciones_empresa');
  }
}
