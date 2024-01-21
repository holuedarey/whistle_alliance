import { ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { MessageService } from 'src/app/@core/data-services/message.service';
import { UserDto } from 'src/app/@core/dtos/user.dto';
@Component({
  selector: 'app-user-button-toggle',
  templateUrl: './user-button-toggle.component.html',
  styleUrls: ['./user-button-toggle.component.scss']
})
export class UserButtonToggleComponent implements ViewCell, OnInit {

  @Input() value!: string | number;
  @Input() rowData!: UserDto;
  
  constructor(
    private cd: ChangeDetectorRef,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
  }

  async onButtonClick() {
    this.messageService.setMessage(this.rowData)
  }
 

}
