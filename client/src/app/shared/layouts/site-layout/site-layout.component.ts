import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialService } from '../../helpers/materialize.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  @ViewChild('floating', { static: true }) floatingRef: ElementRef;

  links = [
    { url: '/overview', name: 'Overview' },
    { url: '/analytics', name: 'Analytics' },
    { url: '/history', name: 'History' },
    { url: '/order', name: 'Add Order' },
    { url: '/categories', name: 'Shop' }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    MaterialService.initializeFloatingButton(this.floatingRef);
  }

  logout(e: Event) {
    e.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
