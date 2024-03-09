import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from "@angular/router";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  displayedColumns: string[] = ['id', 'name', 'email'];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<User[]>('http://localhost:8080/users').subscribe((users: User[]) => {
      this.users = users;
    });
  }

  editUser(user: User): void {
    this.router.navigate(['/app-edit-user', user.email]);
  }
}
