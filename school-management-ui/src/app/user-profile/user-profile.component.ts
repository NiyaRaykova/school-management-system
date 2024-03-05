import { Component } from '@angular/core';
import {IdentityManagementService} from "../service/identity-management.service";
import {UserType} from "../model/UserType";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userEmail: string | null;
  userRole: string;

  constructor(private identityManagement: IdentityManagementService) {
    this.userEmail = identityManagement.getUserEmail();
    this.userRole = identityManagement.getUserType.toString();
  }

  editProfile() {
    // Implement logic to save user profile data (e.g., send to backend)
    console.log('Saving profile...');
    console.log('Email:', this.userEmail);
    console.log('Role:', this.userRole);
  }
}
