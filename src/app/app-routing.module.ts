import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcertEditComponent } from './concerts/components/concert-edit/concert-edit.component';
import { ConcertsListComponent } from './concerts/components/concerts-list/concerts-list.component';
import { PowerupsListComponent } from './powerups/components/powerups-list/powerups-list.component';

const routes: Routes = [
  {
    path: 'powerups',
    component: PowerupsListComponent
  },
  {
    path: 'concerts/create',
    component: ConcertEditComponent
  },
  {
    path: 'concerts/edit/:id',
    component: ConcertEditComponent
  },
  {
    path: 'concerts',
    component: ConcertsListComponent
  },
  {
    path: '',
    redirectTo: 'concerts',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }