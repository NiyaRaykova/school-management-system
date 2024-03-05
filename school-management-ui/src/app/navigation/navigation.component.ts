import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { IdentityManagementService } from '../service/identity-management.service';
import {UserType} from "../model/UserType";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent  implements OnInit {

  userType: UserType | null | undefined;

  constructor(private identityManagement: IdentityManagementService,
              private router: Router) {
    // Subscribe to storage changes
  }

  ngOnInit(): void {
    // Call the getUserType method from IdentityManagementService
    // and assign the returned user type to the userType variable
    this.userType = this.identityManagement.getUserType();
    // this.sessionStorage.storageChanges$.subscribe(key => {
    //   // Check if the change is related to the session storage key you're interested in
    //   this.refreshComponent();
    // });
  }

  public logout(): void {
    this.identityManagement.logout();
    this.router.navigateByUrl("/login");
  }
  private refreshComponent(): void {
    this.router.navigateByUrl('/home');
  }

  protected readonly UserType = UserType;
}
