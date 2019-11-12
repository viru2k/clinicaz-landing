import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CapacitacionesComponent } from './pages/institucional/capacitaciones/capacitaciones.component';
import { CreditosComponent } from './pages/institucional/creditos/creditos.component';
import { QuienesSomosComponent } from './pages/institucional/quienes-somos/quienes-somos.component';
import { ContactoComponent } from './pageses/institucional/contacto/contacto.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FaqComponent } from './pages/faq/faq.component';
import { TerminosComponent } from './pages/terminos/terminos.component';




export const ROUTES: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'precios', component: PreciosComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'terminos', component: TerminosComponent },
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

