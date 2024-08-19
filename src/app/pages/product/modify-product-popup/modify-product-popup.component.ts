import { Component, EventEmitter, Inject, Input, OnInit, Output, SecurityContext } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NotifycationService } from 'app/core/notifycation.service';
import { Product } from 'app/shared/Models/Product';
import { ApiServiceService } from 'app/shared/api-service.service';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-modify-product-popup',
  templateUrl: './modify-product-popup.component.html',
  styleUrls: ['./modify-product-popup.component.css']
})
export class ModifyProductPopupComponent implements OnInit {
  @Input() productCode: string;
  @Input() functionName: string;
  @Input() isAdd: boolean;
  @Output() visibleChange = new EventEmitter();
  @Output() reLoad = new EventEmitter();
  imageUrl: any;
  product: Product = new Product();
  ListImage : any;
  selectedFiles ?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  imageId: any;

  fileInfos?: Observable<any>;

  constructor(private api: ApiServiceService,
    private sanitizer: DomSanitizer,
    private notifycation: NotifycationService,
    public dialogRef: MatDialogRef<ModifyProductPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {productCode, functionName, isAdd},
  ) { }
  ngDoCheck() {
    //this.visibleChange.emit(this.visible);
  }
  ngOnInit(): void {
    this.product.amount = 1;
    this.productCode = this.data.productCode,
    this.functionName = this.data.functionName;
    this.isAdd = this.data.isAdd;
    this.LoadData();
  }
  ngOnChanges(){
    this.productCode = this.data.productCode,
    this.functionName = this.data.functionName;
    this.isAdd = this.data.isAdd
    this.LoadData();
  }
  async Save(){
    let username = localStorage.getItem('username');
    if(this.isAdd){
      let res = await lastValueFrom(this.api.AddProduct(this.product, username));
      if(res.response_code == 200){
        this.dialogRef.close();
        this.reLoad.emit();
        this.productCode = res.productCode;
        this.notifycation.showSuccess("Thêm thành công", "Thông báo");
      }
      if(this.selectedFiles)
        await this.uploadFiles();
    }else{
      let res =  await lastValueFrom(this.api.EditProduct(this.product, username))
      if(res.response_code == 200){
        this.dialogRef.close();
        this.reLoad.emit();
        this.notifycation.showSuccess("Sửa thành công", "Thông báo");
      }
      if(this.selectedFiles)
        await this.uploadFiles();
    }
  }
  async SaveCoded(){
    let username = localStorage.getItem('username');
    this.product.hasCode = 1;
    let res = await lastValueFrom(this.api.AddProduct(this.product, username));
    if(res.response_code == 200){
      this.dialogRef.close();
      this.reLoad.emit();
      this.productCode = res.productCode;
      this.notifycation.showSuccess("Thêm thành công", "Thông báo");
    }
    if(this.selectedFiles)
      await this.uploadFiles();
  }
  Back(){
    this.dialogRef.close();
  }
  AddImage(){

  }
  selectFiles(event): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  async uploadFiles() {
    this.message = [];
    
      if (this.selectedFiles) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          await this.upload(i, this.selectedFiles[i]);
        }
    }
    
  }
  async upload(idx: number, file: File) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      const formData: FormData = new FormData();
      formData.append('Images', file);
      let event =  await lastValueFrom(this.api.PostImage(formData, this.productCode));
    }
  }
  LoadData(){
    if(!this.isAdd){
      this.api.GetProductById(this.productCode).subscribe( res =>{
        this.product = res.response_data;
        this.imageUrl = this.sanitizeImageUrl(res.response_data.imageSource.bytes); 
        this.imageId = res.response_data.imageSource.id;
        this.ListImage = res.response_data.allImage;
      })
    }
  }
  sanitizeImageUrl(imageUrl: any): SafeUrl {
    return this.sanitizer.sanitize(SecurityContext.NONE, 
      this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + imageUrl));
  }
  ChangeImage(e){
    this.imageUrl =  this.sanitizeImageUrl(e.bytes);
    this.imageId = e.id;
  }
  DelImage(){
    this.api.DelImage(this.imageId).subscribe(res =>{
      this.notifycation.showSuccess("Xóa ảnh thành công", "Thông báo");
      this.ListImage = this.ListImage.filter(item => item.id != this.imageId);
      this.imageUrl = this.sanitizeImageUrl(this.ListImage[0].bytes);
      if(this.ListImage.length == 0){
        this.imageUrl = '';
      }
    })
  }
}
