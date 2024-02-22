import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  login: string = "";
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient) {
  }

  save() {

    let bodyData = {
      "login": this.login,
      "email": this.email,
      "password": this.password
    };
    this.http.post("http://localhost:8080/register", bodyData, {responseType: 'text'}).subscribe((resultData: any) => {
      console.log(resultData);
      alert("User Registered Successfully");
    });
  }
}
