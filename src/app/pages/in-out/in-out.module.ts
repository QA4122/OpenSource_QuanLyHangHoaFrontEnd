import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { InOutRoutingModule } from './in-out-routing.module';
import {MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { DxPopupModule } from 'devextreme-angular';
import { DxoUploadModule } from 'devextreme-angular/ui/nested';
import { InOutManageComponent } from './in-out-manage/in-out-manage.component';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ProductInComponent } from './product-in/product-in.component';
import { ProductOutComponent } from './product-out/product-out.component';
import { CheckScannedComponent } from './check-scanned/check-scanned.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    InOutManageComponent,
    ProductInComponent,
    ProductOutComponent,
    CheckScannedComponent
  ],
  imports: [
    CommonModule,
    InOutRoutingModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    DxPopupModule,
    DxoUploadModule,
    MatTabsModule,
    MatPaginatorModule,
    ZXingScannerModule,
    MatButtonToggleModule,
    MatDialogModule
  ]
})
export class InOutModule { 
}
