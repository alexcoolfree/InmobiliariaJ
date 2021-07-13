import { Component, OnInit } from '@angular/core';
import { Propiedad } from 'src/app/interfaces/propiedad';
import { PropiedadesService } from 'src/app/servicios/propiedades.service';
import { faEye, faMoneyBillAlt, faTrashAlt, faTools } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { PropiedadDialogComponent } from '../dialogs/propiedad-dialog/propiedad-dialog.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { MantenimientoDialogComponent } from '../dialogs/mantenimiento-dialog/mantenimiento-dialog.component';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent implements OnInit {

  //Variables
  faEye = faEye;
  faMoneyBillAlt = faMoneyBillAlt;
  faTrashAlt = faTrashAlt;
  faTools = faTools;

  propiedades: Propiedad[] = [];
  propiedadActiva: Propiedad = {
    _id: '',
    predial: '',
    tipo: '',
    estadoRenta: 'Disponible',
    direccion: {
      calle: '',
      no_ext: '',
      no_int: '',
      colonia: '',
      c_p: 0,
      ciudad: '',
      estado: ''
    }
  };
  
  
  //Default Methods
  constructor(public authService:AuthService, private propService: PropiedadesService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.VerificarToken();
    this.GetDisponibles();
  }

  //Custom Methods
  NuevaPropiedad(){
    this.ClearFields();
    const dialogRef = this.matDialog.open(PropiedadDialogComponent, {
      data: {
        tituloVentana: "Nueva Propiedad",
        propiedadActiva: this.propiedadActiva
      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(res => {
      this.GetDisponibles();
    });
  }

  ClearFields(){
    this.propiedadActiva._id = '';
    this.propiedadActiva.predial = '';
    this.propiedadActiva.tipo = '';
    this.propiedadActiva.estadoRenta = 'Disponible';
    this.propiedadActiva.direccion.calle = '';
    this.propiedadActiva.direccion.no_ext = ''
    this.propiedadActiva.direccion.no_int = ''
    this.propiedadActiva.direccion.colonia = ''
    this.propiedadActiva.direccion.c_p = 0;
    this.propiedadActiva.direccion.ciudad = ''
    this.propiedadActiva.direccion.estado = ''
  }

  GetDisponibles(){
    this.propService.GetPropiedadesDisponibles().subscribe(
      res => {
        this.propiedades = res;
      },
      err => console.log(err)
    )
  }

  GetRentadas(){
    this.propService.GetPropiedadesRentadas().subscribe(
      res => {
        this.propiedades = res;
      },
      err => console.log(err)
    )
  }

  VerPropiedad(prop: Propiedad){
    this.propiedadActiva = prop;
    const dialogRef = this.matDialog.open(PropiedadDialogComponent, {
      data: {
        tituloVentana: "Editar Propiedad",
        propiedadActiva: this.propiedadActiva
      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(res => {
      this.GetDisponibles();
    });
  }

  EliminarPropiedad(propId: string){
    if(confirm("¿Realmente desea eliminar la propiedad?")){
      this.propService.BorrarPropiedad(propId).subscribe(
        res => {
          if(res){
            alert("Se ha eliminado correctamente");
            this.GetDisponibles();
          }else{
            alert("Sucedió un error al intentar eliminar la propiedad.");
          }
        },
        err => console.log(err)
      )
    }
  }

  AbrirMtto(prop: Propiedad){
    const dialogRef = this.matDialog.open(MantenimientoDialogComponent, {
      data: {
        tituloVentana: "Mantenimientos",
        propiedadActiva: prop
      },
      width: "1200px"
    });
  }
}