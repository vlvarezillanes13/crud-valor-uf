import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input'



@NgModule({
  declarations: [],
  imports: [
    MatDividerModule,
    MatInputModule
  ],
  exports:[
    MatDividerModule,
    MatInputModule
  ]
})
export class MaterialModule { }
