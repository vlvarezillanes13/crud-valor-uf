import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoUFComponent } from './grafico-uf.component';

describe('GraficoUFComponent', () => {
  let component: GraficoUFComponent;
  let fixture: ComponentFixture<GraficoUFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoUFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoUFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
