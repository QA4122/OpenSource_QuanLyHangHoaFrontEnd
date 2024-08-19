import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrcodeRoutingModule } from './qrcode-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { DxPopupModule, DxScrollViewModule } from 'devextreme-angular';
import { DxoUploadModule } from 'devextreme-angular/ui/nested';
import { QrcodeMenuComponent } from './qrcode-menu/qrcode-menu.component';
import { ModifyCodeComponent } from './modify-code/modify-code.component';
import { MatDialogModule } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    QrcodeMenuComponent,
    ModifyCodeComponent
  ],
  imports: [
    CommonModule,
    QrcodeRoutingModule,
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
    DxScrollViewModule,
    MatDialogModule,
    QRCodeModule,
    ScrollingModule,
    MatPaginatorModule
  ]
})
export class QrcodeModule { }
