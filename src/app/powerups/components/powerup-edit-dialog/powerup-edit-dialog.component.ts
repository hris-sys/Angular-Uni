import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Powerup } from '../../models/powerup.model';
import { PowerupsService } from '../../services/powerups.service';

@Component({
  selector: 'app-powerup-edit-dialog',
  templateUrl: './powerup-edit-dialog.component.html',
  styleUrls: ['./powerup-edit-dialog.component.css']
})
export class PowerupEditDialogComponent implements OnInit {

  formGroup!: FormGroup;
  powerup!: Powerup;
  saved = new EventEmitter<Powerup>();

  constructor(
    private powerupService: PowerupsService,
    private bsModalRef: BsModalRef,
    private toastrService: ToastrService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  hideDialog(): void {
    this.bsModalRef.hide();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const body: Powerup = {
      ...this.powerup,
      ...this.formGroup.value
    };

    this.powerupService.save(body).subscribe({
      next: (response) => {
        this.toastrService.success('Powerup was successfully saved.', 'Success');
        this.saved.emit(response);
        this.hideDialog();
      }
    })
  }

  private buildForm(): void {
    if (!this.powerup) {
      this.powerup = new Powerup();
    }

    this.formGroup = this.fb.group({
      title: [this.powerup.title, [Validators.required, Validators.minLength(3)]],
      credits: [this.powerup.credits, [Validators.required, Validators.min(10)]],
      description: [this.powerup.description, [Validators.required, Validators.minLength(10)]],
    });
  }

}
