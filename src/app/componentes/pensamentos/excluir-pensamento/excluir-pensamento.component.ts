import { PensamentoService } from 'src/app/services/pensamento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pensamento } from 'src/app/model/pensamento';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css']
})
export class ExcluirPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id: '',
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ){

  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.service.buscarPorId(id).subscribe((result) => {
      this.pensamento = result;
    })
  }

  excluirPensamento(){
    if(this.pensamento.id){
    this.service.excluir(this.pensamento.id).subscribe(()=> {
      this.router.navigate(['/listarPensamento'])
    })
  }}

  cancelar(){
    this.router.navigate(['/listarPensamento']);
  }

}
