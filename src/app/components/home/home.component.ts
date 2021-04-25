import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({ 
  selector: 'app-home',
  templateUrl: 'home.component.html'
 })
export class HomeComponent implements OnInit {
  currentUser: any = {};
  users = [];
  filterUser:any = [];
  data: any[];

  constructor(
    private UserService: UserService,
    private router:Router



  ) {
  }

  ngOnInit() {

    this.currentUser =localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')):{};

    this.loadData();

  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
    
  }
  
  loadData() {
    this.UserService.getPost().subscribe(data => {
      console.log(data);
      this.data=data;

    });
  }

}