import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'dashboard-proveedor',
  templateUrl: './proveedor.html',
  styleUrls: ['./proveedor.css']
})
export class DashboardProveedor implements OnInit, OnDestroy {
  ngOnInit() {
    console.log('DashboardProveedor ngOnInit START');
    console.log('DashboardProveedor ngOnInit END');
  }

  ngOnDestroy() {
    console.log('DashboardProveedor ngOnDestroy');
  }
}
