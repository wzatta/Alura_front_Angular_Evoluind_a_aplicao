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

  listar(pagina:number): Observable<Pensamento[]> {
    const itemPorPagina = 6;

   /* const url = `${this.API}?_page=${pagina}&_limit=${itemPorPagina}`
    //GET /posts?_page=7&_limit=20
    return this.http.get<Pensamento[]>(url);*/

   let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itemPorPagina);
   return this.http.get<Pensamento[]>(this.API+"/", {params});
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
