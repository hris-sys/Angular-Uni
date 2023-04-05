import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Concert } from '../../models/concert.model';
import { ConcertsService } from '../../services/concerts.service';
import { ConcertDeleteDialogComponent } from '../concert-delete-dialog/concert-delete-dialog.component';

@Component({
  selector: 'app-concerts-list',
  templateUrl: './concerts-list.component.html',
  styleUrls: ['./concerts-list.component.css']
})
export class ConcertsListComponent implements OnInit {
  concerts!: Concert[];

  constructor(private concertsService: ConcertsService,
              private bsModalService: BsModalService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  onEditClick(concert: Concert): void {
    this.router.navigate(['concerts', 'edit', concert.id]);
  }

  onDeleteClick(concert: Concert): void {
    const ref = this.bsModalService.show(ConcertDeleteDialogComponent, {
      initialState: {
        concert: concert
      }
    })

    if (ref.content) {
      ref.content.concertDeleted.subscribe({
        next: () => {
          this.getAll();
        }
      })
    }
  }

  private getAll(): void {
    this.concertsService.getAll().subscribe({
      next: (response) => {
        this.concerts = response;
      }
    })
  }

}
