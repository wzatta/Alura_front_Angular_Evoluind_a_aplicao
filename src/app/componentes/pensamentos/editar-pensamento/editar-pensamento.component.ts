import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pensamento } from 'src/app/model/pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  formEdit!: FormGroup;

   constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ){
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')??'';
    this.service.buscarPorId(id).subscribe((result)=> {
      this.formEdit = this.formBuilder.group({
        id:[result.id],
        conteudo:[result.conteudo,[Validators.required, Validators.minLength(5)]],
        autoria: [result.autoria, [Validators.required, Validators.minLength(5)]],
        modelo:  [result.modelo, [Validators.required]]
      })
    })
  }

  editarPensamento(){
    if(this.formEdit.valid){
    this.service.editar(this.formEdit.value).subscribe(()=>{
      this.router.navigate(['/listarPensamento']);
    })
  }
}

  cancelar(){
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao():string {
    if(this.formEdit.valid){
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }

}
