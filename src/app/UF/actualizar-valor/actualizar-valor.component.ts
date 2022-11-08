import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValoresService } from 'src/app/services/valores/valores.service';
import { IValor } from '../../interfaces/valor.interface';

@Component({
  selector: 'app-actualizar-valor',
  templateUrl: './actualizar-valor.component.html',
  styleUrls: ['./actualizar-valor.component.css'],
})
export class ActualizarValorComponent implements OnInit {
  valor!: IValor;
  miFormulario: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    codigo: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    unidad: ['', [Validators.required]],
    valor: ['', [Validators.required, Validators.min(0)]],
    fecha: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private valoresService: ValoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerValor();
  }

  get fechaValor() {   
    const now = new Date(this.valor.fechaIndicador);   
    let month = (now.getMonth() + 1).toString();
    let day = (now.getDate()+1).toString();
    if (parseInt(month) < 10) month = '0' + month;
    if (parseInt(day) < 10) day = '0' + day;
    return now.getFullYear() + '-' + month + '-' + day;
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    const newValor: IValor = {
      id: this.valor.id,
      nombreIndicador: this.miFormulario.controls['nombre'].value,
      codigoIndicador: this.miFormulario.controls['codigo'].value,
      unidadMedidaIndicador: this.miFormulario.controls['unidad'].value,
      valorIndicador: this.miFormulario.controls['valor'].value,
      fechaIndicador: this.miFormulario.controls['fecha'].value,
    };

    this.valoresService.actualizarValorApi(newValor).subscribe((valor: IValor) => {
      if (valor) {
        Swal.fire({
          icon: 'success',
          title: 'Valor Modificado',
          text: 'Ahora podrás verlo en la lista!',
        });
        this.router.navigate(['../listado']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal al modificar!',
        });
      }
    });
  }

  obtenerValor(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');

      if (id) {
        this.valoresService.obtenerValorApi( id ).subscribe((valor) => {
          this.valor = valor;

          this.miFormulario = this.fb.group({
            codigo: [this.valor.codigoIndicador, [Validators.required]],
            nombre: [this.valor.nombreIndicador, [Validators.required]],
            unidad: [this.valor.unidadMedidaIndicador, [Validators.required]],
            valor: [
              this.valor.valorIndicador,
              [Validators.required, Validators.min(0)],
            ],
            fecha: [this.fechaValor, [Validators.required]],
          });
        });
      }
    });
  }
}
