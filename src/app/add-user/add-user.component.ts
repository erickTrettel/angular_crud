import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioService } from "../usuario.service";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private usuarioService: UsuarioService) { }

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      email: ['', Validators.required]
    });

  }

  addUsuario() {
    this.usuarioService.createUsuario(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['list-user']);
      });
  }

}
