import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IValor } from '../../interfaces/valor.interface';
import { ValoresService } from '../../services/valores/valores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-valor',
  templateUrl: './crear-valor.component.html',
  styleUrls: ['./crear-valor.component.css']
})
export class CrearValorComponent implements OnInit {

  miFormulario:FormGroup = this.fb.group({

    codigo: ['', [Validators.required], ],
    nombre: ['', [Validators.required], ],
    unidad: ['', [Validators.required], ],
    valor: ['', [Validators.required, Validators.min(0) ], ],
    fecha: [this.fechaValor, [Validators.required], ],
  })

  constructor(
    private fb: FormBuilder,
    private valoresService: ValoresService,
    private router: Router
  ) { }

  ngOnInit(): void {   
  }

  get fechaValor(){
    const now = new Date();
    let month = (now.getMonth() + 1).toString();               
    let day = now.getDate().toString();
    if ( parseInt(month) < 10)
        month = "0" + month;
    if (parseInt(day) < 10) 
        day = "0" + day;
    return now.getFullYear() + '-' + month + '-' + day;
  }

  campoEsValido( campo: string){

    return  this.miFormulario.controls[campo].errors &&
            this.miFormulario.controls[campo].touched;
  }


  guardar(){

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }

    const newValor: IValor =  {
      nombreIndicador: this.miFormulario.controls['nombre'].value,
      codigoIndicador: this.miFormulario.controls['codigo'].value,
      unidadMedidaIndicador:this.miFormulario.controls['unidad'].value,
      valorIndicador: this.miFormulario.controls['valor'].value,
      fechaIndicador: this.miFormulario.controls['fecha'].value
    }

    this.valoresService.guardarValorApi( newValor ).subscribe( 
      (valor: IValor) => {
        if( valor ){
          Swal.fire({
            icon: 'success',
            title: 'Valor Agregado',
            text: 'Ahora podrás verlo en la lista!',
          })
          this.router.navigate(['../listado'])
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salio mal al agregar!',
          })
        }
      }
    )
  }

}
