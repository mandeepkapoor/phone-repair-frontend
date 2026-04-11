import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();

    const isValid = sessionStorage.getItem('fromForm');;

    if (!isValid) {
      this.router.navigate(['/']);
    }
  else {
        // Clear flag after use
        sessionStorage.removeItem('fromForm');
       }
  }
}
