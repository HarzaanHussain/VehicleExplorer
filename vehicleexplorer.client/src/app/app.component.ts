import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Vehicle Explorer';

  // If you're using the sidenav, you might need this method
  toggleSidenav(sidenav: any) {
    sidenav.toggle();
  }
}
