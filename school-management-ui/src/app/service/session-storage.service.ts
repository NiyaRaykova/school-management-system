import {Injectable, OnDestroy, PLATFORM_ID, Inject} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService implements OnDestroy {
  private storageSubject = new Subject<string>();
  storageChanges$ = this.storageSubject.asObservable();

  constructor(@Inject(DOCUMENT) private _doc: Document) {
    // Add event listener to listen for storage changes
    // @ts-ignore
    // const MockBrowser = require('mock-browser').mocks.MockBrowser;
    // const browser = new MockBrowser();
    //global['window'] = browser.getWindow()
   // global['window'].addEventListener('storage', this.handleStorageChange);

  }

  getWindow(): Window | null {
    return this._doc.defaultView;
  }

  private handleStorageChange = (event: StorageEvent) => {
    // Check if the change occurred in the session storage
    if (event?.key != null && event.storageArea === sessionStorage) {
      // Emit the key that was changed
      this.storageSubject.next(event.key);
    }
  };

  ngOnDestroy(): void {
    // Clean up by removing event listener when the service is destroyed
    // @ts-ignore
    global['window'].removeEventListener('storage', this.handleStorageChange);
  }
}
