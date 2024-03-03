import { Injectable } from '@angular/core';
import { UserType } from '../model/UserType';

@Injectable({
  providedIn: 'root'
})
export class IdentityManagementService {

  private userKey: string = 'currentUserType'; // Key used in session storage

  constructor() { }

  public setUserType(userType: UserType): void {
    sessionStorage.setItem(this.userKey, userType);
  }


  getUserType(): UserType | null {
    const userType : string | null = sessionStorage.getItem(this.userKey);
    if (!userType) {
      return null;
    }

    if (userType in UserType) {
      return userType as UserType;
    }

    return null;
  }

  public isLoggedIn(): boolean {
    return this.getUserType() !== undefined;
  }

  public invalidateSession(): void {
    sessionStorage.removeItem(this.userKey);
  }
}
