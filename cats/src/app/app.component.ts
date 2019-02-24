import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
        <span>Rate Some Cats</span>
        <span class="fill-space"></span>
        <button mat-button>Log in</button>
    </mat-toolbar>
  `,
  styles: [],
})
export class AppComponent {
  title = 'cats';
}
