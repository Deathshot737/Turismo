import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { AdminAddProveedorComponent } from './admin-add-proveedor';

@Component({
  selector: 'dashboard-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
  imports: [AdminAddProveedorComponent]
})
export class DashboardAdmin implements OnInit, OnDestroy {
  ngOnInit() {
    console.log('DashboardAdmin ngOnInit START');
    console.log('DashboardAdmin ngOnInit END');
  }

  ngOnDestroy() {
    console.log('DashboardAdmin ngOnDestroy');
  }
}
