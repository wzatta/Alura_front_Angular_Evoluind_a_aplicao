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

  constructor(private service: PensamentoService){
  }

  ngOnInit(): void {
    this.service.listar().subscribe((result)=>{
      this.listaPensamentos = result;
    });
  }

  adicionarPensamentos() {
    alert("mudar rota")
}

}
