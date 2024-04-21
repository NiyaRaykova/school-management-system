import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { School } from '../model/School';
import { Program } from '../model/Program';
import { ProgramService } from '../service/program.service';
import { SchoolService } from '../service/school.service';
import { SubjectService } from '../service/subject.service';
import { Subject } from '../model/Subject';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrl: './edit-program.component.css'
})
export class EditProgramComponent implements OnInit {
  editProgramForm = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    name: new FormControl(''),
    subjects: new FormControl([])
  });

  schools: School[] = [];
  subjects: Subject[] = [];

  loadSchools(): void {
    this.schoolService.getAllSchools().subscribe((schools: School[]) => {
      this.schools = schools;
    });
  }

  loadSubjects(): void {
    this.subjectService.getAllSubjects().subscribe((subjects: Subject[]) => {
      this.subjects = subjects;
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private programService: ProgramService, private schoolService: SchoolService, private subjectService: SubjectService) {
    this.editProgramForm.patchValue(data.program);
  }

  ngOnInit(): void {
    this.loadSchools();
    this.loadSubjects();
  }
}
