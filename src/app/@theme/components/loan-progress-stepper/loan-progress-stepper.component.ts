import { Component, Input, OnInit } from '@angular/core';
import { MonthNames } from 'src/app/@core/enums/month-of-year-name.enum';

@Component({
  selector: 'app-loan-progress-stepper',
  styleUrls: ['./loan-progress-stepper.component.scss'],
  templateUrl: './loan-progress-stepper.component.html',
})
export class LoanProgressStepperComponent  implements OnInit{

  @Input() data: any[] = [];
  monthNames:any;
  toggleStatistics() {
    
    
  }

  ngOnInit(): void {
    this.data = this.data;
    this.monthNames = MonthNames;
  }
}
