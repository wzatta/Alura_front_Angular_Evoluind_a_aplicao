import { Component, OnInit } from '@angular/core';
import { PensamentoComponent } from '../pensamento/pensamento.component';
import { Pensamento } from 'src/app/model/pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos:boolean = true;
  filtro:string = '';
  favoritos:boolean = false;
  listaDeFavoritos: Pensamento[] = [];
  titulo:string = "Meu Mural"

  constructor(
    private service: PensamentoService,
    private router: Router,){
  }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((result)=>{
      this.listaPensamentos = result;
    });
  }

  carregarMaisPensamentos(){
    alert(this.favoritos)
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe(result => {
      this.listaPensamentos.push(...result);
      if(!result.length){
        this.haMaisPensamentos = false;
      }
    })
  }

  pesquisarPensamentos(){
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    if(this.filtro.trim().length>=4){
    this.service.listar(this.paginaAtual, this.filtro,this.favoritos).subscribe(result => {
      this.listaPensamentos = result;
    })
  }}

  listarPensamentosFavoritos() {
    this.favoritos=true;
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    this.titulo = "Favoritos"
    this.service.listar(this.paginaAtual, this.filtro,this.favoritos).subscribe(resultFavoritos=>{
      this.listaPensamentos = resultFavoritos;
      this.listaDeFavoritos = resultFavoritos;
    })
  }

  recarregarComponent(){

    this.favoritos = false;
    this.paginaAtual = 1;

    this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }


}
