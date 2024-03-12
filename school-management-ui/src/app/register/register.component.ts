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
      'password': this.password,
      'role': this.role,
    };

    this.http.post('http://localhost:8080/register', bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert('User Registered Successfully');
      this.router.navigateByUrl('/login');
    });
  }
}
