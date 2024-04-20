import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserType } from '../model/UserType';

@Component({
  selector: 'app-delete-school',
  templateUrl: './delete-school.component.html',
  styleUrls: ['./delete-school.component.css']
})
export class DeleteSchoolComponent {
deleteSchoolForm = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    name: new FormControl({ value: 0, disabled: true })
  });

  protected readonly UserType: UserType[] = Object.values(UserType).filter(t => {
    return t != UserType.ADMIN;
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.deleteSchoolForm.patchValue(data.school);
  }
}
