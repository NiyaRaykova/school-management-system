import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProgramComponent } from '../edit-program/edit-program.component';
import { DeleteProgramComponent } from '../delete-program/delete-program.component';
import { Program } from '../model/Program';
import { ProgramService } from '../service/program.service';
import { Subject } from '../model/Subject';

@Component({
  selector: 'app-programs-grid',
  templateUrl: './programs-grid.component.html',
  styleUrls: ['./programs-grid.component.css']
})
export class ProgramsGridComponent implements OnInit{

  programs: Program[] = [];

  constructor(public dialog: MatDialog, private programService: ProgramService) {
  }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.programService.getAllPrograms().subscribe((programs: Program[]) => {
      this.programs = programs;
    });
  }

  getSubjectNames(subjects: Subject[]): string[] {
    if (subjects == undefined) {
      return [];
    }

    return subjects.map(subject => subject.name);
  }
 editProgram(program: Program): void {
    const dialogRef = this.dialog.open(EditProgramComponent, {
      width: '250px',
      data: { program: program, selectedSubjects: program.subjects } // Pass selected subjects
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const id = result.id ?? 0;

        // Ensure other properties match the expected types, handling nulls as needed
        const updatedProgram: Program = {
          id: id,
          name: result.name,
          subjects: result.subjects
        };

        // Now `updatedProgram` should match the expected type structure of `Partial<Program>`
        this.programService.updateProgram(id, updatedProgram).subscribe(result => {
          if (result) {
            this.loadPrograms();
          }
        })
      }
    });
  }

  openAddProgramDialog(): void {
    const dialogRef = this.dialog.open(EditProgramComponent, {
      width: '250px',
      data: { program: { name: '', subjects: '' } } // Pass initial data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
       if (result) {
              const id = result.id ?? 0;

              // Ensure other properties match the expected types, handling nulls as needed
              const program: Program = {
               id: id,
               name: result.name,
               subjects: result.subjects
              };

              this.programService.createProgram(program).subscribe(result => {
                  this.loadPrograms();
              })
            }
    });
  }

   deleteProgram(program: Program): void {
      const dialogRef = this.dialog.open(DeleteProgramComponent, {
        width: '250px',
        data: { program }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const id = result.id ?? 0;

          // Ensure other properties match the expected types, handling nulls as needed
          const program: Program = {
            id: id,
            name: result.name,
          };

          // Now `program` should match the expected type structure of `Partial<Program>`
          this.programService.deleteProgram(id).subscribe(result => {
              this.loadPrograms();
          })
        }
      });
    }
}
