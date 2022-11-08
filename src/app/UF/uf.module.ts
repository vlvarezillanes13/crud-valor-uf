import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { UFRoutingModule } from './uf-routing.module';
import { ListarValoresComponent } from './listar-valores/listar-valores.component';
import { CrearValorComponent } from './crear-valor/crear-valor.component';
import { ActualizarValorComponent } from './actualizar-valor/actualizar-valor.component';
import { MaterialModule } from '../utils/material/material.module';
import { ComponentsModule } from '../components/components.module';
import { VistaGraficoComponent } from './vista-grafico/vista-grafico.component';


@NgModule({
  declarations: [
    ListarValoresComponent,
    CrearValorComponent,
    ActualizarValorComponent,
    VistaGraficoComponent,
  ],
  imports: [
    CommonModule,
    UFRoutingModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UFModule { }
