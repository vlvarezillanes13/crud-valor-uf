import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IValor } from 'src/app/interfaces/valor.interface';
import { Itoken } from '../../interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class ValoresService {

  private baseUrlValores: string = "https://postulaciones.solutoria.cl/api";
  private baseUrlApi: string = "http://localhost:8081/api/valor";

  constructor(
    private http: HttpClient
  ) { }

  obtenerToken(): Observable<Itoken>{
    const data = {
      "userName": "vicentealvarezillanes5_ahq@indeedemail.com",
      "flagJson": true
    }
    return this.http.post<Itoken>(`${this.baseUrlValores}/acceso`, data);
  }

  obtenerValores( token: string ): Observable<IValor[]>{
    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    })
    return this.http.get<IValor[]>(`${this.baseUrlValores}/indicadores`,{ headers:reqHeaders});
  }

  guardarValores( valores: IValor[]): Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrlApi }/addValores`, valores)
  }

  obtenerValoreApi(): Observable<IValor[]>{
    return this.http.get<IValor[]>(`${this.baseUrlApi}/getAllValores`);
  }

  obtenerValorApi(id: string): Observable<IValor>{
    return this.http.get<IValor>(`${this.baseUrlApi}/getValor/${id}`);
  }

  guardarValorApi( valor : IValor): Observable<IValor>{
    return this.http.post<IValor>(`${this.baseUrlApi}/addValor`, valor);
  }

  actualizarValorApi( valor : IValor): Observable<IValor>{
    return this.http.put<IValor>(`${this.baseUrlApi}/updateValor`, valor);
  }

  eliminarValorApi( id: string): Observable<IValor>{
    return this.http.delete<IValor>(`${this.baseUrlApi}/deleteValor/${id}`);
  }

}
