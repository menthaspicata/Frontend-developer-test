import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {



  public displayedColumns: string[] = ['id', 'name', 'email', 'company'];
  public dataSource = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService
      .getUsersList()
      .subscribe((data: any) => {
        this.dataSource = data;
      });
  }

}
