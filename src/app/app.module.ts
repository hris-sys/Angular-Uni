import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { PowerupsListComponent } from './powerups/components/powerups-list/powerups-list.component';
import { ConcertsListComponent } from './concerts/components/concerts-list/concerts-list.component';
import { PowerupDeleteDialogComponent } from './powerups/components/powerup-delete-dialog/powerup-delete-dialog.component';
import { PowerupEditDialogComponent } from './powerups/components/powerup-edit-dialog/powerup-edit-dialog.component';
import { ConcertDeleteDialogComponent } from './concerts/components/concert-delete-dialog/concert-delete-dialog.component';
import { ConcertEditComponent } from './concerts/components/concert-edit/concert-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PowerupsListComponent,
    ConcertsListComponent,
    PowerupDeleteDialogComponent,
    PowerupEditDialogComponent,
    ConcertDeleteDialogComponent,
    ConcertEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
