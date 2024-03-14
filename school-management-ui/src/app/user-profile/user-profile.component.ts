import { Component, OnInit } from '@angular/core';
import {IdentityManagementService} from "../service/identity-management.service";
import {UserType} from "../model/UserType";
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { User } from '../model/User';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  users: User | null = null;
  userEmail: string | null = null;
  userRole: UserType | null = null;

  constructor(private identityManagement: IdentityManagementService, public dialog: MatDialog, private userService: UserService) {
    this.userEmail = identityManagement.getUserEmail();
    this.userRole = identityManagement.getUserType();
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserByEmail(this.userEmail).subscribe((users: User) => {
      this.users = users;
    });
  }

  editProfile(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
        width: '250px',
        data: { user }
    });


    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const id = result.id ?? 0;
          const email = result.email ?? 0;


        const user: User = {
          id: id,
          name: result.name,
          email: result.email,
          role: result.role
        };

        this.userService.updateUser(id, user).subscribe(result => {
           if (result) {
               this.loadUser();
             }
          });
        }
    });
  }
}
