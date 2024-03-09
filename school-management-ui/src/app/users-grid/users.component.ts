import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { User } from '../model/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(public dialog: MatDialog, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '250px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const id = result.id ?? 0;

        // Ensure other properties match the expected types, handling nulls as needed
        const user: User = {
          id: id,
          name: result.name,
          email: result.email,
          role: result.role
        };

        // Now `user` should match the expected type structure of `Partial<User>`
        this.userService.updateUser(id, user).subscribe(result => {
          if (result) {
            this.loadUsers();
          }
        })
      }
    });
  }
}
