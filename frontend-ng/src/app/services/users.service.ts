import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}
  async getUsers() {
    let token = localStorage.getItem('token') as string;
    let res = await fetch('http://localhost:3800/user/allUsers', {
      headers: {
        'Content-type': 'application/json',
        token: token,
      },
    });
    let data = await res.json();
    return data;
  }
}
