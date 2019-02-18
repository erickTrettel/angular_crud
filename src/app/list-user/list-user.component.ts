import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsuarioService } from "../usuario.service";
import { Usuario } from "../usuario";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarios()
      .subscribe(data => {
        this.usuarios = data;
      });
  }

  deleteUsuario(usuario: Usuario): void {
    this.usuarioService.deleteUsuario(usuario.id)
      .subscribe(data => {
        this.usuarios = this.usuarios.filter(u => u !== usuario);
      })
  };

  editUsuario(usuario: Usuario): void {
    localStorage.removeItem("editUsuarioId");
    localStorage.setItem("editUsuarioId", usuario.id.toString());
    this.router.navigate(['edit-user']);
  };

  addUsuario(): void {
    this.router.navigate(['add-user']);
  };
}
