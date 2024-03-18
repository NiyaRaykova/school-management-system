import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserType } from '../model/UserType';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.css']
})
export class EditSchoolComponent {
 editSchoolForm: FormGroup;

   constructor(
     private fb: FormBuilder,
     public dialogRef: MatDialogRef<EditSchoolComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any
   ) {
     this.editSchoolForm = this.fb.group({
       name: [data.school.name, Validators.required],
       address: [data.school.address, Validators.required]
     });
   }

   onCancelClick(): void {
     this.dialogRef.close();
   }

   onSaveClick(): void {
     if (this.editSchoolForm.valid) {
       const editedSchool = {
         id: this.data.school.id,
         name: this.editSchoolForm.value.name,
         address: this.editSchoolForm.value.address
       };
       this.dialogRef.close(editedSchool);
     }
   }
 }
