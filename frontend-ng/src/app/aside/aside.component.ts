import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent {
  constructor(private router:Router){}
  isLinkActive(path: string): boolean{
    return this.router.url === path
  }
}
