import { Pensamento } from './../model/pensamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos'

  constructor(private http: HttpClient) { }

  listar(pagina:number, filtro:string): Observable<Pensamento[]> {
    const itemPorPagina:number = 6;
   let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itemPorPagina);

      if(filtro.trim().length>2){
        params = params.set("q",filtro);
      }

   return this.http.get<Pensamento[]>(this.API, {params});
  }

  criar(pensamento: Pensamento):Observable<Pensamento>{
    return this.http.post<Pensamento>(this.API,pensamento);
  }

  editar(pensamento:Pensamento):Observable<Pensamento>{
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento);
  }

  excluir(id:string):Observable<Pensamento>{
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }

  buscarPorId(id:string):Observable<Pensamento>{
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }




}
