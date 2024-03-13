import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router,){
  }
  ngOnInit(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('currentUser')
        sessionStorage.removeItem('currentLecturer')
        this.router.navigate(['/'])
        Swal.fire({
          title: "GoodBye!",
          icon: "success"
        });
      }
    });
    
  }

}
