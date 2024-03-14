import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { Lecturer } from 'src/app/modules/user/models/lecturer.model';
import { HomePageComponent } from 'src/app/home-page/home-page.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isInstructor(): any {
    return true;
  }

  username: string = '';
  userpassword: string = '';
  users!: User[];
  lecturers!: Lecturer[];
  showRegister: boolean = false;
  course: string = '';
  // נוסיף תכונה חדשה להצגת הקורס בטופס
  isLecturer: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private _userService: UserService) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.showRegister = params['register'] === 'true';
    });
    this._userService.getUsers().subscribe(data => {
      this.users = data
    })
    this._userService.getLecturer().subscribe(data => {
      this.lecturers = data
    })
  }

  login(): void {
    const userExists = this.checkIfUserExists(this.username);
    const correctPassword = this.checkPassword(this.username, this.userpassword);
    if (userExists && correctPassword) {
      Swal.fire('Success', 'Login successful! Redirecting to courses page...', 'success');
      if (this.isLecturer) {
        const lec = this.lecturers.find(l => l.name.toLowerCase() === this.username.toLowerCase());
        sessionStorage.setItem('currentLecturer', JSON.stringify(lec));
      }
      else { const user = this.users.find(u => u.name.toLowerCase() === this.username.toLowerCase());
        sessionStorage.setItem('currentUser', JSON.stringify(user)); }
      this.router.navigate(['/allCourses']);
    } else if (userExists && !correctPassword) {
      Swal.fire('Error', 'Incorrect password. Please try again.', 'error');
    } else {
      Swal.fire('Error', 'Name does not exist. Redirecting to registration...', 'error');
      this.showRegister = true;
      if (!this.isLecturer) { this.router.navigate(['/register'], { queryParams: { username: this.username } }); }
    }
  }

  private checkIfUserExists(username: string): boolean {
    if (this.isLecturer) {
      const lec = this.lecturers.find(l => l.name.toLowerCase() === username.toLowerCase());
      if (lec) {
        return true;
      }
      return false;
    }
    else {
      const user = this.users.find(u => u.name.toLowerCase() === username.toLowerCase());
      if (user) {
        return true;
      }
      return false;
    }
  }

  private checkPassword(username: string, password: string): boolean {
    if (this.isLecturer) {
      const lec = this.lecturers.find(l => l.name.toLowerCase() === username.toLowerCase());
      return lec?.password === password;
    }
    else {
      const user = this.users.find(u => u.name.toLowerCase() === username.toLowerCase());
      return user?.password === password;
    }
  }
}
