import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { UserService } from 'src/app/@core/data-services/user.service';
import { UserDto } from 'src/app/@core/dtos/user.dto';
import { OnlineStatService } from 'src/app/@core/utils/online-stat.service';

@Component({
  selector: 'app-user-card-component',
  templateUrl: './user-card-component.component.html',
  styleUrls: ['./user-card-component.component.scss']
})
export class UserCardComponentComponent implements ViewCell, OnInit {

  isSubmitted = false;

  @Input() value!: string | number;
  @Input() rowData!: UserDto;


  constructor(
    public userService: UserService,
    public onlineStat: OnlineStatService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  async onButtonClick() {
    this.isSubmitted = true;
    this.cd.detectChanges();
    console.log("row", this.rowData );

    
  }

}
