import { Component, OnInit } from '@angular/core';
import { IdentityManagementService } from '../service/identity-management.service';
import { UserType } from '../model/UserType';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../model/User';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Router } from '@angular/router';
import { School } from '../model/School';
import { UserService } from '../service/user.service';
import { SchoolService } from '../service/school.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User | null = null;
  userEmail: string | null = null;
  schools: School[] = [];

  constructor(private identityManagement: IdentityManagementService,
              public dialog: MatDialog,
              private userService: UserService,
              private router: Router, private schoolSerivce: SchoolService) {
    this.userEmail = identityManagement.getUserEmail();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadSchools();
  }

  public getSchoolNameById(user: User): string | undefined  {
    return user?.school?.name ? user.school.name : undefined;
  }

  loadSchools(): void {
     this.schoolSerivce.getAllSchools().subscribe((schools: School[]) => {
       this.schools = schools;
     });
  }

  loadUsers(): void {
    this.userService.getUserByEmail(this.userEmail).subscribe((user: User) => {
      this.user = user;
    });
  }
}
