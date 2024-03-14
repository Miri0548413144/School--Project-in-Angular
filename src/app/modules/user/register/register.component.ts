import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User("", "", "", "")
  users: User[] = [];

  userForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      id: [this.user.id],
      name: [this.user.name, Validators.required],
      address: [this.user.address, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data
    })
    this.route.queryParams.subscribe(params => {
      const username = params['username'] || '';
      this.userForm.controls['name'].setValue(username);
    }
    )}
    register(): void {
      const username = this.userForm.controls['name'].value;
      const userExists = this.checkIfUserExists(username);

      if(userExists) {
        Swal.fire('Error', 'User already exists. Please choose a different username.', 'error');
      } else {
        this.saveUserToServer();

      }
    }

  
  private checkIfUserExists(username: string): boolean {


    const user = this.users.find(u => u.name.toLowerCase() === username.toLowerCase());
    if (user) {
      return true;
    }
    return false;
  }

  saveUserToServer(): void {
    const us = this.userForm.value;
    const user = new User(us.name, us.address, us.email, us.password);
    this.userService.addUser(user).subscribe(() => {
      Swal.fire('Success', 'Registration successful! Redirecting to courses page...', 'success');
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/allCourses'])
      this.userService.getUsers().subscribe(data => {
        this.users = data
      })

    }, err => console.log("err", err));
  }
}



