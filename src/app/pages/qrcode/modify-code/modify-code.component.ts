import { Component, EventEmitter, Inject, Input, OnInit, Output, SecurityContext, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { QRCodeElementType } from 'angularx-qrcode';
import { NotifycationService } from 'app/core/notifycation.service';
import { Product } from 'app/shared/Models/Product';
import { ApiServiceService } from 'app/shared/api-service.service';
import { Observable } from 'rxjs';

class Inputs{
  productCode: string;
  constructor() {
    this.productCode = '';
  }
}
@Component({
  selector: 'app-modify-code',
  templateUrl: './modify-code.component.html',
  styleUrls: ['./modify-code.component.css']
})
export class ModifyCodeComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() productCode: string = '';
  @Input() functionName: string;
  @Input() isAdd: string;
  @Output() visibleChange = new EventEmitter();
  @Output() reLoad = new EventEmitter();
  @ViewChild("qr") qr : any;
  imageUrl: any;
  product: Product = new Product();
  ListImage : any;
  selectedFiles ?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  CodeString: string= '';
  ProductList: any;
  fileInfos?: Observable<any>;
  imageCount : any;
  elementType: QRCodeElementType = 'canvas';
  downloadable : boolean = false;
  inputs: Inputs = new Inputs();

  constructor(private api: ApiServiceService,
    private sanitizer: DomSanitizer,
    private notifycation: NotifycationService,
    public dialogRef: MatDialogRef<ModifyCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {productCode, functionName, isAdd},
  ) { }
  ngDoCheck() {
    this.visibleChange.emit(this.visible);
  }
  ngOnInit(): void {
    this.productCode = this.data.productCode,
    this.functionName = this.data.functionName;
    this.isAdd = this.data.isAdd;
    this.LoadProducts();
  }
  Save(){
    let username = localStorage.getItem('username');
    if(this.productCode == '' || this.productCode == null){
      this.notifycation.showError("Vui lòng chọn 1 sản phẩm", "thông báo")
    }else{
      this.inputs.productCode = this.productCode;
      this.api.AddCode(this.inputs, username).subscribe(res =>{
        if(res.response_code == 200){
          this.notifycation.showSuccess(res.response_data,"Thông báo!");
          this.Back();
        }else
          this.notifycation.showError(res.response_data,"Thông báo!");
      });
      
    }
   
  }
  LoadProducts(){
    this.api.GetAllNoCode().subscribe(res =>{
      this.ProductList = res.response_data;
    })
  }
  Back(){
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
    this.dialogRef.close();
  }
  selectFiles(event): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  LoadData(){
      this.api.GetProductById(this.productCode).subscribe( res =>{
        this.product = res.response_data;
        this.imageUrl = this.sanitizeImageUrl(res.response_data.imageSource.bytes); 
        this.ListImage = res.response_data.allImage;
        this.imageCount = res.response_data.imageCount;
      })
  }
  sanitizeImageUrl(imageUrl: any): SafeUrl {
    return this.sanitizer.sanitize(SecurityContext.NONE, 
      this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + imageUrl));
  }
  ChangeImage(e){
    this.imageUrl =  this.sanitizeImageUrl(e);
  }
  ChooseProduct(e){
    if(e == 'all'){
      this.CodeString = "";
      this.productCode = null;
      this.product = new Product();
      this.downloadable = false;
    }
    else{
      this.downloadable = true;
      this.productCode = e;
      this.CodeString = e;
      this.LoadData();
    }
  }
  DownLoad(e){
    let parentElement = null

    if (this.elementType === "canvas") {
      // fetches base 64 data from canvas
      parentElement = e.qrcElement.nativeElement
        .querySelector("canvas")
        .toDataURL("image/png")
    } else if (this.elementType === "img" || this.elementType === "url") {
      // fetches base 64 data from image
      // parentElement contains the base64 encoded image src
      // you might use to store somewhere
      parentElement = e.qrcElement.nativeElement.querySelector("img").src
    } else {
      alert("Set elementType to 'canvas', 'img' or 'url'.")
    }

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: "image/png" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      // name of the file
      link.download = this.CodeString;
      link.click()
    }
  }
  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(";base64,")
    // hold the content type
    const imageType = parts[0].split(":")[1]
    // decode base64 string
    const decodedData = window.atob(parts[1])
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length)
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType })
  }
}
