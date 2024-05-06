import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserType } from '../model/UserType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  name: string = '';
  password: string = '';
  role: UserType | undefined;
  protected readonly UserType: UserType[] = Object.values(UserType).filter(t => {
    return t != UserType.ADMIN;
  });

  constructor(private http: HttpClient, private router: Router) {
  }

  save() {
    let bodyData = {
      'email': this.email,
      'name': this.name,
      'password': this.password,
      'role': this.role,
    };

    if (!this.email || !this.name || !this.password || !this.role) {
      alert('Please fill out all fields');
      return; // Exit the function if any required field is empty
    }
    this.http.post('http://localhost:8080/register', bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert('User Registered Successfully');
      this.router.navigateByUrl('/login');
    });
  }
}
