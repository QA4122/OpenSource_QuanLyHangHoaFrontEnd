import { Component, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiServiceService } from 'app/shared/api-service.service';
import { ModifyCodeComponent } from '../modify-code/modify-code.component';
import { NotifycationService } from 'app/core/notifycation.service';
import { FilterModel } from 'app/shared/Models/FilterModel';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { QRCodeElementType } from 'angularx-qrcode';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-qrcode-menu',
  templateUrl: './qrcode-menu.component.html',
  styleUrls: ['./qrcode-menu.component.css']
})
export class QrcodeMenuComponent implements OnInit {
  displayedColumns: string[] = ['position', 'Name','QRCode','BarCode', 'Code','Download', 'Del'];
  @ViewChild('qr') qrCode : any;
  dataSource :any;
  popupVisible: boolean = false;
  productCode: string = "";
  functionName: string = "";
  isAdd: boolean = true;
  filterModel: FilterModel = new FilterModel();
  pageNumber: number = 0;
  pageSize: number = 5;
  totalPage: number;
  listCoded: any;
  elementType: QRCodeElementType = 'canvas';
  choosenCode: string = '';
  constructor(private api: ApiServiceService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private notifycation: NotifycationService,
    private http: HttpClient
  ) {
   
   }
  sanitizeImageUrl(imageUrl: any): SafeUrl {
    return this.sanitizer.sanitize(SecurityContext.NONE, 
      this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + imageUrl));
  }
  ngOnInit(): void {
    this.GetGrid();
  }
  GetGrid(){
    this.api.GetAllCode(this.filterModel).subscribe(res =>{
      this.dataSource = new MatTableDataSource(res.response_data.data);
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
  Edit(e){
    this.isAdd = false;
    this.popupVisible = true;
    this.productCode = e.productCode;
    this.functionName = "Sửa sản phẩm";
    let dialogRef = this.dialog.open(ModifyCodeComponent, {
      width: '85%',
      height: '85%',
      hasBackdrop: true,
      position: {right:'0px'},
      data: {productCode: this.productCode, functionName: this.functionName, isAdd: this.isAdd},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetGrid();
    });
  }
  Del(e){
    this.api.DelCode(e.productCode).subscribe(res =>{
      if(res.response_code == 200){
        this.notifycation.showSuccess(res.response_data, "Thông báo");
        this.GetGrid();
      }else{
        this.notifycation.showError(res.response_data, "Thông báo");
      }
    })
  }
  Add(){
    this.isAdd = true;
    this.popupVisible = true;
    this.functionName = "Thêm sản phẩm";
    let dialogRef =this.dialog.open(ModifyCodeComponent, {
      width: '85%',
      height: '85%',
      hasBackdrop: true,
      position: {right:'0px'},
      data: {productCode: null, functionName: this.functionName, isAdd: this.isAdd},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetGrid();
    });
  }
  ChangePage(e){
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    this.filterModel.PageNumber = e.pageIndex + 1;
    this.filterModel.PageSize = e.pageSize;
    this.GetGrid();
  }
  async DownLoadAll(){
    let res = await lastValueFrom(this.api.DownloadAll());
    this.listCoded = res.response_data;
    for(let i = 0 ; i< this.listCoded.length; i++){
      const decodedData = window.atob(this.listCoded[i].data)
      const uInt8Array = new Uint8Array(decodedData.length)
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    // return blob image after conversion
    let data =  new Blob([uInt8Array], { type: "image/png" })
    saveAs(data,this.listCoded[i].name);
   }
  }
  async DownloadCode(e){
    let res = await lastValueFrom(this.api.DownloadByProd(e));
    const decodedData = window.atob(res.response_data.data)
    const uInt8Array = new Uint8Array(decodedData.length)
  // insert all character code into uint8array
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i)
  }
  // return blob image after conversion
  let data =  new Blob([uInt8Array], { type: "image/png" })
  saveAs(data, res.response_data.name);
  }
}
