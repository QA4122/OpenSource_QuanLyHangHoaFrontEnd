import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiServiceService } from 'app/shared/api-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Output() reload = new EventEmitter();
  @Input() UnREADnotifycations : any;
  @Input() READnotifycations : any;
  constructor(private api: ApiServiceService) { }

  ngOnInit(): void {
    //this.getGrid();
  }
  getGrid(){
    this.api.GetStatus('UNREAD').subscribe( res =>{
      this.UnREADnotifycations = res.response_data;
    })
    this.api.GetStatus('READ').subscribe (res =>{
      this.READnotifycations = res.response_data;
    })
  }
  ViewNoti(e){
    this.api.changeStatus(e.id).subscribe(res =>{
      if(res.response_code == 200){
        this.getGrid();
        this.reload.emit();
      }
        
    })
  }
  MarkAsRead(){
    this.api.changeAllStatus().subscribe();
    document.getElementById("mat-badge-content-0").innerHTML='0';
    this.getGrid();
  }
}
