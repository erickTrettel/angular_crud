import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get<Usuario[]>(this.url);
  }

  getUsuarioById(id: number) {
    return this.http.get<Usuario>(this.url + '/' + id);
  }

  createUsuario(user: Usuario) {
    return this.http.post(this.url, user);
  }

  updateUsuario(user: Usuario) {
    return this.http.put(this.url + '/' + user.id, user);
  }

  deleteUsuario(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

}
