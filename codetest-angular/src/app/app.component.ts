import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'codetest-angular';

  clearLocalStorage($event): void {
    $event.preventDefault();
    window.localStorage.removeItem('saved-posts');
    window.localStorage.removeItem('saved-comments');
  }
}
