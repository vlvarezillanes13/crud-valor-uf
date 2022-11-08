import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { IValor } from 'src/app/interfaces/valor.interface';
import { ValoresService } from 'src/app/services/valores/valores.service';
import { Itoken } from '../../interfaces/token.interface';
import { data } from 'src/app/utils/data';

@Component({
  selector: 'app-listar-valores',
  templateUrl: './listar-valores.component.html',
  styleUrls: ['./listar-valores.component.css']
})
export class ListarValoresComponent implements OnInit {

  valoresGuardarBD: IValor[] = [];
  valores:IValor[] = [];

  constructor(
    private valoresService: ValoresService
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this.valoresService.obtenerValoreApi().subscribe(
      (valores:IValor[]) => {
        this.valores = valores;
      }
    )
  }

  mostrarAlerta(valor: IValor){
    Swal.fire({
      title: 'Esta seguro que desea eliminarlo?',
      text: `Se eliminara el valor con el id #${valor.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarValor( valor.id!.toString());
      }
    })
  }

  eliminarValor(id: string){
    this.valoresService.eliminarValorApi( id ).subscribe( valor => {
      if( valor){
        this.cargarDatos();
        Swal.fire({
          icon: 'success',
          title: 'Valor Eliminado',
          text: 'Lista Actualizada',
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal al eliminar!',
        })
      }
    })
  }


  //almacenar valores en BD
  almacenarDatosDB(): void{
    //filtrar UF
    this.valoresGuardarBD = data.filter( (valor:IValor) =>  valor.codigoIndicador == "UF")
    //guardar base de datos
    this.valoresService.guardarValores( this.valoresGuardarBD ).subscribe(
      (resp: boolean) => {
        if(resp){
          console.log("Datos guardados!");
        }else{
          console.error("Error al guardar los datos!");
        }
      }
    );
    
  }

}
