import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  showFollowers = false
  showPosts = true

  viewFollowers(){
    this.showFollowers = true
    this.showPosts = false
  }
  showPost(){
    this.showPosts  = true
    this.showFollowers = false
  }

}
