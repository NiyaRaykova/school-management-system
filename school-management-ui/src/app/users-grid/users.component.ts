import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { User } from '../model/User';
import { School } from '../model/School';
import { UserService } from '../service/user.service';
import { SchoolService } from '../service/school.service';

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

  loadSchools(): void {
     this.schoolSerivce.getAllSchools().subscribe((schools: School[]) => {
       this.schools = schools;
     });
  }

 onSchoolChange(user: User, selectedSchoolId: number): void {

    // Find the selected school in the schools array
  const selectedSchool = this.schools.find(school => school.id === selectedSchoolId);

   // If the selected school is found, update the user's schoolId property
   if (selectedSchool) {
     this.schoolSerivce.assignSchoolToUser(selectedSchool.id, user.id).subscribe(() => {
       // Update the user's schoolId property once the assignment is successful
       user.schoolId = selectedSchool.id;
     }, error => {
       // Handle error if the assignment fails
       console.error('Failed to assign school to user:', error);
     });
   } else {
     // Handle the case where the selected school is not found
     console.error('Selected school not found.');
   }
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
