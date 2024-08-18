import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifycationService } from 'app/core/notifycation.service';
import { ApiServiceService } from 'app/shared/api-service.service';

@Component({
  selector: 'app-check-scanned',
  templateUrl: './check-scanned.component.html',
  styleUrls: ['./check-scanned.component.css']
})
export class CheckScannedComponent implements OnInit {
  amount: number = 1;
  InOut: any;
  username: any;
  constructor(private api: ApiServiceService,
    private notifycation: NotifycationService,
    public dialogRef: MatDialogRef<CheckScannedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {inOut, amount, username},) { }

  ngOnInit(): void {
    this.InOut = this.data.inOut;
    this.amount = this.data.amount;
    this.username = this.data.username
  }
  Save(){
    if(this.InOut.Type == "IN"){
      this.api.ScannedAmountProd(this.InOut, this.username, this.amount).subscribe(res =>{
        if(res.response_code == 200){
          this.notifycation.showSuccess("Quét thành công hàng", "Thông báo");
          let audio = new Audio();
          audio.src = '../assets/soundfx/tik sound.mp3';
          audio.load();
          audio.play();
          this.dialogRef.close();
        }
      })
    }else{
      this.api.ScannedAmountProd(this.InOut, this.username,this.amount).subscribe(res =>{
        if(res.response_code == 200){
          this.notifycation.showSuccess("Quét thành công hàng", "Thông báo");
          let audio = new Audio();
          audio.src = '../assets/soundfx/tik sound.mp3';
          audio.load();
          audio.play();
          this.dialogRef.close();
        }
        if(res.warn == "BAD"){
          this.api.GetStatus("UNREAD").subscribe(res =>{
            document.getElementById("mat-badge-content-0").innerHTML=res.count;
           })
          this.notifycation.showWarning("Hàng hóa sắp hêt","Cảnh báo");
        }
      })
    }
  }
}
