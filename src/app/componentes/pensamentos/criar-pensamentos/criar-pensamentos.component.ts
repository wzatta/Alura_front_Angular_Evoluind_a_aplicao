import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pensamento } from 'src/app/model/pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';
import { minusculoValidator } from './minusculoValidators';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css']
})
export class CriarPensamentosComponent implements OnInit {

  form!: FormGroup;

  constructor(private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      conteudo: ['', [Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/), Validators.minLength(5)]],
      autoria: ['', [Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/), Validators.minLength(5), minusculoValidator]],
      modelo: ['', [Validators.required]],
      favorito: [false]
    });
  }

  criarPensamento() {
     if (this.form.valid) {
      this.service.criar(this.form.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }
  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string {
    if(this.form.valid){
      return 'botao';
    } else{
      return 'botao__desabilitado';
    }
  }

}
