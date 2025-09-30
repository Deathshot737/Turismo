import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'dashboard-turista',
  templateUrl: './turista.html',
  styleUrls: ['./turista.css']
})
export class DashboardTurista implements OnInit, OnDestroy {
  ngOnInit() {
    console.log('DashboardTurista ngOnInit START');
    console.log('DashboardTurista ngOnInit END');
  }

  ngOnDestroy() {
    console.log('DashboardTurista ngOnDestroy');
  }
}
