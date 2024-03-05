import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserType } from '../model/UserType';

@Injectable({
  providedIn: 'root'
})
export class IdentityManagementService {

  private userKey: string = 'currentUserType'; // Key used in session storage
  private userKeyEmail: string = 'currentUserEmail'; // Key used in session storage

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  public setUserType(userType: UserType): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.userKey, userType);
    }
  }

  public setUserEmail(email: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.userKeyEmail, email);
    }
  }

  getUserEmail(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const userEmail : string | null = sessionStorage.getItem(this.userKeyEmail);
    if (!userEmail) {
      return null;
    }else {
      return userEmail;
    }
  }

  getUserType(): UserType | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
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
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.userKey);
      sessionStorage.removeItem(this.userKeyEmail);
    }
  }

  logout(): void {
    this.invalidateSession();
  }
}
