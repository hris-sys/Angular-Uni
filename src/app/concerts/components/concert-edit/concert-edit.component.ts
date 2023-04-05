import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Powerup } from 'src/app/powerups/models/powerup.model';
import { PowerupsService } from 'src/app/powerups/services/powerups.service';
import { Concert } from '../../models/concert.model';
import { ConcertsService } from '../../services/concerts.service';

@Component({
  selector: 'app-concert-edit',
  templateUrl: './concert-edit.component.html',
  styleUrls: ['./concert-edit.component.css'],
})
export class ConcertEditComponent implements OnInit {
  formGroup!: FormGroup;

  id!: number;
  concert!: Concert;

  powerups!: Powerup[];

  constructor(private concertsService: ConcertsService,
              private powerupsService: PowerupsService,
              private toastrService: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this.concertsService.getById(this.id).subscribe({
        next: (response) => {
          this.concert = response;
          this.buildForm();
        }
      })
    } else {
      this.buildForm();
    }

    this.getPowerUps();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      return;
    }

    const body: Concert = {
      ...this.concert,
      ...this.formGroup.value
    };

    this.concertsService.save(body).subscribe({
      next: () => {
        this.toastrService.success('Concert was successfully saved.', 'Success');
        this.router.navigate(['concerts']);
      }
    });
  }

  private getPowerUps(): void {
    this.powerupsService.getAll().subscribe({
      next: (response) => {
        this.powerups = response;
      }
    })
  }

  private buildForm(): void {
    if (!this.concert) {
      this.concert = new Concert();
    }

    this.formGroup = this.fb.group({
      title: [this.concert.title, [Validators.required, Validators.minLength(3)]],
      powerupId: [this.concert.powerupId, Validators.required],
      location: [this.concert.location, Validators.required],
      image: [this.concert.image, Validators.required],
      hasPassed: false
    })
  }
}
