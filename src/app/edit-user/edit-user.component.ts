import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from "@angular/router";
import { Usuario } from '../usuario';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  usuario: Usuario;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    let usuarioId = localStorage.getItem("editUsuarioId");
    if (!usuarioId) {
      alert("Ação inválida")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.usuarioService.getUsuarioById(+usuarioId)
      .subscribe(data => {
        this.editForm.setValue(data);
      });
  }

  editarUsuario() {
    this.usuarioService.updateUsuario(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-user']);
        },
        error => {
          alert(error);
        });
  }

}