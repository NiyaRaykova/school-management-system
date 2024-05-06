import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserType } from '../model/UserType';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent {
 editSubjectForm: FormGroup;

   constructor(
     private fb: FormBuilder,
     public dialogRef: MatDialogRef<EditSubjectComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any
   ) {
     this.editSubjectForm = this.fb.group({
       name: [data.subject.name, Validators.required],
     });
   }

   onCancelClick(): void {
     this.dialogRef.close();
   }

   onSaveClick(): void {
     if (this.editSubjectForm.valid) {
       const editedSubject = {
         id: this.data.subject.id,
         name: this.editSubjectForm.value.name,
       };
       this.dialogRef.close(editedSubject);
     }
   }
 }
