import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { switchMap } from 'rxjs';
import { ValoresService } from 'src/app/services/valores/valores.service';
import { IValor } from '../../interfaces/valor.interface';

@Component({
  selector: 'app-grafico-uf',
  templateUrl: './grafico-uf.component.html',
  styleUrls: ['./grafico-uf.component.css']
})
export class GraficoUFComponent implements OnInit {

  valores:IValor[] = [];
  desdeInicial!: Date;
  hastaInicial!: Date;
  miFormulario: FormGroup = this.fb.group({
    desde:[ '', [Validators.required, ], []],
    hasta:[ '', [Validators.required, ], []],
  });
  

  public data: GoogleChartInterface = {
    chartType: GoogleChartType.ColumnChart,
    dataTable: [
      ['Fecha', 'Valor'],
    ],
    options: {'title': 'Gráfico de valores'},
  };

  

  constructor(
    private fb: FormBuilder, 
    private valoresService: ValoresService
  ) { }

  ngOnInit(): void {
    this.cargarDatos();  
  }


  cargarDatos(){
    this.valoresService.obtenerValoreApi().subscribe(
      (valores:IValor[]) => {
        this.valores = valores;
        if( this.valores.length > 0){
        this.ordenarFechas();
        this.fechasFormulario()
        this.desdeInicial = new Date(this.valores[0].fechaIndicador)
        this.desdeInicial.setDate(this.desdeInicial.getDate() + 1);
        this.hastaInicial =  new Date(this.valores[this.valores.length -1].fechaIndicador);
        this.hastaInicial.setDate(this.hastaInicial.getDate() + 1);
        this.entregarValorGrafico( this.desdeInicial, this.hastaInicial);
        this.cambiosFechas();
        }
      }
    )

    this.cambiosFechas();
  }

  ordenarFechas(): void{
    this.valores = this.valores.sort( (valor1: IValor, valor2: IValor) => {
      return this.fechaValor(valor1.fechaIndicador) - this.fechaValor( valor2.fechaIndicador );
    })
  }

  fechaValor( fecha: string): number{ 
    let date = new Date(fecha);
    date.setDate(date.getDate() + 1);
    return date.getTime();
  }

  entregarValorGrafico( desde:Date, hasta:Date): void{    
    this.data.dataTable = [
      ['Fecha', 'Valor']
    ]
    this.valores.map( (valor: IValor) => {
      const date = new Date(valor.fechaIndicador)
      date.setDate(date.getDate() + 1);
      if( date >= desde && date <= hasta) this.data.dataTable.push([date.toLocaleDateString(), valor.valorIndicador])
    });
  }

  fechasFormulario(){    
    this.miFormulario = this.fb.group({
      desde:[ this.valores[0].fechaIndicador, [Validators.required, ], []],
      hasta:[ this.valores[this.valores.length -1].fechaIndicador,[Validators.required ], []],
    });
  }


  cambiosFechas(){    
    this.miFormulario.get('desde')?.valueChanges
      .subscribe(
        ( desde: Date) => {
          this.desdeInicial = new Date(desde);
          this.desdeInicial.setDate(this.desdeInicial.getDate() + 1);
          this.entregarValorGrafico( this.desdeInicial, this.hastaInicial);
          this.data.component?.draw();
        }
    )

    this.miFormulario.get('hasta')?.valueChanges
      .subscribe(
        ( hasta: Date) => {
          this.hastaInicial = new Date(hasta);
          this.hastaInicial.setDate(this.hastaInicial.getDate() + 1);
          this.entregarValorGrafico( this.desdeInicial, this.hastaInicial);
          this.data.component?.draw();
        }
    )
  }
}
