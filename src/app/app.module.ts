import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, Injector } from '@angular/core';
import { HTTP_INTERCEPTORS,HttpClientModule  } from '@angular/common/http';
import { registerLocaleData,LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FacebookModule } from 'ngx-facebook';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { InicioComponent } from './pages/inicio/inicio.component';
import { ROUTES } from './app.routes';


import localeEsAR from '@angular/common/locales/es-AR';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AutofocusModule } from 'angular-autofocus-fix'; 
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { FinanciamientoComponent } from './pageses/institucional/financiamiento/financiamiento.component';
import { ContactoComponent } from './pageses/institucional/contacto/contacto.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

import { PopupNoticiaComponent } from './shared/compents/popups/popup-noticia/popup-noticia.component';
import { RegistarseComponent } from './pages/registarse/registarse.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { TerminosComponent } from './pages/terminos/terminos.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';

import localeEsAr from '@angular/common/locales/es-AR';
import { PlanComponent } from './pages/registrarse/plan/plan.component';
import { ExitoComponent } from './pages/registro/exito/exito.component';
import { EnprocesoComponent } from './pages/registro/enproceso/enproceso.component'; 
registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  
    InicioComponent,
    FinanciamientoComponent,
    ContactoComponent,    
    PopupNoticiaComponent,
    RegistarseComponent,
    FaqComponent,
    PreciosComponent,
    RegistroComponent,
    TerminosComponent,
    CuentaComponent,
    PlanComponent,
    ExitoComponent,
    EnprocesoComponent
  ],
  imports: [
    DynamicDialogModule,
    DialogModule,
    ScrollPanelModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    AppRoutingModule,
    FacebookModule.forRoot(),
    NgxYoutubePlayerModule.forRoot(),
    SweetAlert2Module.forRoot(),
    AutofocusModule,
    RouterModule.forRoot( ROUTES, { useHash: false } ),
  ],
  entryComponents: [PopupNoticiaComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' },{
    provide: HTTP_INTERCEPTORS,
    useFactory: function(injector: Injector) {
        return new JwtInterceptor(injector);
    },
    multi: true,
    deps: [Injector]
  },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
