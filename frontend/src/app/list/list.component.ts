import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Staff } from '../model/staff';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  staffMembers: Staff[] = [];

  constructor(
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.getStaffMembers();
  }

  getStaffMembers(): void {
    this.appService.getStaffMembers().subscribe((data: Staff[]) => {
      this.staffMembers = data;
    });
  }

  goToAdd(): void {
    this.router.navigate(['/add']);
  }

  deleteStaff(id: number | undefined): void {
    if (!id) return;

    this.appService.deleteStaff(id).subscribe(() => {
      this.getStaffMembers();
    });
  }
}