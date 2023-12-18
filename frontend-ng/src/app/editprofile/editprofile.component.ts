import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { userDetails } from '../interfaces/userInterface';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {
  editprofile!: FormGroup;
  user!: userDetails;
  user_id: string = '';

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.getAllUserDetails();
  }
  getAllUserDetails() {
    this.userService.getUsers().subscribe((data) => {
      console.log(data);
      this.user = data;
    });
  }
  patchvalues = async (id: string) => {
    this.userService
      .get(id)
      ?.subscribe((response: productDetails) => {
        console.log(response);

        this.updateForm.patchValue({
          image: response.productImageURL,
          productName: response.productName,
          category: response.category,
          description: response.productDescription,
          quantity: response.productStock,
          price: response.price,
        });
      });
  };
}
