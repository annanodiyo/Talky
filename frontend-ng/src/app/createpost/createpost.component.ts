import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadService } from '../services/upload.service';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css'],
})
export class CreatepostComponent {
  createPostForm!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private uploadService: UploadService,
    private postService: PostService,
    private toastr: ToastrService,
    private authService: AuthService,
    private el: ElementRef
  ) {
    this.createPostForm = this.formbuilder.group({
      postImage: '',
      caption: ['', Validators.required],
    });
  }
  createPost() {
    console.log(this.createPostForm.value);

    if (this.createPostForm.valid) {
      const imageUrls: string[] = [];

      for (let index = 0; index < this.postFiles.length; index++) {
        const data = new FormData();
        const file_data = this.postFiles[index];
        data.append('file', file_data);
        data.append('upload_preset', 'i7nxuoly');
        data.append('cloud_name', 'dyisqzh7l');

        this.uploadService.uploadImage(data).subscribe((res) => {
          console.log(res.secure_url);
          imageUrls.push(res.secure_url);

          if (imageUrls.length === this.postFiles.length) {
            this.createPostForm.value.postImage = imageUrls;

            let details: PostDetails = this.createPostForm.value;
            details.createdAt = new Date().toISOString();
            details.userID = this.userID;

            this.postService.createPost(details).subscribe(
              (response) => {
                console.log(response);
                this.toastr.success('Form submitted successfully!', 'Success');

                this.getPosts();
                this.createPostForm.reset();
                this.postFiles = [];
              },
              (error) => {
                this.toastr.error(`${error}`, 'Error');
                console.error('Error submitting form:', error);
              }
            );
          }
        });
      }
    } else {
      this.toastr.error('Form is invalid. Please check the fields.', 'Error');
      console.log(
        'Form is invalid. Please check the fields.',
        this.createPostForm.value
      );
    }
  }
}
