import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotifycationService } from 'app/core/notifycation.service';
import { ChangePassword } from 'app/shared/Models/ChangePassword';
import { Profile } from 'app/shared/Models/Profile';
import { ApiServiceService } from 'app/shared/api-service.service';
import { AuthServiceService } from 'app/shared/auth-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile : Profile = new Profile();
  panelOpenState = false;
  changepassword : ChangePassword = new ChangePassword();
  constructor(
    public dialogRef: MatDialogRef<UserProfileComponent>,
    private api: ApiServiceService,
    private notifycation: NotifycationService,
    private auth: AuthServiceService
  ) { }

  ngOnInit(): void {
    let username = localStorage.getItem('username');
    this.api.getProfileByUsername(username).subscribe(res =>{
      if(res.response_code != 300)
        this.profile = res.response_data;
    })
  }
  Save(){
    let username = localStorage.getItem('username');
    if(this.changepassword.curentPassword != '' && this.changepassword.newPassword != ''){
      this.auth.changePassword(this.changepassword, username).subscribe(res =>{
        if(res.response_code == 200)
          this.notifycation.showSuccess("Đổi mật khẩu thành công", "Thông báo")
      });
    }
    this.api.EditProfile(this.profile, username).subscribe(res =>{
      if(res.response_code == 200){
        this.notifycation.showSuccess("Sửa thông tin thành công", "Thông báo")
        this.dialogRef.close();
      }
    })
  }
  Back(){
    this.dialogRef.close();
  }
}
