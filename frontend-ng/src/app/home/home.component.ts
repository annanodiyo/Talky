import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  addPostForm!: FormGroup;
  isLiked: boolean = false;
  comments: boolean = false
  picture: boolean = true

  constructor() {
    this.addPostForm = new FormGroup({
      image: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
  }

  isFormVisible: boolean = false;
  showReply: boolean = false;

  toggleHeart():void{
    this.isLiked = !this.isLiked
  }

  viewForm() {
    // this.addPost = true;
    this.isFormVisible = true;
  }
  hideform() {
    this.isFormVisible = false;
  }
  showComments(){
    this.comments = !this.comments
    this.picture = !this.picture
  }

  newPost() {}
  toggleReply() {
  this.showReply = !this.showReply;
  }
}
