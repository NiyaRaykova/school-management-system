import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Program } from '../model/Program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getAllPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.baseUrl}/programs`);
  }

  public getProgramById(id: number): Observable<Program> {
    return this.http.get<Program>(`${this.baseUrl}/programs/${id}`);
  }

  public getProgramByEmail(email: string | null): Observable<Program> {
    return this.http.get<Program>(`${this.baseUrl}/programs/email/${email}`);
  }

  public createProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(`${this.baseUrl}/programs`, program);
  }

  public updateProgram(id: number, program: Program): Observable<Program> {
    return this.http.put<Program>(`${this.baseUrl}/programs/${id}`, program);
  }

  public deleteProgram(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/programs/${id}`);
  }
}
