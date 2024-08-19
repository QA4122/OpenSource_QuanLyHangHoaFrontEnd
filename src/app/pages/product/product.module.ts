import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { MenuProductComponent } from './menu-product/menu-product.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { ModifyProductPopupComponent } from './modify-product-popup/modify-product-popup.component';
import { DxPopupModule, DxScrollViewModule } from "devextreme-angular"
import { NotifycationService } from 'app/core/notifycation.service';
import { DxoUploadModule } from 'devextreme-angular/ui/nested';
import {MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [
    AddProductComponent,
    MenuProductComponent,
    ModifyProductPopupComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
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
    MatFormFieldModule,
    MatDialogModule,
    DxScrollViewModule,
    MatPaginatorModule,
    MatMenuModule
    //NgModule
  ],
  providers: [
    NotifycationService,
  ]
})
export class ProductModule { }
