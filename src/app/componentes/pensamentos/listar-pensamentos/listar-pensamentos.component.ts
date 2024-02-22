import { Component, OnInit } from '@angular/core';
import { PensamentoComponent } from '../pensamento/pensamento.component';
import { Pensamento } from 'src/app/model/pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';
import { Observable } from 'rxjs';

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

  constructor(private service: PensamentoService){
  }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro).subscribe((result)=>{
      this.listaPensamentos = result;
    });
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro).subscribe(result => {
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
    this.service.listar(this.paginaAtual, this.filtro).subscribe(result => {
      this.listaPensamentos = result;
    })
  }}


}
