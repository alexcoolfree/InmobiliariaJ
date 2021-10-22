import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Remision } from '../interfaces/remision';
import { Transaccion } from '../interfaces/transaccion';
import { ContratosService } from './contratos.service';

@Injectable({
  providedIn: 'root'
})
export class RemisionesService {

  private URL = 'http://192.168.2.15:3000/api/remision';
  transaccion: Transaccion = {
    _id: '',
    fecha: '',
    tipo: '',
    concepto: '',
    monto: 0,
    saldo: 0,
    adjuntoId: '',
    noContrato: 0,
    createdAt: ''
  }

  constructor(private http: HttpClient, private contrService: ContratosService) { }

  GetRemisiones(noContrato: number){
    return this.http.get<Remision[]>(this.URL + '/remisiones/' + noContrato);
  }

  CrearRemision(remision: Remision){
    return this.http.post<Boolean>(this.URL + '/nueva', remision);
  }
}
