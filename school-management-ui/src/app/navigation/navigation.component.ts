import { Component, OnInit } from '@angular/core';
import { IdentityManagementService } from '../service/identity-management.service';
import { UserType } from '../model/UserType';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {

  userType: UserType | null | undefined;

  constructor(private identityManagement: IdentityManagementService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.refreshUserType();
    this.identityManagement.loginSubject.subscribe(b => {
      this.refreshUserType();
    })
  }

  public logout(): void {
    this.identityManagement.invalidateSession();
    this.refreshUserType();
    this.router.navigateByUrl('/home');
  }

  private refreshUserType() {
    this.userType = this.identityManagement.getUserType();
  }

  protected readonly UserType = UserType;
}
