import { Component, OnInit, SecurityContext } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'app/shared/api-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ModifyProductPopupComponent } from '../modify-product-popup/modify-product-popup.component';
import { NotifycationService } from 'app/core/notifycation.service';
import { FilterModel } from 'app/shared/Models/FilterModel';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-menu-product',
  templateUrl: './menu-product.component.html',
  styleUrls: ['./menu-product.component.css']
})
export class MenuProductComponent implements OnInit {
  displayedColumns: string[] = ['position','Image', 'Code', 'Name', 'Amount', 'Price','Edit'];
  dataSource :any;
  popupVisible: boolean = false;
  productCode: string = "";
  functionName: string = "";
  isAdd: boolean = true;
  filterModel : FilterModel = new FilterModel();
  pageNumber: number = 0;
  pageSize: number = 5;
  totalPage: number;
  constructor(private api: ApiServiceService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private notifycation: NotifycationService,
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
    this.api.GetAllProduct(this.filterModel).subscribe(res =>{
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
    const dialogRef =this.dialog.open(ModifyProductPopupComponent, {
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
  Delete(e){
    let username = localStorage.getItem('username');
    this.productCode = e.productCode;
    this.api.DelProduct(this.productCode, username).subscribe(res =>{
      if(res.response_code == 200){
        this.notifycation.showSuccess(res.response_data, 'Thông báo');
        this.GetGrid();
      }else{
        this.notifycation.showError(res.response_data, 'Thông báo');
      }
    })
  }
  Add()//them
  {
    this.isAdd = true;
    this.popupVisible = true;
    this.functionName = "Thêm sản phẩm";
    const dialogRef =this.dialog.open(ModifyProductPopupComponent, {
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
  ChangePage(e){
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    this.filterModel.PageNumber = e.pageIndex + 1;
    this.filterModel.PageSize = e.pageSize;
    this.GetGrid();
  }
  ExportExcel(){
    this.api.ReportPord().subscribe(res =>{
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
