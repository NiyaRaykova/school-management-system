import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserType } from '../model/UserType';
import { School } from '../model/School';
import { SchoolService } from '../service/school.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  editUserForm = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    email: new FormControl(''),
    role: new FormControl(''),
    schoolId: new FormControl('')
  });

  schools: School[] = [];

  loadSchools(): void {
    this.schoolService.getAllSchools().subscribe((schools: School[]) => {
      this.schools = schools;
    });
  }

  protected readonly UserType: UserType[] = Object.values(UserType).filter(t => {
    return t != UserType.ADMIN;
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private schoolService: SchoolService) {
    this.editUserForm.patchValue(data.user);
  }

  ngOnInit(): void {
    this.loadSchools();
    }
}
