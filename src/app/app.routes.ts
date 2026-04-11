import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookRepairComponent } from './pages/book-repair/book-repair.component'
export const routes: Routes =
[
   { path: '', component: HomeComponent },
   { path: 'book-repair', component: BookRepairComponent }
];
