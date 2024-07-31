import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AuthServiceService } from 'app/shared/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {
  userName: any;
  private auth: AuthServiceService = inject(AuthServiceService);
  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }
  OpenProfile(){
    let dialogRef =this.dialog.open(UserProfileComponent, {
      width: '85%',
      height: '85%',
      hasBackdrop: true,
      position: {right:'0px'},
      data: {userName: this.userName,},
    });
  }
  Logout(){
    localStorage.clear();
    this.auth.Logout();
    this.router.navigate(['login']);
  }
}
