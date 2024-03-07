import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  users!:User[];
  constructor(private router: Router,private _userService:UserService) {
    _userService.getUsers().subscribe(data=>{
    this.users=data
    console.log(this.users);})
    
  }
  
  login(): void {
    // בדוק אם המשתמש קיים והסיסמה נכונה (לדוג', בבדיקה צד שרת)
    
    const userExists = this.checkIfUserExists(this.username);
    const correctPassword = this.checkPassword(this.username, this.password);

    if (userExists && correctPassword) {
      // התחברות הצליחה - מועבר לדף הקורסים
      Swal.fire('Success', 'Login successful! Redirecting to courses page...', 'success');
      // כאן יש לממש ניווט לדף הקורסים
      this.router.navigate(['/courses']);
    } else if (userExists && !correctPassword) {
      // המשתמש קיים אך הסיסמה שגויה - הצג הודעה מתאימה
      Swal.fire('Error', 'Incorrect password. Please try again.', 'error');
    } else {
      // המשתמש אינו קיים - הצג הודעה מתאימה
      Swal.fire('Error', 'User does not exist. Redirecting to registration...', 'error');
      // כאן יש לממש ניווט לדף הרשמה
      this.router.navigate(['/register'], { queryParams: { username: this.username } });
    }
  }

  private checkIfUserExists(username: string): boolean {
    const user = this.users.find(u => u.name.toLowerCase() === username.toLowerCase());
   
    if(user)
    { console.log("true");
      return true;}
    return false;
  }

  private checkPassword(username: string, password: string): boolean {
    const user = this.users.find(u => u.name.toLowerCase() === username.toLowerCase());
    return user?.password === password; 
  }
}
