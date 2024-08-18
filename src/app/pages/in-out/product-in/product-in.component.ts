import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { NotifycationService } from 'app/core/notifycation.service';
import { ApiServiceService } from 'app/shared/api-service.service';
import { FilterModel } from 'app/shared/Models/FilterModel';
import { InOut } from 'app/shared/Models/InOut';
import { Product } from 'app/shared/Models/Product';
import { CheckScannedComponent } from '../check-scanned/check-scanned.component';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-product-in',
  templateUrl: './product-in.component.html',
  styleUrls: ['./product-in.component.css']
})
export class ProductInComponent implements OnInit {
  @ViewChild('scanner') scanner : ZXingScannerComponent;
  hasDevices !: boolean;
  qrResultString !: string;
  avaiableDevices !:  MediaDeviceInfo[];
  currentDevice !: MediaDeviceInfo;
  qrResult : any;
  displayedColumns: string[] = ['position','Time','Type', 'Code', 'Name'];
  dataSource :any;
  popupVisible: boolean = false;
  productCode: string = "";
  functionName: string = "";
  isAdd: boolean = true;
  public qrData: string = '';
  isScanIn: boolean = false;
  product: Product = new Product();
  isIn: boolean = false;
  isOut: boolean = false;
  InOut: InOut = new InOut();
  ContentFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();
  filterModel : FilterModel = new FilterModel();
  pageNumber: number = 0;
  pageSize: number = 5;
  totalPage: number;
  hasPermission: boolean;
  isCamera: boolean = false;
  isTimeOut: boolean = true;
  amount: number = 1;
  constructor(private api: ApiServiceService,
    private notifycation: NotifycationService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  async handleQrCodeResultIn(e){
    let a  = await this.amount;
    if(this.isTimeOut){
      this.InOut.ProductCode = e;
      this.isTimeOut = false;
      this.ScanProd(a);
    }
  }
  async ScanIn(e){
    let a  = await this.amount;
    this.InOut.ProductCode = this.qrData;
    this.ScanProd(a);
  }
  ScanProd(a){
    this.api.GetProductById(this.InOut.ProductCode).subscribe(res =>{
      if(res.response_code != 300){
        this.product = res.response_data;
        this.InOut.Type = "IN";
        let username = localStorage.getItem('username');
        if(!this.ContentFormControl.invalid){
          const dialogRef =this.dialog.open(CheckScannedComponent, {
            width: '30%',
            height: '30%',
            hasBackdrop: true,
            data: {inOut: this.InOut, amount: a, username: username},
          });
          dialogRef.afterClosed().subscribe(result => {
            this.amount = 0;
            this.qrData = '';
            setTimeout(() => {
              this.isTimeOut = true; // Allow scanning again after delay
            }, 5000);
          });
        }else{
          this.notifycation.showError("Yêu cầu nhập người nhận, người giao","Lỗi");
        }
      }else{
        this.notifycation.showError("Hàng hóa chưa được tạo mã hoặc không tồn tại", "Báo lỗi");
      }
    })
  }
  onDeviceSelectChange(e){
    this.currentDevice = this.getDeviceById(e);
  }
  getDeviceById(e): MediaDeviceInfo{
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      // selects the devices's back camera by default
      for (const device of devices) {
          if (device.deviceId === e) {
            return device;
          }
      }
    });
    return;
  }

  onFocus(){
    this.isScanIn = true;
  }
  onBlur(){
    this.isScanIn = false;
  }
  changeMode(e){
    if(e == 'false')
      this.isCamera = false;
    else
      this.isCamera = true;
  }
}
