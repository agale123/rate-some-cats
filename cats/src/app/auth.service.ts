import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signIn() {
      // TODO: Use firebase auth
  }

  signOut() {
      // TODO: Use firebase auth
  }

  isUserSignedIn(): Observable<boolean> {
      // TODO: Use firebase auth
      return of(false);
  }
}
