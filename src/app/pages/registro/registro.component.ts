import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { CuentaService } from './../../services/cuenta.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  userForm:FormGroup;

  constructor(private cuentaService:CuentaService) { 

    
    this.userForm = new FormGroup({
      'titular_nombre': new FormControl('', Validators.required), 
      'titular_apellido': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'repassword': new FormControl('', Validators.required),
      'acuerdo': new FormControl('', Validators.required), 
      'titular_direccion': new FormControl('', Validators.required), 
      'titular_telefono': new FormControl('', Validators.required), 
      });
  }

  ngOnInit() {
  }

  crearUsuario(){
    console.log(this.userForm);
    if(this.userForm.value.password === this.userForm.value.repassword){
      if(this.userForm.value.acuerdo){

        try {
          this.cuentaService.crearCuenta(this.userForm.value)
            .subscribe(resp => {
                console.log(resp);
                swal({   
                  type: 'success',
                  title: 'Usuario registrado',
                  text: 'Su cuenta fue creada satisfactoriamente',
                  showConfirmButton: false,
                  timer: 4000
                });
                this.userForm.reset();
            },
            error => { // error path

                console.log(error);                
              if(error.status === 422){
                swal({   
                  type: 'warning',
                  title: 'Usuario existente',
                  text: 'La casilla de correo '+error.error+' ya exíste',
                  showConfirmButton: false,
                  timer: 3000
                })
              }
            //    this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message);
             });    
        } catch (error) {
          console.log(String(error.status));  
        }  
      }else{
        swal({   
          type: 'warning',
          title: 'Atención..',
          text: 'Debe aceptar los términos',
          showConfirmButton: false,
          timer: 3000
        })
      }

    }else{

      swal({   
        type: 'warning',
        title: 'Atención..',
        text: 'El campo contraseña no es igual',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }

  registrarse(){}

}
