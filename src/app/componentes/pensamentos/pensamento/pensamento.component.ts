import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from 'src/app/model/pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  @Input() pensamento:Pensamento = {
    id: '',
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  @Input() listaDeFavoritos: Pensamento[]=[];

  constructor(private service: PensamentoService){}

  ngOnInit(): void {

  }

  larguraPensamento():string {
    if(this.pensamento.conteudo.length >=256){
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  mudarIconeFavorito():string {
    if(this.pensamento.favorito==false){
      return 'inativo'
    } else {
      return 'ativo'
    }
  }

  atualizarFavorito() {
    this.service.mudarFavorito(this.pensamento).subscribe(()=> {

      this.listaDeFavoritos.splice(this.listaDeFavoritos.indexOf(this.pensamento),1);
    })
  }

}
