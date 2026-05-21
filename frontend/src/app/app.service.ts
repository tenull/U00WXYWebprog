import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from './model/staff';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = 'http://localhost:3000/staff';

  constructor(private http: HttpClient) {}

  getStaffMembers(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.apiUrl);
  }

  addStaffMember(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(this.apiUrl, staff);
  }

  deleteStaff(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}