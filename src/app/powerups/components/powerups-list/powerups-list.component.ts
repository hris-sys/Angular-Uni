import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Powerup } from '../../models/powerup.model';
import { PowerupsService } from '../../services/powerups.service';
import { PowerupDeleteDialogComponent } from '../powerup-delete-dialog/powerup-delete-dialog.component';
import { PowerupEditDialogComponent } from '../powerup-edit-dialog/powerup-edit-dialog.component';

@Component({
  selector: 'app-powerups-list',
  templateUrl: './powerups-list.component.html',
  styleUrls: ['./powerups-list.component.css']
})
export class PowerupsListComponent implements OnInit {

  powerups!: Powerup[];

  constructor(private powerupsService: PowerupsService,
              private bsModalService: BsModalService){

  }

  ngOnInit(): void {
    this.getAll();
  }

  onCreateClick(): void {
    this.onEditClick();
  }

  onEditClick(powerup?: Powerup): void {
    const ref = this.bsModalService.show(PowerupEditDialogComponent, {
      initialState: {
        powerup: powerup
      }
    });

    if (ref.content) {
      ref.content.saved.subscribe({
        next: () => {
          this.getAll();
        }
      });
    }
  }

  private getAll(): void{
    this.powerupsService.getAll().subscribe({
      next: (response) => {
        this.powerups = response;
      }
    })
  }

  onDeleteClick(powerup: Powerup): void {
    const ref = this.bsModalService.show(PowerupDeleteDialogComponent, {
      initialState: {
        powerup: powerup
      }
    })

    if (ref.content) {
      ref.content.powerupDeleted.subscribe({
        next: () => {
          this.getAll();
        }
      })
    }
  }
}
