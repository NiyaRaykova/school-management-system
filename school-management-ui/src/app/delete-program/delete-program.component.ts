import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-program',
  templateUrl: './delete-program.component.html',
  styleUrl: './delete-program.component.css'
})
export class DeleteProgramComponent {
  deleteProgramForm = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    email: new FormControl({ value: 0, disabled: true })
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.deleteProgramForm.patchValue(data.program);
  }
}
