import { Component, OnInit } from '@angular/core';
import { CuentaService } from './../../../services/cuenta.service';
import { User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';
import * as $ from 'jquery';
import { AuthenticationService } from './../../../services/authentication.service';

import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

   
  user:User;
  loggedIn:boolean = false;
 
  mantenimiento_stock_insumo:boolean =true;
  mantenimiento_stock_lente:boolean =true;
  mantenimiento_otros:boolean =true;
  facturacion_consulta:boolean =true;
  facturacion_control:boolean =true;
  medico_consulta:boolean =true;
  medico_control:boolean =true;
  quirofano_consulta:boolean =true;
  quirofano_control:boolean =true;
  asesoramiento_control:boolean =true;
  asesoramiento_consulta:boolean =true;
  recepcion_consulta:boolean =true;
  recepcion_control:boolean =true;
  administrador:boolean =true;
  estudios_consulta:boolean =true;
  estudios_control:boolean =true;
  gerencia_control:boolean =true;

  public username:string;
  public puesto:string;
  elemento:User = null;
  elementoModulo:[] = null;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  notificaciones:number= 0;
  chats:boolean;
  userData:any;
  cuentaDatos:any = null;

  nombreyapellido:string;
  email:string;
  cantidad_clinicas:string;
  cantidad_usuarios:string;
  clinica:string;
  cuenta_estado:string;
  importe_mensual:string;
  name:string;
  fecha_alta:string;

  constructor( private cuentaService:CuentaService,  private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private miServico:UserService) { }
    

    ngOnInit() {

      /*======== JQUERY DEL LOGUIN =========*/
      $(document).ready
      (function ($) {
        "use strict";
    
    
        /*==================================================================
        [ Focus Contact2 ]*/
        $('.input100').each(function(){
            $(this).on('blur', function(){
                if($(this).val().trim() != "") {
                    $(this).addClass('has-val');
                }
                else {
                    $(this).removeClass('has-val');
                }
            })    
        })
      
      
        /*==================================================================
        [ Validate ]*/
        var input = $('.validate-input .input100');
    
        $('.validate-form').on('submit',function(){
            var check = true;
    
            for(var i=0; i<input.length; i++) {
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check=false;
                }
            }
    
            return check;
        });
    
    
        $('.validate-form .input100').each(function(){
            $(this).focus(function(){
               hideValidate(this);
            });
        });
    
        function validate (input) {
            if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
                if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                    return false;
                }
            }
            else {
                if($(input).val().trim() == ''){
                    return false;
                }
            }
        }
    
        function showValidate(input) {
            var thisAlert = $(input).parent();
    
            $(thisAlert).addClass('alert-validate');
        }
    
        function hideValidate(input) {
            var thisAlert = $(input).parent();
    
            $(thisAlert).removeClass('alert-validate');
        }
        
    
    });
    
        /*======== FIN JQUERY DEL LOGUIN =========*/
   
       this.loginForm = this.formBuilder.group({
         username: ['', Validators.required],
         password: ['', Validators.required],
         puesto: ['0']
     });
   
       let currentUser = JSON.parse(localStorage.getItem('currentUser'));
       let userCuenta = JSON.parse(localStorage.getItem('userCuenta'));
       
   if(currentUser['access_token'] != ''){
     let userData = JSON.parse(localStorage.getItem('userData'));
     console.log(userData);
     console.log('usuario logueado');
     this.loggedIn = true;
        this.username = userData['username'];
        this.puesto = userData['puesto'];
        console.log(userData['access_list']);
     //   this.asignarModulos(userData['access_list']);
      
        /*** busco notificaciones si esta logueado*/
     
       // this.menuList();
       if(userCuenta){
         console.log(userCuenta);
        
       }
   }else{
     console.log("sin credenciales");
     this.throwAlert('error','Usuario o contraseña incorrectos',  'Verifique el usuario y contraseña, su sesion puede haber expirado','500');
   }
      
   }

   get f() { return this.loginForm.controls; }

   onSubmit() {
      
     this.submitted = true;
   
     // stop here if form is invalid
     if (this.loginForm.invalid) {
         return;
     }
   
     this.loading = true;
     this.authenticationService.login(this.f.username.value, this.f.password.value)
        // .pipe(first())
         .subscribe(
             data => {
               console.log(data);
               this.user = data;
               let us = new User("","","","","",this.f.username.value,this.f.password.value,[]);
               localStorage.setItem('userData', JSON.stringify(us));
               localStorage.setItem('currentUser', JSON.stringify(this.user));
               //  this.router.navigate([this.returnUrl]);
               this.loadUser();
             },
             error => {
            
               console.log(error);
                 this.error = error;
                 this.loading = false;
             });
   }
   
   ver(){
   let currentUser = JSON.parse(localStorage.getItem('currentUser'));
   console.log(currentUser['access_token']);
   }
   
   loadUser(){
   
   this.loading = true;
   try {
     this.miServico.getItemInfoAndMenu(this.f.username.value)
       .subscribe(resp => {
       this.elemento = resp;
      // this.elementoModulo = this.elemento["access_list"]
          let currentUser =  JSON.parse(localStorage.getItem('currentUser'));
           this.userData = JSON.parse(localStorage.getItem('userData'));
          console.log(this.elemento);
          this.elementoModulo = <any>this.elemento;
         this.user = new User(this.elemento[0]['id'] , this.elemento[0]['email'], this.elemento[0]['nombreyapellido'],
          this.elemento[0]['name'],'1',this.elemento[0]['email'], currentUser['access_token'],this.elementoModulo);
          this.username = this.userData['username'];
          this.puesto = this.userData['puesto'];
          localStorage.removeItem('userData');
          localStorage.setItem('userData', JSON.stringify(this.user));
        //  this.asignarModulos(this.elementoModulo);
        // console.log(this.user);
           this.loading = false;
           console.log('logueado');
           this.loggedIn = true;
       //  this.menuList();
       this.datosCuenta();
       },
       error => { // error path
           console.log(error.message);
           console.log(error.status);
           localStorage.removeItem('error');
           localStorage.setItem('error', JSON.stringify(error));
            
       //    this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message);
        });    
   } catch (error) {
   //  this.throwAlert('error','Error al cargar los registros',error);
   }  
   }

  
datosCuenta(){
  // obtengo los datos de la cuenta
  //this.loading = true;
  try {
    let _userData = JSON.parse(localStorage.getItem('userData'));
    console.log(_userData);
    this.cuentaService.ObtenerClinica(_userData['id'])
      .subscribe(resp => {
     // this.elementoModulo = this.elemento["access_list"]
     console.log(resp);
        this.cuentaDatos = resp;
     localStorage.setItem('userCuenta', JSON.stringify(this.cuentaDatos));
       
        
          
      },
      error => { // error path
          console.log(error.message);
          console.log(error.status);
          localStorage.removeItem('error');
          localStorage.setItem('error', JSON.stringify(error));
           
      //    this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message);
       });    
  } catch (error) {
  //  this.throwAlert('error','Error al cargar los registros',error);
  }  

 
}



throwAlert(estado:string, mensaje:string, motivo:string, errorNumero:string){
  let tipoerror:string;

  if(estado== 'success'){
      swal({
          type: 'success',
          title: 'Exito',
          text: mensaje
        })
  }

  if(errorNumero =='422'){
    mensaje ='Los datos que esta tratando de guardar son iguales a los que ya poseia';
    swal({   
        type: 'warning',
        title: 'Atención..',
        text: mensaje,
        footer: motivo
      })
}

if(errorNumero =='99'){
  mensaje ='Debe seleccionar un paciente antes de cargar las prácticas';
  swal({   
      type: 'warning',
      title: 'Atención..',
      text: mensaje,
      footer: motivo
    })
}

if(errorNumero =='100'){
  mensaje ='El paciente posee una obra social que no esta habilitada';
  swal({   
      type: 'warning',
      title: 'Atención..',
      text: mensaje,
      footer: motivo
    })
}
  if(estado == 'warning'){
    
    swal({   
        type: 'warning',
        title: 'Atención..',
        text: mensaje,
        footer: motivo
      })
  }
  
  if((estado== 'error')&&(errorNumero!='422')){
    if(errorNumero =='422'){
        mensaje ='Los datos que esta tratando de guardar son iguales a los que ya poseia';
    }
    if(errorNumero =='400 '){
        mensaje ='Bad Request ';
    }
    if(errorNumero =='404'){
        mensaje ='No encontrado ';
    }
    if(errorNumero =='401'){
        mensaje ='Sin autorización';
    }
    if(errorNumero =='403'){
        mensaje =' Prohibido : La consulta fue valida, pero el servidor rechazo la accion. El usuario puede no tener los permisos necesarios, o necesite una cuenta para operar ';
    }
    if(errorNumero =='405'){
        mensaje ='Método no permitido';
    }
    if(errorNumero =='500'){
        mensaje ='Error interno en el servidor';
    }
    if(errorNumero =='503'){
        mensaje ='Servidor no disponible';
    }
    if(errorNumero =='502'){
        mensaje ='Bad gateway';
    }
    
      swal({   
          type: 'error',
          title: 'Oops...',
          text: mensaje,
          footer: motivo
        })
  }


}

}
