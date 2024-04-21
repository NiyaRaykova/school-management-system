import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { User } from '../model/User';
import { School } from '../model/School';
import { UserService } from '../service/user.service';
import { SchoolService } from '../service/school.service';
import { Program } from '../model/Program';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  schools: School[] = [];

  constructor(public dialog: MatDialog, private userService: UserService, private schoolSerivce: SchoolService) {
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadSchools();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

getProgramNames(programs: Program[]): string[] {
  if (!programs) {
    return [];
  }

  // Use map with type assertion to ensure that program.name is always a string
  return programs.map(program => program.name as string);
}

  public getSchoolNameById(user: User): string | undefined  {
    return user?.school?.name ? user.school.name : undefined;
  }

  loadSchools(): void {
     this.schoolSerivce.getAllSchools().subscribe((schools: School[]) => {
       this.schools = schools;
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
          schoolClass: result.schoolClass,
          role: result.role,
          schoolId: result.schoolId,
          programs: result.programs
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

   deleteUser(user: User): void {
      const dialogRef = this.dialog.open(DeleteUserComponent, {
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
            schoolClass: result.schoolClass,
            role: result.role
          };

          // Now `user` should match the expected type structure of `Partial<User>`
          this.userService.deleteUser(id).subscribe(result => {
              this.loadUsers();
          })
        }
      });
    }
}
