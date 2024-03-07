import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit {
  username: string = '';
  courseName: string = '';
  users!:User[];
  public _user!: User;
  constructor(private route: ActivatedRoute,private _userService:UserService) {
    _userService.getUsers().subscribe(data=>{
    this.users=data
    console.log(this.users);})
  }
  // public get student():Student{return this._student;}
  @Input()
  public set user(value:User){
    this._user=value;
    this.userForm=new FormGroup({
      "id":new FormControl(this._user?.id),
      "name": new FormControl(this._user?.name, Validators.required),
      "adress": new FormControl(this._user?.address, Validators.required),
      "email": new FormControl(this._user?.email, Validators.required),
      "password": new FormControl(this._user?.password, Validators.required),
    });
  }
  
  @Output()
  onSaveStudent: EventEmitter<User>=new EventEmitter();
  userForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
    // קבלת השם מהקישור בין הקומפוננטות
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || '';
    });
  }

  register(): void {
    // בדוק אם המשתמש כבר קיים (לדוג', בבדיקה צד שרת)
    const userExists = this.checkIfUserExists(this.username);

    if (userExists) {
      // המשתמש כבר קיים - הצג הודעה מתאימה
      Swal.fire('Error', 'User already exists. Please choose a different username.', 'error');
    } else {
      // הרשמה הצליחה - מועבר לדף הקורסים
      Swal.fire('Success', 'Registration successful! Redirecting to courses page...', 'success');
      // כאן יש לממש ניווט לדף הקורסים
      this.saveUserToServer()
    }
  }

  private checkIfUserExists(username: string): boolean {
    const user = this.users.find(u => u.name.toLowerCase() === username.toLowerCase());
    if(user)
    { console.log("true");
      return true;}
    return false;
  }
  saveUserToServer(){
    this._userService.addUser(this._user);
  }
}
 