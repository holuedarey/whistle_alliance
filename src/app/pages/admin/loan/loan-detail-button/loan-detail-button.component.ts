import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RepaymentModalComponent } from '../repayment-modal/repayment-modal.component';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { PagesResources, PagesResourcesNavMap } from 'src/app/pages/pages-resources';

@Component({
  selector: 'app-loan-detail-button',
  templateUrl: './loan-detail-button.component.html',
  styleUrls: ['./loan-detail-button.component.scss']
})
export class LoanDetailButtonComponent implements ViewCell, OnInit {

  isSubmitted = false;


  @Input() value!: string | number;
  @Input() rowData!: any;

  constructor(
    private cd: ChangeDetectorRef,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  async onButtonClick() {
    this.isSubmitted = true;
    this.cd.detectChanges();

    return this.router.navigate(
      [PagesResourcesNavMap.get(PagesResources.LoanDetailsView)?.route as string],
      {
        queryParams: { loanId: this.rowData.id, userId: this.rowData.userId},
        queryParamsHandling: 'merge'
      }
    );
  }


}
