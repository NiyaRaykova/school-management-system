import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from '../model/Subject';
import { EditSubjectComponent } from '../edit-subject/edit-subject.component';
import { DeleteSubjectComponent } from '../delete-subject/delete-subject.component';
import { SubjectService } from '../service/subject.service';


@Component({
  selector: 'app-subjects-grid',
  templateUrl: './subjects-grid.component.html',
  styleUrls: ['./subjects-grid.component.css']
})
export class SubjectsGridComponent implements OnInit {
  subjects: Subject[] = [];

  constructor(public dialog: MatDialog, private subjectService: SubjectService) {}

  ngOnInit(): void {
       this.loadSubjects();
  }

  loadSubjects(): void {
     this.subjectService.getAllSubjects().subscribe((subjects: Subject[]) => {
       this.subjects = subjects;
     });
  }

  openAddSubjectDialog(): void {
    const dialogRef = this.dialog.open(EditSubjectComponent, {
      width: '250px',
      data: { subject: {name: 'Subject 1' } } // Pass initial data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
       if (result) {
              const id = result.id ?? 0;

              // Ensure other properties match the expected types, handling nulls as needed
              const subject: Subject = {
               id: id,
               name: result.name,
              };

              this.subjectService.createSubject(subject).subscribe(result => {
                  this.loadSubjects();
              })
            }
    });
  }

editSubject(subject: Subject): void {
        const dialogRef = this.dialog.open(EditSubjectComponent, {
          width: '250px',
          data: { subject }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            const id = result.id ?? 0;

            // Ensure other properties match the expected types, handling nulls as needed
            const subject: Subject = {
              id: id,
              name: result.name,
            };

            this.subjectService.updateSubject(id, subject).subscribe(result => {
                this.loadSubjects();
            })
          }
        });
}

deleteSubject(subject: Subject): void {
      const dialogRef = this.dialog.open(DeleteSubjectComponent, {
        width: '250px',
        data: { subject }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const id = result.id ?? 0;

          // Ensure other properties match the expected types, handling nulls as needed
           const subject: Subject = {
             id: id,
             name: result.name,
           };

           this.subjectService.deleteSubject(id).subscribe(result => {
               this.loadSubjects();
           })
        }
      });
}

}
