import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  dataFromParent: any[];
  users: any;
  filterUser: any;
  @Input() childMessage: any;
  
  constructor(
  ) { }

  ngOnInit(): void {
    this.users = this.childMessage;
    this.filterUser = this.childMessage; 
  }
  
   searchFilter(event) {
    console.log(event.target.value);
    if (!event.target.value) {
      this.filterUser = this.users;
    } else {
      this.filterUser = this.filterUser.filter(data => {
        return data.title.includes(event.target.value);
      });
    }
  }
}
