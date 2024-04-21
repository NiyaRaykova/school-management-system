import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserType } from '../model/UserType';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IdentityManagementService {
  private userKey: string = 'currentUserType'; // Key used in session storage
  private userKeyEmail: string = 'currentUserEmail'; // Key used in session storage

  public loginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loginSubject.next(this.isLoggedIn());
  }

  public setUserType(userType: UserType): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.userKey, userType);
      this.loginSubject.next(this.isLoggedIn());
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
    return this.getUserType() !== null;
  }

  public invalidateSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.userKey);
      sessionStorage.removeItem(this.userKeyEmail);
    }
  }
}
