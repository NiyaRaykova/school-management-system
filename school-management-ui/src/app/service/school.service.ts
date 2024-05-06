import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { School } from '../model/School';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getAllSchools(): Observable<School[]> {
    return this.http.get<School[]>(`${this.baseUrl}/schools`);
  }

  public getSchoolById(id: number): Observable<School> {
    return this.http.get<School>(`${this.baseUrl}/schools/${id}`);
  }

  public getSchoolByName(email: string | null): Observable<School> {
    return this.http.get<School>(`${this.baseUrl}/schools/name/${name}`);
  }

  public updateSchool(id: number, school: School): Observable<School> {
    return this.http.put<School>(`${this.baseUrl}/schools/${id}`, school);
  }

  public createSchool(school: School): Observable<School> {
    return this.http.post<School>(`${this.baseUrl}/schools`, school);
  }

  public deleteSchool(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/schools/${id}`);
  }

  public assignSchoolToUser(schoolId: number, userId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/schools/assign-school-to-user?schoolId=${schoolId}&userId=${userId}`, {});
  }
}
