import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Powerup } from '../../models/powerup.model';
import { PowerupsService } from '../../services/powerups.service';

@Component({
  selector: 'app-powerup-delete-dialog',
  templateUrl: './powerup-delete-dialog.component.html',
  styleUrls: ['./powerup-delete-dialog.component.css']
})
export class PowerupDeleteDialogComponent {

  powerup!: Powerup;

  powerupDeleted = new EventEmitter<void>();

  constructor(private powerupService: PowerupsService,
              private bsModalRef: BsModalRef,
              private toastrService: ToastrService) {
  }

  deletePowerup(): void{
    this.powerupService.delete(this.powerup.id).subscribe({
      next: () => {
        this.toastrService.success("Powerup was successfully deleted.", "Success");
        this.hideDialog();
        this.powerupDeleted.emit();
      }
    })
  }

  hideDialog(): void{
    this.bsModalRef.hide();
  }
}
