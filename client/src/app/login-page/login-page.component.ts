import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // some code
      } else if (params['accessDenied']) {
        // some code
      }
    });
  }

  onSubmit() {
    this.form.disable();
    this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/owerview']),
      error => {
        this.form.enable();
      }
    );
  }
}
