import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProgramComponent } from '../edit-program/edit-program.component';
import { DeleteProgramComponent } from '../delete-program/delete-program.component';
import { Program } from '../model/Program';
import { School } from '../model/School';
import { ProgramService } from '../service/program.service';
import { SchoolService } from '../service/school.service';
import { Subject } from '../model/Subject';

@Component({
  selector: 'app-programs-grid',
  templateUrl: './programs-grid.component.html',
  styleUrls: ['./programs-grid.component.css']
})
export class ProgramsGridComponent implements OnInit{

  programs: Program[] = [];
  schools: School[] = [];

  constructor(public dialog: MatDialog, private programService: ProgramService, private schoolSerivce: SchoolService) {
  }

  ngOnInit(): void {
    this.loadPrograms();
    this.loadSchools();
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

//   public getSchoolNameById(user: User): string | undefined  {
//     return user?.school?.name ? user.school.name : undefined;
//   }

  loadSchools(): void {
     this.schoolSerivce.getAllSchools().subscribe((schools: School[]) => {
       this.schools = schools;
     });
  }

  editProgram(program: Program): void {
    const dialogRef = this.dialog.open(EditProgramComponent, {
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
          subjects: result.subjects
        };

        // Now `program` should match the expected type structure of `Partial<Program>`
        this.programService.updateProgram(id, program).subscribe(result => {
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
