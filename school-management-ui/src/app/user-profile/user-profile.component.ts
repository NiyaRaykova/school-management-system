import { Component, OnInit } from '@angular/core';
import { IdentityManagementService } from '../service/identity-management.service';
import { UserType } from '../model/UserType';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { User } from '../model/User';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User | null = null;
  userEmail: string | null = null;
  userRole: UserType | null = null;

  constructor(private identityManagement: IdentityManagementService,
              public dialog: MatDialog,
              private userService: UserService,
              private router: Router) {
    this.userEmail = identityManagement.getUserEmail();
    this.userRole = identityManagement.getUserType();
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserByEmail(this.userEmail).subscribe((user: User) => {
      this.user = user;
    });
  }
}
