import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Pensamento } from 'src/app/model/pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css']
})
export class CriarPensamentosComponent implements OnInit {

  form!:FormGroup;

  constructor(private service: PensamentoService,
              private router: Router,
              private formBuilder: FormBuilder
              ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      conteudo:[''],
      autoria:[''],
      modelo:['']
    });
  }

  criarPensamento() {
    this.service.criar(this.form.value).subscribe(()=> {
      this.router.navigate(['/listarPensamento']);
    });
   }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
    }

}
