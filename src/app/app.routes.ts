import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookRepairComponent } from './pages/book-repair/book-repair.component'
import { RepairComponent } from './pages/repair/repair.component';
import { SuccessComponent } from './pages/success/success.component';

export const routes: Routes =
[
   { path: '', component: HomeComponent },
   { path: 'book-repair', component: BookRepairComponent },
   { path: 'repairs', component: RepairComponent },
   { path: 'success', component: SuccessComponent }
];
