import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { MonthNames } from 'src/app/@core/enums/month-of-year-name.enum';
import { RepaymentPopModalComponent } from '../repayment-pop-modal/repayment-pop-modal.component';
import { RoleProvider } from 'src/app/@core/utils/role-provider.service';

@Component({
  selector: 'app-loan-progress-stepper',
  styleUrls: ['./loan-progress-stepper.component.scss'],
  templateUrl: './loan-progress-stepper.component.html',
})
export class LoanProgressStepperComponent  implements OnInit{

  @Input() data: any[] = [];
  monthNames:any;
  isAdmin:boolean = false;

  constructor(private dialogService:NbDialogService, private roleProvider: RoleProvider) { }
  toggleStatistics() {
    
    
  }

  async SendProof(item:any){
      //get loan details
      const dialog = await this.dialogService.open(RepaymentPopModalComponent, {
        closeOnBackdropClick: false,
        context: { loan: item},
        closeOnEsc: false,
        hasScroll: true,
      }).onClose.toPromise();
   
      if(dialog){
        console.log("close");
        
      }
  }

  
  ngOnInit(): void {
    this.data = this.data;
    this.monthNames = MonthNames;
    const role = this.roleProvider.getRoleSync();
    if (role.includes('ADMIN')) {
      this.isAdmin = true;
    } else if (role.includes('USER')) {
      this.isAdmin = false;
    }
    
  }
}
