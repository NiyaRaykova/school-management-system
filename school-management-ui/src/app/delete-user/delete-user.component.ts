import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserType } from '../model/UserType';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  deleteUserForm = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    email: new FormControl({ value: 0, disabled: true })
  });

  protected readonly UserType: UserType[] = Object.values(UserType).filter(t => {
    return t != UserType.ADMIN;
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.deleteUserForm.patchValue(data.user);
  }
}
