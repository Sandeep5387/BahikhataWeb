import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = false;
  authChange = new EventEmitter<boolean>();

  get authStatus() {
    return this.isLoggedIn;
  }

  getAuthStatus() {
    return this.authChange.asObservable();
  }

  updateAuthStatus(status: boolean) {
    this.isLoggedIn = status;
    this.authChange.next(this.isLoggedIn);
  }
}
