import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';

import { ContactoComponent } from './pageses/institucional/contacto/contacto.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FaqComponent } from './pages/faq/faq.component';
import { TerminosComponent } from './pages/terminos/terminos.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { PlanComponent } from './pages/registrarse/plan/plan.component';
import { EnprocesoComponent } from './pages/registro/enproceso/enproceso.component';
import { ExitoComponent } from './pages/registro/exito/exito.component';




export const ROUTES: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'precios', component: PreciosComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'terminos', component: TerminosComponent },
    { path: 'cuenta', component: CuentaComponent },
    { path: 'cuenta/plan', component: PlanComponent },
    { path: 'cuenta/exito', component: ExitoComponent },
    { path: 'cuenta/enproceso', component: EnprocesoComponent },
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

