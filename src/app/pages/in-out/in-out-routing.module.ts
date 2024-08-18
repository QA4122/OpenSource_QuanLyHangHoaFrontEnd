import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InOutManageComponent } from './in-out-manage/in-out-manage.component';
import { ProductInComponent } from './product-in/product-in.component';
import { ProductOutComponent } from './product-out/product-out.component';

const routes: Routes = [{
  path: 'history', component: InOutManageComponent
},
{
  path: 'product-in', component:ProductInComponent
},
{
  path: 'product-out', component:ProductOutComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InOutRoutingModule { }
