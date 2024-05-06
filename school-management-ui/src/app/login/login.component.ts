import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { IdentityManagementService } from '../service/identity-management.service';
import { UserType } from '../model/UserType';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  constructor(private router: Router, private http: HttpClient,
              private identityManagement: IdentityManagementService) {
  }

  Login() {
    let bodyData = {
      email: this.email,
      password: this.password,
    };

    this.http.post<LoginResponse>("http://localhost:8080/login", bodyData).subscribe((resultData: LoginResponse) => {

      if (resultData?.message == "Email does not exist") {
        alert("Incorrect Email and Password not match");
      } else if (resultData?.message == "Success!" && resultData.role) {
        this.identityManagement.setUserEmail(this.email)
        this.identityManagement.setUserType(resultData.role);
        this.router.navigateByUrl('/home');
      } else {
        alert("Incorrect Email and Password not match");
      }
    });
  }
}

export interface LoginResponse {
  message: string;
  status: boolean;
  role: UserType;
}
