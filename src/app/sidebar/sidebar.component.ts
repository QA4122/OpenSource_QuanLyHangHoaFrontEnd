import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Tổng hợp',         icon:'nc-chart-pie-36',       class: '' },
    { path: '/product',    title: 'Hàng hóa',        icon:'nc-box-2', class: '' },
    { path: '/qr',    title: 'Mã hàng hóa',        icon:'nc-key-25', class: '' },
    { path: '/InOut/history',    title: 'Lịch sử nhập/Xuất',        icon:'nc-delivery-fast', class: '' },
    { path: '/InOut/product-in',    title: 'Nhập hàng',        icon:'nc-delivery-fast', class: '' },
    { path: '/InOut/product-out',    title: 'Xuất hàng',        icon:'nc-delivery-fast', class: '' },
    // { path: '/report',     title: 'Báo cáo ',         icon:'nc-chart-pie-36',       class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
