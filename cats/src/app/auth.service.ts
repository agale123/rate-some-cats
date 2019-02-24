import { map, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    readonly isSignedIn: Observable<boolean>;

    readonly user: Observable<User>;

    constructor(private readonly afAuth: AngularFireAuth) {
        this.isSignedIn = this.afAuth.user.pipe(map(user => {
            return !!user;
        }), shareReplay(1));

        this.user = this.afAuth.user.pipe(shareReplay(1));
    }

    signIn() {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    signOut() {
        this.afAuth.auth.signOut();
    }

    getCurrentUser() {
        return this.afAuth.auth.currentUser;
    }

    isUserSignedIn(): Observable<boolean> {
        return this.isSignedIn;
    }
}
