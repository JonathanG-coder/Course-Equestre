import { Routes } from '@angular/router';
import { AnimalViewComponent } from './views/animal-view/animal-view.component';
import { ChevalViewComponent } from './views/cheval-view/cheval-view.component';

export const routes: Routes = [
  { path: '', redirectTo: '/animal', pathMatch: 'full' },
  { path: 'animal', component: AnimalViewComponent },
  { path: 'cheval', component: ChevalViewComponent },
];
