import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IdentityManagementService} from "../service/identity-management.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {

  userEmail: string | null;
  users: User[] = [];
  oldEmail: string | null;
  newEmail: string;
  constructor(private route: ActivatedRoute, private identityManagement: IdentityManagementService,
              private http: HttpClient) {
    this.userEmail = identityManagement.getUserEmail();
  }
  onSubmit(): void {
    // Call the service method to update the user's email
    this.identityManagement.setUserEmail(this.newEmail);
  }


  ngOnInit(): void {
    this.loadUsers();
    this.oldEmail = this.route.snapshot.paramMap.get('email');
  }

  loadUsers(): void {
    this.http.get<User[]>('http://localhost:8080/users').subscribe((users: User[]) => {
      this.users = users;
    });
  }

  updateUserEmail(newEmail: string): Observable<any> {
    this.oldEmail = this.route.snapshot.paramMap.get('email');
    const url = `http://localhost:8080/editEmail/${this.oldEmail}`;
    return this.http.put(url, newEmail);
  }

  saveUser(): void {
    this.updateUserEmail(this.newEmail).subscribe(
      (response) => {
        console.log('User email updated successfully:', response);
        // Optionally, perform any additional actions after successful update
      },
      (error) => {
        console.error('Error updating user email:', error);
        // Optionally, handle error scenarios
      }
    );
  }
}
