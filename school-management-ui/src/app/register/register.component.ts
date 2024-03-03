import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserType } from '../model/UserType';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = "";
  password: string = "";
  role: UserType = UserType.STUDENT;
  protected readonly UserType: UserType[] = Object.values(UserType);

  constructor(private http: HttpClient) {
  }

  save() {
    let bodyData = {
      "email": this.email,
      "password": this.password,
      "role": this.role
    };
    this.http.post("http://localhost:8080/register", bodyData, {responseType: 'text'}).subscribe((resultData: any) => {
      console.log(resultData);
      alert("User Registered Successfully");
    });
  }
}
