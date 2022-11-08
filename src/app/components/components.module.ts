import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { GraficoUFComponent } from './grafico-uf/grafico-uf.component';
import { MaterialModule } from '../utils/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GraficoUFComponent
  ],
  imports: [
    CommonModule,
    Ng2GoogleChartsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    GraficoUFComponent
  ]
})
export class ComponentsModule { }