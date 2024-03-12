import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserType } from '../model/UserType';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  editUserForm = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    email: new FormControl(''),
    role: new FormControl(''),
  });

  protected readonly UserType: UserType[] = Object.values(UserType).filter(t => {
    return t != UserType.ADMIN;
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.editUserForm.patchValue(data.user);
  }
}
