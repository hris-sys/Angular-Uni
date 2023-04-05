import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Concert } from '../../models/concert.model';
import { ConcertsService } from '../../services/concerts.service';

@Component({
  selector: 'app-concert-delete-dialog',
  templateUrl: './concert-delete-dialog.component.html',
  styleUrls: ['./concert-delete-dialog.component.css']
})
export class ConcertDeleteDialogComponent {

  concert!: Concert;

  concertDeleted = new EventEmitter<void>();

  constructor(private concertService: ConcertsService,
              private bsModalRef: BsModalRef,
              private toastrService: ToastrService) {
  }

  deleteCourse(): void {
    this.concertService.delete(this.concert.id).subscribe({
      next: () => {
        this.toastrService.success('Concert was successfully deleted.', 'Success');
        this.hideDialog();
        this.concertDeleted.emit();
      }
    })
  }

  hideDialog(): void {
    this.bsModalRef.hide();
  }
}
