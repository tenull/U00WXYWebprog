import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '../app.service';
import { Staff } from '../model/staff';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {
  submitted = false;
  createForm!: FormGroup;
  staffMembers: Staff[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private appService: AppService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
    this.appService.getStaffMembers().subscribe((data) => {
      this.staffMembers = data;
    });
  }

  get myForm() {
    return this.createForm.controls;
  }

  mainForm(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      role: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nationality: ['', [Validators.required]],
      experience: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  onSubmit(): boolean | void {
    this.submitted = true;

    if (!this.createForm.valid) {
      alert('Nem megfelelőek az adatok! Minden mezőt ki kell tölteni, az életkor és a tapasztalat csak szám lehet.');
      return false;
    }

    const newStaff: Staff = {
      ...this.createForm.value,
      age: Number(this.createForm.value.age),
      experience: Number(this.createForm.value.experience)
    };

    const exists = this.staffMembers.some(
      staff => staff.name.toLowerCase() === newStaff.name.toLowerCase()
    );

    if (exists) {
      alert('Már létezik ilyen nevű stábtag!');
      return false;
    }

    this.appService.addStaffMember(newStaff).subscribe({
      next: () => {
        alert('Stábtag hozzáadva.');
        this.ngZone.run(() => this.router.navigateByUrl('/'));
      },
      error: (error) => {
        alert('Hiba történt: ' + error);
      }
    });
  }
}