import { PhotoService } from './photo.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <mat-toolbar color="primary">
        <span>Rate Some Cats</span>
        <span class="fill-space"></span>
        <button mat-raised-button
                *ngIf="isSignedIn | async"
                (click)="authService.signOut()">
            Log out
        </button>
        <button mat-raised-button
                *ngIf="(isSignedIn | async) === false"
                (click)="authService.signIn()">
            Log in
        </button>
    </mat-toolbar>
    <div class="photo-container">
        <app-photo *ngFor="let photo of photoService.getPhotos() | async; trackBy:trackByFn"
                [photo]="photo">
        </app-photo>
    </div>
  `,
    styles: [],
})
export class AppComponent {
    readonly isSignedIn: Observable<boolean>;

    constructor(readonly authService: AuthService,
        readonly photoService: PhotoService) {
        this.isSignedIn = this.authService.isUserSignedIn();
    }

    trackByFn(message: any) {
        return message && message.id;
    }
}
