import { Component, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NotifycationService } from 'app/core/notifycation.service';
import { InOut } from 'app/shared/Models/InOut';
import { Product } from 'app/shared/Models/Product';
import { ApiServiceService } from 'app/shared/api-service.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { FilterModel } from 'app/shared/Models/FilterModel';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { ProdLogFilter } from 'app/shared/Models/ProdLogFilter';
import { saveAs } from 'file-saver';
class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-in-out-manage',
  templateUrl: './in-out-manage.component.html',
  styleUrls: ['./in-out-manage.component.css']
})

export class InOutManageComponent implements OnInit {
  @ViewChild('scanner') scanner : ZXingScannerComponent;
  @ViewChild('scannerOut') scannerOut : ZXingScannerComponent;
  hasDevices !: boolean;
  qrResultString !: string;
  avaiableDevices !:  MediaDeviceInfo[];
  currentDevice !: MediaDeviceInfo;
  qrResult : any;
  displayedColumns: string[] = ['position','Time','Type', 'Name', 'saler', 'Receive', 'Deliver'];
  displayedProdColumns: string[]=['position','productName','type','count', 'saler'];
  dataSource :any;
  prodDataSource: any;
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
  ProdLogFilter : ProdLogFilter = new ProdLogFilter();
  pageNumber: number = 0;
  pageSize: number = 5;
  totalPage: number;
  hasPermission: boolean;
  isCamera: boolean = false;
  isTimeOut: boolean = true;
  isCameraIn: boolean;
  constructor(private api: ApiServiceService,
    private sanitizer: DomSanitizer,
    private notifycation: NotifycationService,
  ) {
   
   }
  sanitizeImageUrl(imageUrl: any): SafeUrl {
    return this.sanitizer.sanitize(SecurityContext.NONE, 
      this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + imageUrl));
  }
  ngOnInit(): void {
    // this.scanner.camerasFound.subscribe((devices:MediaDeviceInfo[]) =>{
    //   this.hasDevices = true;
    //   this.avaiableDevices = devices;
    //   // for(const device of devices){
    //   //   if(/back|rear|environment/gi.test(device.label)){
    //   //     new this.scanner.deviceChange();
    //   //     this.currentDevice = device;
    //   //     break;
    //   //   }
    //   // }
    // })
    // this.scanner.camerasNotFound.subscribe(()=> this.hasDevices = false);
    // this.scanner.scanComplete.subscribe((result) => this.qrResult = result);
    // this.scanner.permissionResponse.subscribe((perm) => this.hasPermission = perm);
    this.GetGrid();
  }
  GetGrid(){
    this.api.GetAllInOut(this.filterModel).subscribe(res =>{
      this.dataSource = new MatTableDataSource(res.response_data.data);
      this.totalPage = res.response_data.length;
    })
  }
  GetAllByProd(){
    this.api.GetAllByProd(this.ProdLogFilter).subscribe(res =>{
      this.prodDataSource = new MatTableDataSource(res.response_data.data);
      this.totalPage = res.response_data.length;
    })
  }
  ApplyFiter(e){
    this.filterModel.SearchString = e;
    this.pageNumber = 0;
    this.pageSize = 5;
    this.filterModel.PageNumber = 1;
    this.filterModel.PageSize = 5;
    this.GetGrid();
  }
  ApplyFiterProd(e){
    this.ProdLogFilter.SearchString = e;
    this.pageNumber = 0;
    this.pageSize = 5;
    this.ProdLogFilter.PageNumber = 1;
    this.ProdLogFilter.PageSize = 5;
    this.GetAllByProd();
  }
  ResetData(){
    this.GetGrid();
    this.isCamera = false;
    this.InOut = new InOut();
    this.product = new Product();
    this.qrData = '';
  }
  Reset(e){
    this.ProdLogFilter = new ProdLogFilter();
    this.GetAllByProd();
  }
  ChangePage(e){
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    this.filterModel.PageNumber = e.pageIndex + 1;
    this.filterModel.PageSize = e.pageSize;
    this.GetGrid();
  }
  ChangePageProd(e){
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    this.ProdLogFilter.PageNumber = e.pageIndex + 1;
    this.ProdLogFilter.PageSize = e.pageSize;
    this.GetAllByProd();
  }
  ChooseType(e){
    this.filterModel.Type = e;
    this.GetGrid();
  }
  ChooseTypeProd(e){
    this.ProdLogFilter.Type = e;
    this.GetAllByProd();
  }
  changeTab(e){
    this.pageNumber = 0;
    this.pageSize = 5;
    if(e == 1){
        this.GetAllByProd();
    }else{
      this.GetGrid();
    }
  }
  ChangeDate(e){
    this.GetAllByProd();
  }
  ExportExcel(){
    this.api.ReportInOutLog(this.ProdLogFilter).subscribe(res =>{
      let uInt8Array = this.DecodeString(res.response_data);
      let data =  new Blob([uInt8Array], { type: "" })
      saveAs(data, res.name);
    })
  }
  private DecodeString(e){
    const decodedData = window.atob(e)
    const uInt8Array = new Uint8Array(decodedData.length)
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    return uInt8Array;
  }
}
