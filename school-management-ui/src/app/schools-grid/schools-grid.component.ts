import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { School } from '../model/School';
import { EditSchoolComponent } from '../edit-school/edit-school.component';
import { DeleteSchoolComponent } from '../delete-school/delete-school.component';
import { SchoolService } from '../service/school.service';

@Component({
  selector: 'app-schools-grid',
  templateUrl: './schools-grid.component.html',
  styleUrls: ['./schools-grid.component.css']
})
export class SchoolsGridComponent implements OnInit {
   schools: School[] = [];


  constructor(public dialog: MatDialog, private schoolSerivce: SchoolService) {}

  ngOnInit(): void {
       this.loadSchools();
  }

  loadSchools(): void {
     this.schoolSerivce.getAllSchools().subscribe((schools: School[]) => {
       this.schools = schools;
     });
  }

  openAddSchoolDialog(): void {
    const dialogRef = this.dialog.open(EditSchoolComponent, {
      width: '250px',
      data: { school: {  id: 1, name: 'School 1', address: 'Address 1' } } // Pass initial data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
       if (result) {
              const id = result.id ?? 0;

              // Ensure other properties match the expected types, handling nulls as needed
              const school: School = {
               id: id,
               name: result.name,
               address: result.address,
              };

              this.schoolSerivce.createSchool(school).subscribe(result => {
                  this.loadSchools();
              })
            }
    });
  }

editSchool(school: School): void {
        const dialogRef = this.dialog.open(EditSchoolComponent, {
          width: '250px',
          data: { school }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            const id = result.id ?? 0;

            // Ensure other properties match the expected types, handling nulls as needed
            const school: School = {
              id: id,
              name: result.name,
              address: result.address
            };

            this.schoolSerivce.updateSchool(id, school).subscribe(result => {
                this.loadSchools();
            })
          }
        });
}

deleteSchool(school: School): void {
        const dialogRef = this.dialog.open(DeleteSchoolComponent, {
          width: '250px',
          data: { school }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            const id = result.id ?? 0;

            // Ensure other properties match the expected types, handling nulls as needed
            const school: School = {
              id: id,
              name: result.name,
              address: result.address
            };

            this.schoolSerivce.deleteSchool(id).subscribe(result => {
                this.loadSchools();
            })
          }
        });
    }
}
