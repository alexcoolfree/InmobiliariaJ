import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrato } from '../interfaces/contrato';
import { InquilinosService } from './inquilinos.service';
import { PropiedadesService } from './propiedades.service';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  private URL = 'http://localhost:3000/api/contrato';

  constructor(private http:HttpClient, private propService: PropiedadesService, private inquiService: InquilinosService) { }

  GetContratos(){
    return this.http.get<Contrato[]>(this.URL + '/todos');
  }

  GetContratosActivos(){
    return this.http.get<Contrato[]>(this.URL + '/activos');
  }

  GetContratosPorVencer(){
    return this.http.get<Contrato[]>(this.URL + '/vencer');
  }

  GetContratosArchivados(){
    return this.http.get<Contrato[]>(this.URL + '/archivados');
  }

  AgregarContrato(contrato: Contrato){
    return this.http.post<boolean>(this.URL + '/nuevo', contrato);  
  }

  GetContrato(contrId: string){
    return this.http.get<Contrato>(this.URL + '/get/' + contrId);
  }
}
